const express = require("express");
const authRouter = express.Router();
const mongoUtil = require("../MongoUtil");
const GoogleAuth = require("../middleware/GoogleAuth");

authRouter.post("/login", GoogleAuth.requireAuth, (req, res) => {
    // If the GoogleAuth.login middleware passes, just return the success response.
    res.send({success: true});
});

authRouter.post("/signup", (req, res)=>{
    // Check if the auth token is sent.
    if (!req.headers.authorization) {
        return res.status(403).json({ status:false, error_msg: "Authentication token not provided in the header." });
    }
    const authParts = req.headers.authorization.split(" ");
    const tokenType = authParts[0];
    if (tokenType == "Bearer"){

    }
})

module.exports = authRouter;