//basic

const express = require("express");
const router = require("./src/routes/api");
const app = new express();
const bodyParser = require("body-parser");

//security middleware import

const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const xss = require("xss-clean");
const cors = require("cors");

//database
const mongoose = require("mongoose");

//security middleware implement

app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());
app.use(xss());
app.use(cors());

//bodyParser implement

app.use(bodyParser.json());

//request rate limit

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);

//mongo db database connection

let URI = "mongodb://127.0.0.1:27017/Todo"; //todo is the database name
let OPTION = { user: "", pass: "", autoIndex: true };

mongoose.connect(URI, OPTION, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("connection successfull");
  }
});

//routing implementing

app.use("/api/v1", router);

//undefined routing handling

app.use("*", (req, res) => {
  res
    .status(404)
    .json({ status: "router not found", data: "router not found" });
});

//module export

module.exports = app;
