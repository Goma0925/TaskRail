const express = require("express");
const authRouter = express.Router();
const mongoUtil = require("../MongoUtil");
const GoogleAuth = require("../middleware/GoogleAuth");

authRouter.post("/login", GoogleAuth.login, (req, res) => {
    // If the GoogleAuth.login middleware passes, just return the success response.
    res.send({success: true});
});

authRouter.post("./signup", GoogleAuth.login, (req, res)=>{
    console(req.app.locals.user);
})

module.exports = authRouter;