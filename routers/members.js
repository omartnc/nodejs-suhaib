const { Member, validate } = require("../models/member");
const { Title } = require("../models/title");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const members = await Member.find().sort("name");
  res.send(members);
});
router.get("/:id", async (req, res) => {
  const member = await Member.findById(req.params.id);

  if (!member)
    return res.status(404).send("The member with the given ID was not found.");

  res.send(member);
});
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const title = await Title.findById(req.body.titleId);
  if (!title) return res.status(400).send("Invalid Title.");

  const member = new Member({
    name: req.body.name,
    surName: req.body.surName,
    faceId: req.body.faceId,
    title: {
      _id: title._id,
      name: title.name
    }
  });
  await member.save();

  res.send(member);
});
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const title = await Title.findById(req.body.titleId);
  if (!title) return res.status(400).send("Invalid Title.");

  const member = await Member.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      surName: req.body.surName,
      faceId: req.body.faceId,
      title: {
        _id: title._id,
        name: title.name
      }
    },
    { new: true }
  );

  if (!member)
    return res.status(404).send("The Member with the given ID was not found.");

  res.send(member);
});
router.delete("/:id", async (req, res) => {
  const member = await Member.findByIdAndRemove(req.params.id);

  if (!member)
    return res.status(404).send("The member with the given ID was not found.");

  res.send(member);
});
module.exports = router;
