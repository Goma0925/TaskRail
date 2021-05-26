const express = require('express');
const GoogleAuth = require("../middleware/GoogleAuth");
const rootRouter = express.Router();

// Path configurations
rootRouter.use('/taskdata/', GoogleAuth.requireAuth, require('./WorkspaceRouter'));
rootRouter.use('/auth/', require('./UserRouter'));

module.exports = rootRouter; 