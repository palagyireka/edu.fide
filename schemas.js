const BaseJoi = require("joi");
const sanitizeHtml = require("sanitize-html");

const extension = (joi) => ({
  type: "string",
  base: joi.string(),
  messages: {
    "string.escapeHTML": "{{#label}} must not include HTML!",
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (clean !== value)
          return helpers.error("string.escapeHTML", { value });
        return clean;
      },
    },
  },
});

const Joi = BaseJoi.extend(extension);

module.exports.userSchema = Joi.object({
  email: Joi.string().email().required(),
  firstName: Joi.string().max(50).required().escapeHTML(),
  lastName: Joi.string().max(50).required().escapeHTML(),
  workplace: Joi.string().max(50).escapeHTML().allow(""),
  jobtitle: Joi.string().max(50).escapeHTML().allow(""),
  countryResidence: Joi.string().required().max(50).escapeHTML().allow(""),
  respCie: Joi.string().max(400).allow("").escapeHTML(),
  newsletter: Joi.string().escapeHTML(),
  password: Joi.string().min(6).max(16).required(),
});

module.exports.coursebookPasswordSchema = Joi.object({
  coursebookPw: Joi.string().escapeHTML().required(),
});
