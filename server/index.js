require("dotenv").config();
const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const mongoUtil = require("./MongoUtil");
const app = express();
const PORT = process.env.PORT;
console.log("index.js loaded...");
var corsOptions = {
  origin: "http://localhost:3000",
};

//Print the env variable
if (!process.env) {
  throw "Environment variable file not set. Please create a file .env.production for production, .env.test for test environment.";
}
console.log("ENV VARS:\n", process.env);

mongoUtil.connect(() => {
  console.log("mongoDB connected...");
  // Start the app after mongo db is connected.
  //app.engine("html", require("ejs").renderFile);
  app.set("view engine", "html");
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  //app.use("/static", express.static(path.join(__dirname, "./../../taskrail_client/build/static"))); //JS and CSS files
  app.use("/app", express.static(path.join(__dirname, "./../client/build")));
  app.use(
    "/static",
    express.static(path.join(__dirname, "./../client/build/static"))
  );

  //app.use(serveStatic(path.join(__dirname, 'public')))
  //app.use("/static/", express.static("./../../taskrail_client/build")); //HTML file
  app.listen(PORT || 3000, () => "");
  // Do not add path here, Add all the paths to the root router.
  const rootRouter = require("./routes/RootRouter");
  app.use("/api", cors(corsOptions), rootRouter);
});
