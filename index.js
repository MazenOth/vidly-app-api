const express = require("express");
const app = express();
const genres = require("./routes/genres");
const home = require("./routes/home");

// app.use(express.json());
app.use("/vidly.com/api/genres", genres);
app.use("/vidly.com/", home);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
