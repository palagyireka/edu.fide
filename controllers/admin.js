const deltaToHtml = require("../utils/deltaToHtml");
const { convert } = require("html-to-text");
const Blogpost = require("../models/blogpost");
const url = require("url");

module.exports.renderNew = (req, res) => {
  res.render("admin/new");
};

module.exports.renderPosts = (req, res) => {
  const pageNumber = req.query.page || 1;
  let posts;

  const transform = (paginatedPosts) => {
    paginatedPosts.forEach((post) => {
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

  Blogpost.paginate({}, { page: req.query.page, limit: 12 }).then((results) => {
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
    },
    { new: true }
  );
  if (req.body.image) {
    editedPost.image[0] = {
      url: req.body.image.url,
      filename: req.body.image.filename,
    };
    await editedPost.save();
  }
  if (editedPost) {
    req.flash("success", "Post saved!");
    res.send("ok");
  } else {
    req.flash("error", "Something went wrong!");
  }
};

module.exports.deletePost = async (req, res) => {};
