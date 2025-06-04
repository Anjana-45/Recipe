
const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  filename: String,
  path: String,
  description: String,
});

const Image = mongoose.models.Image || mongoose.model("Image", imageSchema);

module.exports = Image;
