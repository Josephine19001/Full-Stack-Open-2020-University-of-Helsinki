const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const blogRouter = require("./controllers/blog");
const config = require("./utils/config");

const mongoURI = config.MONGODBURI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}).then((result) => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message)
  })

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogRouter);

module.exports = app;
