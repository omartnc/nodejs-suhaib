const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const schemaUser = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 200
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  isAdmin: Boolean
});
schemaUser.methods.generateAuthToken = function() {
  const token = jwt.sign(
    {
      _id: this._id,
      isAdmin: this.isAdmin
    },
    config.get("jwtPrivateKey")
  );
  return token;
};
const User = mongoose.model("User", schemaUser);

function validateUser(User) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(200)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  };
  return Joi.validate(User, schema);
}

exports.User = User;
//exports.schemaUser = schemaUser;
exports.validate = validateUser;
