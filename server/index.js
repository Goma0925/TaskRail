require("dotenv").config();
const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const mongoUtil = require("./MongoUtil");
const app = express();
const PORT = process.env.PORT;

var corsOptions = {
  origin: "http://localhost:3000",
};

console.log("Index JS ran...");
mongoUtil.connect(() => {
  console.log("mongoUtil connected...");
  // Start the app after mongo db is connected.
  //app.engine("html", require("ejs").renderFile);
  app.set("view engine", "html");
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  //app.use("/static", express.static(path.join(__dirname, "./../../taskrail_client/build/static"))); //JS and CSS files
  app.use("/app/", express.static(path.join(__dirname, "./../client/build")));
  app.use("/", express.static(path.join(__dirname, "./../client/build")));

  //app.use(serveStatic(path.join(__dirname, 'public')))
  //app.use("/static/", express.static("./../../taskrail_client/build")); //HTML file
  app.listen(PORT || 3000, () => "");
  // Do not add path here, Add all the paths to the root router.
  //const rootRouter = require("./routes/RootRouter");
  //app.use("/", cors(corsOptions), rootRouter);
});
