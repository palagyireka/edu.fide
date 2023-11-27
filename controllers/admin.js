const mongoose = require("mongoose");
const deltaToHtml = require("../utils/deltaToHtml");
const { convert } = require("html-to-text");
const Blogpost = require("../models/blogpost");
const FeaturedPost = require("../models/featuredPost");
const url = require("url");
const User = require("../models/user");

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
  });

  if (req.body.featured === true) {
    await FeaturedPost.findOneAndUpdate({}, { featuredPostId: newPost._id });
  }

  if (req.body.images) {
    newPost.images = req.body.images;
  }
  newPost.save().then((post) => {
    req.flash("success", "Successfully made a new post!");
    res.send("ok");
  });
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
  res.redirect("/admin/posts");
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
