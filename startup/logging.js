const winston = require("winston");
var {Loggly} = require('winston-loggly-bulk');
require("winston-mongodb");
require("express-async-errors");

module.exports = function () {
  process.on("uncaughtException", (ex) => {
    winston.error(ex.message, ex);
  });
  
  process.on("unhandledRejection", (ex) => {
    winston.error(ex.message, ex);
  });

  winston.add(new winston.transports.File({ filename: "logfile.log" }));
  winston.add(
    new winston.transports.MongoDB({ db: "mongodb://127.0.0.1/vidlyApi" })
  );

winston.add(new Loggly({
    token: "05b32c5a-e107-44a0-a2c3-d93ce3245c80",
    subdomain: "mazenothman",
    tags: ["Winston-NodeJS"],
    json: true
}));

};
