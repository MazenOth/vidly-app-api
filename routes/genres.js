const express = require("express");
const router = express.Router();
const Joy = require("joi");
const mongoose = require("mongoose");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

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
    }
  })
);

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});


router.post("/", async (req, res) => {
  const { error } = validateGenre(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();
  res.send(genre);
});

router.put("/:id", async (req, res) => {
  const { error } = validateGenre(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!genre) res.status(404).send("The genre with the given ID wasn't found.");

  res.send(genre);
});

router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre)
  return res.status(404).send("The genre with the given ID wasn't found.");
  
  res.send(genre);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) res.status(404).send("The genre with the given ID wasn't found.");
  res.send(genre);
});

function validateGenre(genre) {
  const schema = Joy.object({
    name: Joy.string().min(5).required(),
  });
  return schema.validate(genre);
}

module.exports = router;
