const Joi = require("joi");
const mongoose = require("mongoose");

const doorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 200
  }
});
const Door = mongoose.model("Door", doorSchema);

function validateDoor(Door) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(200)
      .required()
  };
  return Joi.validate(Door, schema);
}

exports.Door = Door;
exports.doorSchema = doorSchema;
exports.validate = validateDoor;
