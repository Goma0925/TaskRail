const User = require("../models/User.model");
const JsonUtil = require("../util/JsonUtil");

function requireToken(req, res, next){
    // Check if the auth token is sent in the header.
    if (!req.headers.authorization) {
        return res.status(403).json(JsonUtil.errorJson("Authentication token not provided in the header." ));
    };
    const authParts = req.headers.authorization.split(" ");
    const tokenType = authParts[0];
    const token = authParts[1];
    if (tokenType == "Bearer"){
        // Propagate the token to the next middleware or router.
        res.locals.token = token;
        return next();
    }
    return res.status(403).json(JsonUtil.errorJson("Only 'Bearer' prefix for authentication header is accepted." ));
}

async function requireValidAppUser(req, res, next)  {
    // Check if the access is made by a valid user by 
    // 1) Receiving a Google auth token from the previous middleware.
    // 2) Checking if the google authentication is valid.
    // 3) Checking if the user's email exists in our database.
    // *This middleware must be called after other middleware that passes Google auth token
    //  in res.locals.token

    const token = res.locals.token;
    let googleUser = undefined;
    // Check if the google credential is valid.
    await User.fetchGoogleUserByToken(
        token,
        (err, user)=>{
            if (err){
                return res.status(401).json(JsonUtil.errorJson(err.message));
            }
            googleUser = user;
        }
    );
    
    if (googleUser){
        // Check if the user exists in our database.
        await User.findUserByEmail(
            googleUser.email,
            (err, user) => {
                if (err || !user){
                    return res.status(401).json(JsonUtil.errorJson( "User record could not be found. Must be signed up before logging in."));
                }
                // Pass the process to the next middleware or router.
                res.locals.user = user;
                return next();
            }
        )
    }
};


module.exports = {
    requireAuth: [requireToken, requireValidAppUser],
    requireToken: requireToken
}