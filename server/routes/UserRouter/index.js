const express = require("express");
const authRouter = express.Router();
const GoogleAuth = require("../../middleware/GoogleAuth");
const User = require("../../models/User.model");
const JsonUtil = require("../../util/JsonUtil");

authRouter.post("/login", GoogleAuth.requireAuth, (req, res) => {
    // If the GoogleAuth.requireAuth middleware passes, which checks if the request is made by a valid TaskRail user using a Google account, just return the success response.
    res.status(200).json(JsonUtil.successJson(res.locals.user));
});

authRouter.post("/signup", GoogleAuth.requireToken, async (req, res)=>{
    // Receive the auth token passed from GoogleAuth.requireToken middleware
    const token = res.locals.token;
    let googleUser = undefined;
    // Retrieve user info from Google.
    await User.fetchGoogleUserByToken(
        token,
        (err, user)=>{
            if (err) {
                return res.status(400).json(JsonUtil.errorJson(err.message));
            }
            if (!user){
                return res.status(400).json(JsonUtil.errorJson("User's Google credential couuld not be verified."));
            }
            googleUser = user;
        }
    );
    if (!googleUser){return}; //Exit the function if googleUser is not fetched.

    // Make sure the user does not already exists.
    let userExists = await User.findOne(
        {email: googleUser.email},
        (err, user)=>{
            if (err){
                return res.status(400).json(JsonUtil.successJson(err.message));
            }
            // If user exists, send an error.
            if (user){
                return res.status(409).json(JsonUtil.errorJson("User with the email '"+googleUser.email+"' already exists."));
            }
        }
    );
    if (userExists) {return}; //Exit the function if appUser already exists.

    //Create a new user using google user info
    User.createWithGoogleUser(
        googleUser,
        (err, user)=>{
            if (err){
                return res.status(400).json(JsonUtil.errorJson(err.message));
            }
            return res.status(200).json(JsonUtil.successJson(user));
        }
    );
})

module.exports = authRouter;
