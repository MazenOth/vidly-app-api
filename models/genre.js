const Joi = require("joi");
const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ["Sci-Fi", "Action", "Thriller", "Comedy", "Drama"],
    minlength: 5,
    maxlength: 50,
  },
  _id: {
    type: String,
    default: mongoose.Types.ObjectId,
  }
});

const Genre = mongoose.model("Genre", genreSchema);

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(5).required(),
  });
  return schema.validate(genre);
}

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validateGenre;