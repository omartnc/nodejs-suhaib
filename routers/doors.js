const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Door, validate } = require("../models/door");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", [auth, admin], async (req, res) => {
  const doors = await Door.find().sort("name");
  res.send(doors);
});
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const door = new Door({
    name: req.body.name
  });
  await door.save();
  res.send(door);
});
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const door = await Door.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!door) return res.status(404).send("The door with ye ID was not found.");

  res.send(door);
});
router.delete("/:id", [auth, admin], async (req, res) => {
  const door = await Door.findByIdAndRemove(req.params.id);

  if (!door)
    return res.status(404).send("The door with the given ID was not found.");
  res.send(door);
});
module.exports = router;
