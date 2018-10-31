const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const titles = require("./routers/titles");
const doors = require("./routers/doors");
const members = require("./routers/members");
const doortitles = require("./routers/doortitles");

const express = require("express");
const app = express();

mongoose
  .connect("mongodb://localhost/faceIdSecurityDb")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB..."));

app.use(express.json());

app.use("/api/titles", titles);
app.use("/api/doors", doors);
app.use("/api/members", members);
app.use("/api/doortitles", doortitles);

const port = process.env.PORT || 6000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
//Face ID and Door ID
