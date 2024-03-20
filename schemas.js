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

module.exports.schoolAwardsApplicantSchema = Joi.object({
  email: Joi.string().max(100).escapeHTML(),
  fullName: Joi.string().max(500).escapeHTML(),
  areYouMainContact: Joi.string().max(20).escapeHTML(),
  mainContactName: Joi.string().max(500).escapeHTML(),
  mainContactEmail: Joi.string().max(100).escapeHTML(),
  nameOfSchool: Joi.string().max(1000).escapeHTML(),
  otherSchoolDetails: Joi.string().max(10000).escapeHTML(),
  typeOfSchool: Joi.string().max(500).escapeHTML(),
  schoolId: Joi.string().max(100).escapeHTML(),
  facilities: Joi.string().max(10000).escapeHTML(),
  studentInvolvment: Joi.string().max(10000).escapeHTML(),
  teachingMaterials: Joi.string().max(10000).escapeHTML(),
  chessEvents: Joi.string().max(10000).escapeHTML(),
  chessEducators: Joi.string().max(10000).escapeHTML(),
  representationOfSchoolChess: Joi.string().max(10000).escapeHTML(),
  socialCommitment: Joi.string().max(10000).escapeHTML(),
  chessAsAnEducationalTool: Joi.string().max(10000).escapeHTML(),
  financingSchoolChess: Joi.string().max(10000).escapeHTML(),
  testimonials: Joi.string().max(50).escapeHTML(),
  processingYourInformation: Joi.string().max(50).escapeHTML(),
  publishOnWebsite: Joi.string().max(50).escapeHTML(),
  date: Joi.date(),
});
