const deltaToHtml = require("../utils/deltaToHtml");
const { convert } = require("html-to-text");
const Blogpost = require("../models/blogpost");
const url = require("url");

module.exports.blogpostRender = async (req, res) => {
  const post = await Blogpost.findById(req.params.id);
  if (!post) {
    req.flash("error", "Cannot find this post");
    return res.redirect("/");
  }
  post.text = deltaToHtml(post.text);

  res.render("blog/show", { post });
};

module.exports.renderEdit = (req, res) => {
  res.render("blog/edit");
};

module.exports.renderNew = (req, res) => {
  res.render("blog/new");
};

module.exports.createPost = (req, res) => {};

module.exports.edit = async (req, res) => {
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

  req.flash("success", "Post saved!");
};

module.exports.blogpostsRender = async (req, res) => {
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

  const query = { $or: [{ tags: "blog" }, { tags: "all" }] };

  Blogpost.paginate(query, {
    page: req.query.page,
    limit: 12,
    sort: { date: -1 },
  }).then((results) => {
    const { totalPages } = results;
    if (req.query.page > results.totalPages) {
      return res.redirect(
        url.format({
          pathname: "/blog",
          query: {
            page: results.totalPages,
          },
        })
      );
    } else {
      blogposts = results.docs;
      transform(blogposts);
    }

    res.render("blog/blogs", { blogposts, pageNumber, totalPages });
  });
};

module.exports.delete = async (req, res) => {};
