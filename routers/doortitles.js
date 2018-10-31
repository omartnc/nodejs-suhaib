const { DoorTitle, validate } = require("../models/doorTitle");
const { Title } = require("../models/title");
const { Door } = require("../models/door");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const DoorTitles = await DoorTitle.find();
  res.send(DoorTitles);
});
router.get("/:id", async (req, res) => {
  const doorTitle = await DoorTitle.findById(req.params.id);

  if (!doorTitle)
    return res
      .status(404)
      .send("The DoorTitle with the given ID was not found.");

  res.send(doorTitle);
});
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const title = await Title.findById(req.body.titleId);
  if (!title) return res.status(400).send("Invalid Title.");

  const door = await Door.findById(req.body.doorId);
  if (!door) return res.status(400).send("Invalid door.");

  const doorTitle = new DoorTitle({
    title: {
      _id: title._id,
      name: title.name
    },
    door: {
      _id: door._id,
      name: door.name
    }
  });
  await doorTitle.save();

  res.send(doorTitle);
});
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const title = await Title.findById(req.body.titleId);
  if (!title) return res.status(400).send("Invalid Title.");

  const door = await Door.findById(req.body.doorId);
  if (!door) return res.status(400).send("Invalid door.");

  const doorTitle = await DoorTitle.findByIdAndUpdate(
    req.params.id,
    {
      title: {
        _id: title._id,
        name: title.name
      },
      door: {
        _id: door._id,
        name: door.name
      }
    },
    { new: true }
  );

  if (!doorTitle)
    return res
      .status(404)
      .send("The doorTitle with the given ID was not found.");

  res.send(doorTitle);
});
router.delete("/:id", async (req, res) => {
  const doorTitle = await DoorTitle.findByIdAndRemove(req.params.id);

  if (!doorTitle)
    return res
      .status(404)
      .send("The doorTitle with the given ID was not found.");

  res.send(doorTitle);
});
module.exports = router;
