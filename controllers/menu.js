const deltaToHtml = require("../utils/deltaToHtml");
const { convert } = require("html-to-text");
const Blogpost = require("../models/blogpost");
const url = require("url");

const renderPosts = (tagName, path) => {
  return async (req, res) => {
    const pageNumber = req.query.page || 1;
    let blogposts;
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
      page: req.query.page,
      limit: 12,
      sort: { date: -1 },
    }).then((results) => {
      const { totalPages } = results;
      if (req.query.page > results.totalPages) {
        return res.redirect(
          url.format({
            pathname: `/${path}`,
            query: {
              page: results.totalPages,
            },
          })
        );
      } else {
        blogposts = results.docs;
        transform(blogposts);
      }

      res.render("menu/posts", {
        blogposts,
        pageNumber,
        totalPages,
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

module.exports.renderCommissionNews = renderPosts(
  "commissionNews",
  "commissionnews"
);
module.exports.showCommissionNews = renderSinglePost;

module.exports.renderConferences = renderPosts("conferences", "conferences");
module.exports.showConferences = renderSinglePost;

module.exports.renderInitiatives = renderPosts("cieInitiatives", "initiatives");
module.exports.showInitiatives = renderSinglePost;

module.exports.renderPersonalStories = renderPosts(
  "personalStories",
  "personalstories"
);
module.exports.showPersonalStories = renderSinglePost;

module.exports.renderResearchNews = renderPosts("researchNews", "researchnews");
module.exports.showResearchNews = renderSinglePost;

module.exports.renderCourseNews = renderPosts("courseNews", "coursenews");
module.exports.showCourseNews = renderSinglePost;

module.exports.renderCieNews = renderPosts("cieNews", "cienews");
module.exports.showCieNews = renderSinglePost;
