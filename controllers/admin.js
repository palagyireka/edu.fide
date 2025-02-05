const mongoose = require("mongoose");
const deltaToHtml = require("../utils/deltaToHtml");
const { convert } = require("html-to-text");
const Blogpost = require("../models/blogpost");
const FeaturedPost = require("../models/featuredPost");
const SchoolAwardsApplicant = require("../models/schoolAwardsApplicant");
const url = require("url");
const User = require("../models/user");
const ExcelJS = require("exceljs");

module.exports.renderNew = (req, res) => {
  res.render("admin/new");
};

module.exports.createPost = async (req, res) => {
  const newPost = new Blogpost({
    title: req.body.title,
    text: req.body.text,
    date: new Date(),
    tags: req.body.tags,
    countries: req.body.countries,
    featured: req.body.featured,
  });

  if (req.body.images) {
    newPost.images = req.body.images;
  }

  await newPost.save();

  if (req.body.featured === true) {
    const featured = await FeaturedPost.findOne({});
    if (!featured) {
      const newFeatured = new FeaturedPost({
        featuredPosts: [{ post: newPost._id, featuredDate: new Date() }],
      });
      await newFeatured.save();
    } else {
      if (featured.featuredPosts.length >= 4) {
        featured.featuredPosts.sort((a, b) => a.featuredDate - b.featuredDate);
        featured.featuredPosts.shift();
      }
      featured.featuredPosts.push({
        post: newPost._id,
        featuredDate: new Date(),
      });
      await featured.save();
    }
  }
  req.flash("success", "Successfully made a new post!");
  res.send("ok");
};

module.exports.renderPosts = (req, res) => {
  const pageNumber = req.query.page || 1;
  let posts;

  const transform = (paginatedPosts) => {
    paginatedPosts.forEach((post) => {
      if (post.images.length === 0 || !post.images[0]) {
        post.images = [{ url: "" }];
      }
      post.text = deltaToHtml(post.text);
      post.text = convert(post.text);
      post.text = post.text.replace(/\[http.*?\]/gm, "");
      let charLength;
      if (post.text.length >= 200) {
        charLength = -(post.text.length - 200);
      } else {
        charLength = undefined;
      }
      post.text = post.text.slice(0, charLength);
    });
  };

  Blogpost.paginate(
    {},
    { page: req.query.page, limit: 12, sort: { date: -1 } }
  ).then((results) => {
    const { totalPages } = results;
    if (req.query.page > results.totalPages) {
      return res.redirect(
        url.format({
          pathname: "/admin/posts",
          query: {
            page: results.totalPages,
          },
        })
      );
    } else {
      posts = results.docs;

      transform(posts);
    }
    res.render("admin/posts", { posts, pageNumber, totalPages });
  });
};

module.exports.renderMorePosts = async (req, res) => {
  const pageNumber = req.body.page;
  let posts;
  let lastPage = false;

  const transform = (blogs) => {
    blogs.forEach((post) => {
      if (post.images.length === 0) {
        post.images = [{ url: "" }];
      }
      post.text = deltaToHtml(post.text);
      post.text = convert(post.text);
      post.text = post.text.replace(/\[http.*?\]/gm, "");
      let charLength;
      if (post.text.length >= 200) {
        charLength = -(post.text.length - 200);
      } else {
        charLength = undefined;
      }
      post.text = post.text.slice(0, charLength);
      post.text = post.text.trim();
      post.text = post.text.replace(/\n/g, " ");
    });
  };

  Blogpost.paginate(
    {},
    {
      page: pageNumber,
      limit: 12,
      sort: { date: -1 },
    }
  ).then((results) => {
    if (pageNumber === results.totalPages) {
      lastPage = true;
    }

    posts = results.docs;
    transform(posts);

    res.json({ posts, lastPage });
  });
};

module.exports.showPost = async (req, res) => {
  const post = await Blogpost.findById(req.params.id);
  if (!post) {
    req.flash("error", "Cannot find this post");
    return res.redirect("/");
  }
  post.text = deltaToHtml(post.text);

  res.render("admin/show", { post });
};

module.exports.renderEdit = (req, res) => {
  res.render("admin/edit");
};

module.exports.editPost = async (req, res) => {
  const { id } = req.params;
  const editedPost = await Blogpost.findByIdAndUpdate(
    id,
    {
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      countries: req.body.countries,
    },
    { new: true }
  );

  if (req.body.featured === true) {
    await FeaturedPost.findOneAndUpdate(
      {},
      { featuredPostId: new mongoose.Types.ObjectId(id) }
    );
  }

  if (req.body.images) {
    const difference = editedPost.images.filter(
      (x) => !req.body.images.includes(x)
    );

    editedPost.images = req.body.images;
    await editedPost.save();
  }

  req.flash("success", "Post saved!");
};

module.exports.deletePost = async (req, res) => {
  const { id } = req.params;
  await Blogpost.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted post");
  res.redirect(303, "/admin/posts");
};

module.exports.showProfiles = async (req, res) => {
  const pageNumber = req.query.page || 1;

  await User.paginate(
    {},
    { page: req.query.page, limit: 50, sort: { registrationDate: -1 } }
  ).then((results) => {
    const { totalPages } = results;
    if (req.query.page > results.totalPages) {
      return res.redirect(
        url.format({
          pathname: "/admin/profiles",
          query: {
            page: results.totalPages,
          },
        })
      );
    } else {
      const userProfiles = results.docs;

      res.render("admin/profiles", { userProfiles, pageNumber, totalPages });
    }
  });
};

module.exports.showFideSchoolApplicants = async (req, res) => {
  const pageNumber = req.query.page || 1;

  SchoolAwardsApplicant.paginate(
    {},
    { page: req.query.page, limit: 50, sort: { date: -1 }, lean: true }
  ).then((results) => {
    const { totalPages } = results;
    if (req.query.page > results.totalPages) {
      return res.redirect(
        url.format({
          pathname: "/admin/profiles",
          query: {
            page: results.totalPages,
          },
        })
      );
    } else {
      const applicants = results.docs;
      applicants.forEach((applicant) => {
        Object.keys(applicant).forEach((key) => {
          if (
            typeof applicant[key] === "string" ||
            applicant[key] instanceof String
          ) {
            applicant[key] = applicant[key].replace(/\n/g, "<br/>");
          }
        });
        applicant.date = applicant.date.toLocaleDateString("en-GB", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      });
      res.render("admin/fideSchoolApplicants", { applicants });
    }
  });
};

module.exports.deleteFideSchoolApplicant = async (req, res) => {
  const { id } = req.params;
  await SchoolAwardsApplicant.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted applicant");
  req.method = "GET";
  res.redirect(303, "/admin/fide-schools");
};

module.exports.downloadFideSchoolApplicants = async (req, res) => {
  const applicants = await SchoolAwardsApplicant.find({}, null, {
    sort: { date: -1 },
  });

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("School Awards");

  worksheet.columns = [
    { header: "Email", key: "email", style: { numFmt: "@" }, width: 20 },
    { header: "Name", key: "fullName", style: { numFmt: "@" }, width: 20 },
    {
      header: "Main contact?",
      key: "areYouMainContact",
      style: { numFmt: "@" },
    },
    {
      header: "Main contact name",
      key: "mainContactName",
      style: { numFmt: "@" },
      width: 20,
    },
    {
      header: "Main contact email",
      key: "mainContactEmail",
      style: { numFmt: "@" },
      width: 20,
    },
    {
      header: "Name of school",
      key: "nameOfSchool",
      style: { numFmt: "@" },
      width: 20,
    },
    {
      header: "Other school details",
      key: "otherSchoolDetails",
      style: { numFmt: "@" },
      width: 30,
    },
    {
      header: "Type of school",
      key: "typeOfSchool",
      style: { numFmt: "@" },
      width: 30,
    },
    { header: "School ID", key: "schoolId", style: { numFmt: "@" }, width: 20 },
    {
      header: "Facilities",
      key: "facilities",
      style: { numFmt: "@" },
      width: 50,
    },
    {
      header: "Student involvment",
      key: "studentInvolvment",
      style: { numFmt: "@" },
      width: 50,
    },
    {
      header: "Teaching materials",
      key: "teachingMaterials",
      style: { numFmt: "@" },
      width: 50,
    },
    {
      header: "Chess events",
      key: "chessEvents",
      style: { numFmt: "@" },
      width: 50,
    },
    {
      header: "Chess educators",
      key: "chessEducators",
      style: { numFmt: "@" },
      width: 50,
    },
    {
      header: "Representation of school chess",
      key: "representationOfSchoolChess",
      style: { numFmt: "@" },
      width: 50,
    },
    {
      header: "Social commitment",
      key: "socialCommitment",
      style: { numFmt: "@" },
      width: 50,
    },
    {
      header: "Chess as an educational tool",
      key: "chessAsAnEducationalTool",
      style: { numFmt: "@" },
      width: 50,
    },
    {
      header: "Financing school chess",
      key: "financingSchoolChess",
      style: { numFmt: "@" },
      width: 50,
    },
    {
      header: "testimonials",
      key: "testimonials",
      style: { numFmt: "@" },
      width: 50,
    },
    {
      header: "Processing your information",
      key: "processingYourInformation",
      style: { numFmt: "@" },
    },
    {
      header: "Publish on website",
      key: "publishOnWebsite",
      style: { numFmt: "@" },
    },
    { header: "date", key: "date" },
  ];

  worksheet.addRows(applicants);

  let rowIndex = 1;
  for (rowIndex; rowIndex <= worksheet.rowCount; rowIndex++) {
    worksheet.getRow(rowIndex).alignment = {
      vertical: "top",
      wrapText: true,
    };
    worksheet.getRow(rowIndex).height = 50;
  }

  function sendWorkbook(workbook, response) {
    var fileName = "FileName.xlsx";

    response.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    response.setHeader(
      "Content-Disposition",
      "attachment; filename=" + fileName
    );

    workbook.xlsx.write(response).then(function () {
      response.end();
    });
  }
  sendWorkbook(workbook, res);
};

module.exports.downloadUserData = async (req, res) => {
  const users = await User.find({}, null, {
    sort: { date: -1 },
  });

  console.log(users);

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Users");

  worksheet.columns = [
    { header: "Email", key: "email", style: { numFmt: "@" }, width: 20 },
    {
      header: "First Name",
      key: "firstName",
      style: { numFmt: "@" },
      width: 20,
    },
    { header: "Last Name", key: "lastName", style: { numFmt: "@" }, width: 20 },
    {
      header: "Role",
      key: "role",
      style: { numFmt: "@" },
    },
    {
      header: "Workplace",
      key: "workplace",
      style: { numFmt: "@" },
      width: 20,
    },
    {
      header: "Jobtitle",
      key: "jobtitle",
      style: { numFmt: "@" },
      width: 20,
    },
    {
      header: "Country of Residence",
      key: "countryResidence",
      style: { numFmt: "@" },
      width: 20,
    },
    {
      header: "CIE Responsibilities",
      key: "respCie",
      style: { numFmt: "@" },
      width: 30,
    },
    {
      header: "Registration Date",
      key: "registrationDate",
      width: 30,
    },
    { header: "Status", key: "status", style: { numFmt: "@" }, width: 20 },
    {
      header: "Newsletter",
      key: "newsletter",
      width: 10,
    },
  ];

  worksheet.addRows(users);

  let rowIndex = 1;
  for (rowIndex; rowIndex <= worksheet.rowCount; rowIndex++) {
    worksheet.getRow(rowIndex).alignment = {
      vertical: "top",
      wrapText: true,
    };
    worksheet.getRow(rowIndex).height = 50;
  }

  function sendWorkbook(workbook, response) {
    var fileName = "FileName.xlsx";

    response.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    response.setHeader(
      "Content-Disposition",
      "attachment; filename=" + fileName
    );

    workbook.xlsx.write(response).then(function () {
      response.end();
    });
  }
  sendWorkbook(workbook, res);
};

module.exports.loadMoreUsers = (req, res) => {
  const pageNumber = req.body.page;
  let lastPage = false;

  User.paginate(
    {},
    {
      page: pageNumber,
      limit: 100,
      sort: { date: -1 },
    }
  ).then((results) => {
    if (pageNumber === results.totalPages) {
      lastPage = true;
    }
    const users = results.docs;

    res.json({ users, lastPage });
  });
};
