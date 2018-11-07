const Joi = require("joi");
const mongoose = require("mongoose");
const { titleSchema } = require("./title");

const schemaMember = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 200
  },
  surName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 200
  },
  faceId: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  title: {
    type: titleSchema,
    required: true
  }
});
const Member = mongoose.model("Member", schemaMember);

function validateMember(member) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(200)
      .required(),
    surName: Joi.string()
      .min(5)
      .max(200)
      .required(),
    faceId: Joi.string()
      .min(5)
      .max(1024)
      .required(),
    titleId: Joi.objectId().required()
  };
  return Joi.validate(member, schema);
}

exports.Member = Member;
exports.schemaMember = schemaMember;
exports.validate = validateMember;
