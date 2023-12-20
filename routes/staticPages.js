const express = require("express");
const router = express.Router();
const staticPages = require("../controllers/staticPages");
const { isLoggedIn, isAdmin } = require("../middleware");

const staticRoute = (route, page, fileUpload, loggedIn) => {
  if (loggedIn === true) {
    return (
      router
        .route(`/${route}`)
        .get(isLoggedIn, staticPages.renderPage(route, fileUpload))
        .put(isAdmin, staticPages.editPage(page)) &&
      router.get(`/${route}/edit`, isAdmin, staticPages.renderEditor()) &&
      router.get(`/${route}/json`, staticPages.getPageContents(page))
    );
  } else {
    return (
      router
        .route(`/${route}`)
        .get(staticPages.renderPage(route, fileUpload))
        .put(isAdmin, staticPages.editPage(page)) &&
      router.get(`/${route}/edit`, isAdmin, staticPages.renderEditor()) &&
      router.get(`/${route}/json`, staticPages.getPageContents(page))
    );
  }
};

staticRoute("intro", "intro");
staticRoute("onlinetools", "onlineTools");
staticRoute("books", "books");
staticRoute("sendus", "sendUs", true, true);
staticRoute("course-registration", "courseRegistration");
staticRoute("pot/potinfo", "potInfo");
staticRoute("pol/polinfo", "polInfo");
staticRoute("fide-schools", "fideSchools", true);

module.exports = router;
