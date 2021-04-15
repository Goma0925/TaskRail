const express = require('express');

const rootRouter = express.Router()
rootRouter.use('/', require('./TaskRouter.js'))

rootRouter.route("/").get((req, res)=>{
    console.log("Root acceessed");
});

module.exports = rootRouter; 