const deltaToHtml = require("../utils/deltaToHtml");
const { convert } = require("html-to-text");
const Blogpost = require("../models/blogpost");
const Countrycontact = require("../models/countrycontact");
const url = require("url");

module.exports.renderPosts = (tagName, path, country) => {
  return async (req, res) => {
    let lastPage = false;
    const pageNumber = req.query.page || 1;
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
      });
    };

    let countryName = "";
    let query;

    if (country === true) {
      if (req.query.country) {
        query = { countries: req.query.country };
        Countrycontact.findOne({ "alpha-2": req.query.country }).then(
          (result) => {
            if (result) {
              countryName = result.name;
            }
          }
        );
      } else {
        query = {};
      }
    } else {
      query = { $or: [{ tags: tagName }, { tags: "all" }] };
    }

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

  res.render("menu/show", { post });
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
