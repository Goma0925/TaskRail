const express = require("express");
const staticRouter = express.Router();

staticRouter.route("/static").get((req, res) => {
  console.log("App served.");
  //res.render("index.html");
});

module.exports = staticRouter;
