const genres = require("../routes/genres");
const customers = require("../routes/customers");
const movies = require("../routes/movies");
const rentals = require("../routes/rentals");
const home = require("../routes/home");
const users = require("../routes/users");
const auth = require("../routes/auth");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use("/vidly.com/api/genres", genres);
  app.use("/vidly.com/api/customers", customers);
  app.use("/vidly.com/api/movies", movies);
  app.use("/vidly.com/api/rentals", rentals);
  app.use("/vidly.com/api/users", users);
  app.use("/vidly.com/api/auth", auth);
  app.use("/vidly.com/", home);
  app.use(error);
};
