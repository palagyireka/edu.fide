const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CoursebookPasswordSchema = new Schema({
  password: String,
  course: String,
});

module.exports = mongoose.model("CoursebookPassword", CoursebookPasswordSchema);
