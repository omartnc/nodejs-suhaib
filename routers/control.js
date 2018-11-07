const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { DoorTitle, validateForControl } = require("../models/doorTitle");
const { Member } = require("../models/member");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/:faceId/:doorId", [auth, admin], async (req, res) => {
  const member = await Member.findOne({ faceId: req.params.faceId });
  if (!member) return res.status(400).send("FaceId is not found.");

  const { error } = validateForControl({ doorId: req.params.doorId });
  if (error) return res.status(400).send(error.details[0].message);
  const doorTitle = await DoorTitle.findOne({ "door._id": req.params.doorId });
  if (!doorTitle)
    return res.status(400).send({
      isEnter: false
    });

  if (member.title._id.toString() === doorTitle.title._id.toString()) {
    return res.send({
      member: member,
      doorTitle: doorTitle,
      isEnter: true
    });
  } else {
    return res.status(400).send({
      member: member,
      doorTitle: doorTitle,
      isEnter: false
    });
  }
});
module.exports = router;
