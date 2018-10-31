const { Title, validate } = require("../models/title");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const titles = await Title.find().sort("name");
  res.send(titles);
});
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const title = new Title({
    name: req.body.name
  });
  await title.save();
  res.send(title);
});
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const title = await Title.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name
    },
    { new: true }
  );

  if (!title)
    return res.status(404).send("The title with ye ID was not found.");

  res.send(title);
});
router.delete("/:id", async (req, res) => {
  const title = await Title.findByIdAndRemove(req.params.id);

  if (!title)
    return res
      .status(400)
      .send("The category with the given ID was not found.");

  res.send(title);
});
module.exports = router;
