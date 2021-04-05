const express = require('express');

const rootRouter = express.Router()
rootRouter.use('/', require('./taskRouter.js'))

rootRouter.route("/").get((req, res)=>{
    console.log("Root acceessed");
});

module.exports = rootRouter; 