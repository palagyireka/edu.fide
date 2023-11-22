const express = require("express");
const router = express.Router();
const menu = require("../controllers/menu");

const menuRoute = (tagName, path, country) => {
  return (
    router
      .route(`/${path}`)
      .get(menu.renderPosts(tagName, path, country))
      .post(menu.loadMore(tagName, country)) &&
    router.get(`/${path}/:id`, menu.renderSinglePost)
  );
};

menuRoute("commissionNews", "commissionnews");
menuRoute("conferences", "conferences");
menuRoute("cieInitiatives", "initiatives");
menuRoute("personalStories", "personalstories");
menuRoute("researchNews", "researchnews");
menuRoute("courseNews", "coursenews");
menuRoute("cieNews", "cienews");
menuRoute("blog", "blog");
menuRoute("", "posts", true);

module.exports = router;
