const winston = require("winston");
const mongoose = require("mongoose");

module.exports = function () {
  mongoose.set("strictQuery", false);
  mongoose
    .connect("mongodb://127.0.0.1:27017/vidlyApi")
    .then(() => winston.info("Connected to MongoDB..."))
    .catch((err) => console.error("Could not connect to MongoDB...", err));
};
