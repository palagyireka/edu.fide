const deltaToHtml = require("../utils/deltaToHtml");
const { convert } = require("html-to-text");
const Blogpost = require("../models/blogpost");
const url = require("url");

const renderPosts = (tagName, path) => {
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

    const query = { $or: [{ tags: tagName }, { tags: "all" }] };

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
      });
    });
  };
};

const renderSinglePost = async (req, res) => {
  const post = await Blogpost.findById(req.params.id);
  if (!post) {
    req.flash("error", "Cannot find this post");
    return res.redirect("/");
  }
  post.text = deltaToHtml(post.text);

  res.render("menu/show", { post });
};

const loadMore = (tagName) => {
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

    const query = { $or: [{ tags: tagName }, { tags: "all" }] };

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

module.exports.renderCommissionNews = renderPosts(
  "commissionNews",
  "commissionnews"
);
module.exports.showCommissionNews = renderSinglePost;
module.exports.renderMoreCommissionNews = loadMore("commissionNews");

module.exports.renderConferences = renderPosts("conferences", "conferences");
module.exports.showConferences = renderSinglePost;
module.exports.renderMoreConferences = loadMore("conferences");

module.exports.renderInitiatives = renderPosts("cieInitiatives", "initiatives");
module.exports.showInitiatives = renderSinglePost;
module.exports.renderMoreInitiatives = loadMore("cieInitiatives");

module.exports.renderPersonalStories = renderPosts(
  "personalStories",
  "personalstories"
);
module.exports.showPersonalStories = renderSinglePost;
module.exports.renderMorePersonalStories = loadMore("personalStories");

module.exports.renderResearchNews = renderPosts("researchNews", "researchnews");
module.exports.showResearchNews = renderSinglePost;
module.exports.renderMoreResearchNews = loadMore("researchNews");

module.exports.renderCourseNews = renderPosts("courseNews", "coursenews");
module.exports.showCourseNews = renderSinglePost;
module.exports.renderMoreCourseNews = loadMore("courseNews");

module.exports.renderCieNews = renderPosts("cieNews", "cienews");
module.exports.showCieNews = renderSinglePost;
module.exports.renderMoreCieNews = loadMore("cieNews");

module.exports.renderBlog = renderPosts("blog", "blog");
module.exports.showBlog = renderSinglePost;
module.exports.renderMoreBlog = loadMore("blog");
