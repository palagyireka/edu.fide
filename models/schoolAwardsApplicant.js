const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

const SchoolAwardsApplicantSchema = new Schema({
  email: String,
  fullName: String,
  areYouMainContact: String,
  mainContactName: String,
  mainContactEmail: String,
  nameOfSchool: String,
  otherSchoolDetails: String,
  typeOfSchool: String,
  schoolId: String,
  facilities: String,
  studentInvolvment: String,
  teachingMaterials: String,
  chessEvents: String,
  chessEducators: String,
  representationOfSchoolChess: String,
  socialCommitment: String,
  chessAsAnEducationalTool: String,
  financingSchoolChess: String,
  testimonials: String,
  processingYourInformation: String,
  publishOnWebsite: String,
  date: Date,
  language: String,
});

SchoolAwardsApplicantSchema.plugin(mongoosePaginate);

module.exports = mongoose.model(
  "SchoolAwardsApplicant",
  SchoolAwardsApplicantSchema
);
