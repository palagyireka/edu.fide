const express = require("express");

class OgMarkup {
  constructor(req, type, title, description, image) {
    this.type = type;
    this.title = title;
    this.description = description;
    image
      ? (this.image = image)
      : (this.image =
          req.protocol + "://" + req.get("host") + "/emaillogo.jpeg");
    this.url = req.protocol + "://" + req.get("host") + req.originalUrl;
  }
}

class DefaultMarkup extends OgMarkup {
  constructor(req, title, image) {
    super(req, undefined, title, undefined, image);
  }
  type = "website";
  description = "We belive that chess is a great educational tool";
}

module.exports = { OgMarkup, DefaultMarkup };
