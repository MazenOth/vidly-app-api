const express = require("express");
const app = express();
const Joy = require("joi");

app.use(express.json());

const genres = [
  { id: 1, name: "Drama" },
  { id: 2, name: "Action" },
  { id: 3, name: "Romance" },
  { id: 4, name: "Comedy" },
];

app.get("/", (req, res) => {
  res.send("Welcome To Vidly!");
});

app.get("/vidly.com/api/genres", (req, res) => {
  res.send(genres);
});

app.get("/vidly.com/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) res.status(404).send("The genre with the given ID wasn't found.");
  res.send(genre);
});

app.post("/vidly.com/api/genres", (req, res) => {
  const { error } = validateGenre(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);
  res.send(genre);
});

app.put("/vidly.com/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) res.status(404).send("The genre with the given ID wasn't found.");

  const { error } = validateGenre(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  genre.name = req.body.name;
  res.send(genre);
});

app.delete("/vidly.com/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("The genre with the given ID wasn't found.");

  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genre);
});

function validateGenre(genre) {
  const schema = Joy.object({
    name: Joy.string().min(3).required(),
  });
  return schema.validate(genre);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
