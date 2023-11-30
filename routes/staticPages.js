const express = require("express");
const router = express.Router();
const staticPages = require("../controllers/staticPages");
const { isLoggedIn, isAdmin } = require("../middleware");

const staticRoute = (route, page, fileUpload, loggedIn = false) => {
  return (
    router
      .route(`/${route}`)
      .get(
        (loggedIn = true ? isLoggedIn : null),
        staticPages.renderPage(route, fileUpload)
      )
      .put(isAdmin, staticPages.editPage(page)) &&
    router.get(`/${route}/edit`, isAdmin, staticPages.renderEditor()) &&
    router.get(`/${route}/json`, isAdmin, staticPages.getPageContents(page))
  );
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
