const ObjectId = require("mongodb").ObjectId;
const {OAuth2Client} = require('google-auth-library');
const GOOGLE_AUTH_CLIENT_ID = process.env.GOOGLE_AUTH_GOOGLE_AUTH_CLIENT_ID;
const mongoUtil = require("../MongoUtil");
const UserOperations = require("../common_operations/UserOperations");



async function requireAuth(req, res, next)  {
    // Check if the access is a valid user by checking
    // 1) If the google auth token is valid.
    // 2) If the google user's email exists in our record. 

    // Check if the auth token is sent.
    if (!req.headers.authorization) {
        return res.status(403).json({ status:false, error_msg: "Authentication token not provided in the header." });
    };
    const authParts = req.headers.authorization.split(" ");
    const tokenType = authParts[0];
    let isValidGoogleUser = false;
    let googleUser;
    if (tokenType == "Bearer"){
        const token = authParts[1];
        try {
            googleUser = await getGoogleUser(token, GOOGLE_AUTH_CLIENT_ID);
            if (googleUser){
                isValidGoogleUser = true;
            }
        }catch(err){
            console.log(err);
            res.status(401).json({status: false, error_msg: "Google authentication token is invalid or expired."});
        }
    };
    if (isValidGoogleUser){
        const appUser = await UserOperations.getUserByEmail(googleUser.email);
        if (appUser){
            req.app.locals.user = appUser;
            // Pass the process to the next middle ware or router.
            next();
        }else{
            res.status(401).json({status: false, error_msg: "User record could not be found. A user must be signed up before logging in."});
        }
    }else{
        res.status(401).json({status: false, error_msg: "Google authentication token is invalid or expired."});
    }
};


module.exports = {
    requireAuth: requireAuth
}