const express = require('express');
const GoogleAuth = require("../middleware/GoogleAuth");
const rootRouter = express.Router();

// Path configurations
rootRouter.use('/taskdata/', GoogleAuth.requireAuth, require('./WorkspaceRouter'));
rootRouter.use('/auth/', require('./UserRouter'));

rootRouter.route("/hi").get((req, res)=>{
    // Serve the base HTML file from the client/build folder.
    console.log("Root access");
});

module.exports = rootRouter; 