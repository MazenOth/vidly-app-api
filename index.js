const mongoose = require("mongoose");
const express = require("express");
const app = express();
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const home = require("./routes/home");

mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://127.0.0.1:27017/vidlyApi")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

app.use("/vidly.com/api/genres", genres);
app.use("/vidly.com/api/customers", customers);
app.use("/vidly.com/", home);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
