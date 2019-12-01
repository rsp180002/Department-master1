var createError = require("http-errors");
var express = require("express");
const mongoose = require("mongoose");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const oldestEmployee = require("./routes/oldestEmployee");
const numberOfEmployee = require("./routes/numberOfEmployee");
const managers = require("./routes/managers");
const highestPaid = require("./routes/highestPaid");
const avgDuration = require("./routes/avgDuration");

var app = express();
const dbUri = process.env.dbUri || "mongodb://localhost/nodeMongo";

mongoose
  .connect(dbUri, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.info("Mongodb Connected succesfully..."))
  .catch(err => console.log(err.message));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/oldest-employee", oldestEmployee);
app.use("/number-of-employee", numberOfEmployee);
app.use("/managers", managers);
app.use("/highest-paid", highestPaid);
app.use("/avg-duration", avgDuration);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
