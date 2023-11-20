const express = require("express");
const router = express.Router();
const staticPages = require("../controllers/staticPages");

const staticRoute = (route, page, fileUpload) => {
  return (
    router
      .route(`/${route}`)
      .get(staticPages.renderPage(route, fileUpload))
      .put(staticPages.editPage(page)) &&
    router.get(`/${route}/edit`, staticPages.renderEditor()) &&
    router.get(`/${route}/json`, staticPages.getPageContents(page))
  );
};

staticRoute("intro", "intro");
staticRoute("onlinetools", "onlineTools");
staticRoute("books", "books");
staticRoute("sendus", "sendUs", true);
staticRoute("course-registration", "courseRegistration");
staticRoute("pot/potinfo", "potInfo");
staticRoute("pol/polinfo", "polInfo");
staticRoute("fide-schools", "fideSchools", true);

module.exports = router;
