const Joi = require("joi");
const mongoose = require("mongoose");
const { titleSchema } = require("./title");
const { doorSchema } = require("./door");

const DoorTitle = mongoose.model(
  "DoorTitle",
  new mongoose.Schema({
    title: {
      type: titleSchema,
      required: true
    },
    door: {
      type: doorSchema,
      required: true
    }
  })
);

function validateDoorTitle(DoorTitle) {
  const schema = {
    titleId: Joi.objectId().required(),
    doorId: Joi.objectId().required()
  };
  return Joi.validate(DoorTitle, schema);
}
function validateDoorTitleForControl(DoorTitle) {
  const schema = {
    doorId: Joi.objectId().required()
  };
  return Joi.validate(DoorTitle, schema);
}

exports.DoorTitle = DoorTitle;
exports.validate = validateDoorTitle;
exports.validateForControl = validateDoorTitleForControl;
