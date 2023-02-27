const Joy = require("joi");
const mongoose = require("mongoose");

const Genre = mongoose.model(
  "Genre",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    _id: {
      type: String,
      default: mongoose.Types.ObjectId,
    },
  })
);

function validateGenre(genre) {
  const schema = Joy.object({
    name: Joy.string().min(5).required(),
  });
  return schema.validate(genre);
}


exports.Genre = Genre;
exports.validate = validateGenre;