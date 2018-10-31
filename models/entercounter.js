const Joi = require("joi");
const mongoose = require("mongoose");
const { schemaMember } = require("./member");
const { schemaDoor } = require("./door");

const schemaEnterCounter = new mongoose.Schema({
  member: {
    type: schemaMember,
    required: true
  },
  door: {
    type: schemaDoor,
    required: true
  },
  Date: {
    type: Date,
    required: false,
    default: Date.now()
  }
});
const EnterCounter = mongoose.model("EnterCounter", schemaEnterCounter);

function validateEnterCounter(EnterCounter) {
  const schema = {
    doorId: Joi.objectId().required(),
    memberId: Joi.objectId().required()
  };
  return Joi.validate(EnterCounter, schema);
}

exports.EnterCounter = EnterCounter;
exports.schemaEnterCounter = schemaEnterCounter;
exports.validate = validateEnterCounter;
