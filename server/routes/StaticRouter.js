const express = require("express");
const staticRouter = express.Router();
const path = require("path");

staticRouter.use(express.static(path.join(path.resolve("../"), "client/build")), ()=>{console.log(path.join(path.resolve("../"), "client/build"))});

module.exports = staticRouter;
