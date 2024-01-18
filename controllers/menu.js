const deltaToHtml = require("../utils/deltaToHtml");
const { convert } = require("html-to-text");
const Blogpost = require("../models/blogpost");
const Countrycontact = require("../models/countrycontact");
const { OgMarkup, DefaultMarkup } = require("../utils/ogMarkup");
const tagNames = require("../utils/tagNames");

const cutPostText = (post, charLength) => {
  if (typeof post.text !== "string") {
    post.text = deltaToHtml(post.text);
  }
  post.text = convert(post.text);
  post.text = post.text.replace(/\[http.*?\]/gm, "");

  const cutat = post.text.lastIndexOf(" ", charLength);
  if (cutat != -1) {
    post.text = post.text.substring(0, cutat) + "...";
  }
};

module.exports.renderPosts = (tagName, path, country) => {
  return async (req, res) => {
    let lastPage = false;
    const pageNumber = req.query.page || 1;
    const transform = (blogs) => {
      blogs.forEach((post) => {
        if (post.images.length === 0) {
          post.images = [{ url: "/emaillogo.jpeg" }];
        }
        const charLength = post.title.length > 70 ? 130 : 150;

        cutPostText(post, charLength);
      });
    };

    let countryName = "";
    let query;

    if (country === true) {
      if (req.query.country) {
        const result = await Countrycontact.findOne({
          "alpha-2": req.query.country,
        });
        if (result) {
          countryName = result.name;
          query = { countries: req.query.country };
        } else {
          query = {};
        }
      } else {
        query = {};
      }
    } else {
      query = { $or: [{ tags: tagName }, { tags: "all" }] };
    }

    const normalTagName = tagNames[tagName];

    const ogMarkup = new DefaultMarkup(
      req,
      `${normalTagName} - FIDE Chess in Education Commission`
    );

    Blogpost.paginate(query, {
      page: pageNumber,
      limit: 14,
      sort: { date: -1 },
    }).then((results) => {
      if (pageNumber === results.totalPages) {
        lastPage = true;
      }
      const blogposts = results.docs;
      transform(blogposts);

      res.render("menu/posts", {
        blogposts,
        pageNumber,
        path,
        tagName,
        countryName,
        ogMarkup,
      });
    });
  };
};

module.exports.renderSinglePost = async (req, res) => {
  const post = await Blogpost.findById(req.params.id);
  if (!post) {
    req.flash("error", "Cannot find this post");
    return res.redirect("/");
  }
  post.text = deltaToHtml(post.text);

  const description = post;
  cutPostText(description, 170);
  description.text = description.text.replace(/[\n\r]/g, " ");

  const ogMarkup = post.images[0]
    ? new OgMarkup(
        req,
        "article",
        post.title,
        description.text,
        post.images[0].url
      )
    : new OgMarkup(req, "article", post.title, description.text);

  res.render("menu/show", { post, ogMarkup });
};

module.exports.loadMore = (tagName, country) => {
  return async (req, res) => {
    const pageNumber = req.body.page;
    let posts;
    let lastPage = false;

    const transform = (blogs) => {
      blogs.forEach((post) => {
        if (post.images.length === 0) {
          post.images = [{ url: "" }];
        }
        cutPostText(post, 170);
      });
    };

    let query;

    if (country === true) {
      if (req.query.country) {
        query = { countries: req.query.country };
      } else {
        query = {};
      }
    } else {
      query = { $or: [{ tags: tagName }, { tags: "all" }] };
    }

    Blogpost.paginate(query, {
      page: pageNumber,
      limit: 12,
      sort: { date: -1 },
    }).then((results) => {
      if (pageNumber === results.totalPages) {
        lastPage = true;
      }

      posts = results.docs;
      transform(posts);

      res.json({ posts, lastPage });
    });
  };
};
