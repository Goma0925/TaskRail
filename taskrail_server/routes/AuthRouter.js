const express = require("express");
const authRouter = express.Router();
const GoogleAuth = require("../middleware/GoogleAuth");
const UserOperations = require("../common_operations/UserOperations");

authRouter.post("/login", GoogleAuth.requireAuth, (req, res) => {
    // If the GoogleAuth.login middleware passes, just return the success response.
    res.send({success: true});
});

authRouter.post("/signup", GoogleAuth.requireToken, async (req, res)=>{
    // Receive the auth token passed from GoogleAuth.requireToken middleware
    const token = req.app.locals.token;
    const googleUserFetchResult = await UserOperations.getGoogleUser(token);
    
    //Create a new user using google user info
    if (googleUserFetchResult.success){
        const googleUser = googleUserFetchResult.googleUser;
        // Make sure the user does not already exists.
        const appUserFetchResult = await UserOperations.getUserByEmail(googleUser.email);
        if (appUserFetchResult.success){
            return res.status(409).json({success: false, error_msg: "User with the email '"+googleUser.email+"' already exists."});
        }
        // Create a new user
        const userSignupResult = await UserOperations.createUserWithGoogle(googleUser);
        if (userSignupResult.success){
            return res.status(200).json(userSignupResult);
        }
    }
    return res.status(401).json((googleUserFetchResult));
})

module.exports = authRouter;