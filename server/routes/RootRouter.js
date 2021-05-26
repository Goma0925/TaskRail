const express = require('express');
const rootRouter = express.Router();

// Path configurations
rootRouter.use('/api', require("./ApiRouter"));
rootRouter.use("/", require("./StaticRouter"));

module.exports = rootRouter; 