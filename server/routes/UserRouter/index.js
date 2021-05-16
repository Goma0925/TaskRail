const express = require("express");
const UserRouter = express.Router();
const GoogleAuth = require("../../middleware/GoogleAuth");
const UserOperations = require("../../common_db_operations/UserOperations");
const JsonUtil = require("../../util/JsonUtil");
const User = require("../../models/User.model");

UserRouter.post("/login", GoogleAuth.requireAuth, (req, res) => {
    // If the GoogleAuth.login middleware passes, just return the success response.
    res.send({success: true, user:req.app.locals.user});
});

UserRouter.post("/signup", GoogleAuth.requireToken, async (req, res)=>{
    try{
        // Receive the auth token passed from GoogleAuth.requireToken middleware
        const token = res.locals.googleAuthToken    ;
        const googleUserFetchResult = await UserOperations.getGoogleUser(token);
        
        //Create a new user using google user info
        if (!googleUserFetchResult.success){
            const statusCode = googleUserFetchResult.status;
            return res.status(statusCode).json(JsonUtil.errorJson(googleUserFetchResult.data));
        }

        const googleUser = googleUserFetchResult.data;  
        if (await User.exists({email: googleUser.email})){
            return res.status(409).json(JsonUtil.errorJson("User with email '"+googleUser.email+"' already exists"));
        }
        const newUser = await User.createWithGoogleUser(googleUser);
        return res.status(201).json(JsonUtil.successJson(newUser));
    }catch(err){
        return res.status(500).json(JsonUtil.errorJson("Server error occurred while signing up."));
    }
})

module.exports = UserRouter;