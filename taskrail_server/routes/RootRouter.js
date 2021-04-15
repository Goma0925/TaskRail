const express = require('express');
const GoogleAuth = require("../middleware/GoogleAuth");

const rootRouter = express.Router();

// Path configurations
rootRouter.use('/taskdata/', require('./TaskRouter.js'));
rootRouter.use('/auth/', require('./AuthRouter.js'));

rootRouter.route("/").get((req, res)=>{
    console.log("Root acceessed");
});

module.exports = rootRouter; 