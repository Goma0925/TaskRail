const UserOperations = require("../common_operations/UserOperations");

function requireToken(req, res, next){
    // Check if the auth token is sent in the header.
    if (!req.headers.authorization) {
        return res.status(403).json({ status:false, error_msg: "Authentication token not provided in the header." });
    };
    const authParts = req.headers.authorization.split(" ");
    const tokenType = authParts[0];
    const token = authParts[1];
    if (tokenType == "Bearer"){
        // Propagate the token to the next middleware or router.
        req.app.locals.token = token;
        return next();
    }
    return res.status(403).json({ status:false, error_msg: "Only 'Bearer' prefix for authentication header is accepted." });
}

async function requireValidAppUser(req, res, next)  {
    // Check if the access is made by a valid user by 
    // 1) Receiving a Google auth token from the previous middleware.
    // 2) Checking if the google authentication is valid.
    // 3) Checking if the user's email exists in our database.
    // *This middleware must be called after other middleware that passes Google auth token
    //  in req.app.locals.token

    const token = req.app.locals.token;
    let isValidGoogleUser = false;
    // Check if the google credential is valid.
    result = await UserOperations.getGoogleUser(token);
    if (!result.success){
        return res.status(401).json({status: false, error_msg: "Google authentication token is invalid or expired."});
    }

    // Check if the user exists in our database.
    let googleUser = result.googleUser;
    const appUserFetchResult = await UserOperations.getUserByEmail(googleUser.email);
    if (appUserFetchResult.success){
        // Pass the process to the next middle ware or router.
        req.app.locals.user = appUserFetchResult.user;
        return next();
    }
    return res.status(401).json({status: false, error_msg: "User record could not be found. Must be signed up before logging in."});
};


module.exports = {
    requireAuth: [requireToken, requireValidAppUser],
    requireToken: requireToken
}