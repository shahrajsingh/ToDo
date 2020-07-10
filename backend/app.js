const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const userRoutes = require("./routes/user");
const taskRoutes = require("./routes/task");

const app = express();

mongoose.connect("mongodb+srv://Shahraj:" + "az12sx34" +
  "@cluster0-9kpzp.gcp.mongodb.net/ToDoApp" +
  "?retryWrites=true&w=majority", { useNewUrlParser: true ,  useFindAndModify: false})
  .then(() => {
    console.log('connection successful :)');
  }).catch((error) => {
    console.log('could not connect!');
    console.log(error);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/users/", userRoutes);
app.use("/api/tasks/", taskRoutes);
module.exports = app;
