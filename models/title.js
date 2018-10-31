const Joi = require("joi");
const mongoose = require("mongoose");

const titleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 200
  }
});
const Title = mongoose.model("Title", titleSchema);

function validateTitle(Title) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(200)
      .required()
  };
  return Joi.validate(Title, schema);
}

exports.Title = Title;
exports.titleSchema = titleSchema;
exports.validate = validateTitle;
