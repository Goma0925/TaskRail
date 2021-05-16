const UserAuthTypes = require("../consts/mongodb").UserAuthTypes;
const db = require("../util/MongoDriverUtil").getDb();
// const userCollection = db.collection("Users");
const ObjectId = require("mongodb").ObjectId;
const {OAuth2Client} = require('google-auth-library');
const GOOGLE_AUTH_CLIENT_ID = process.env.GOOGLE_AUTH_GOOGLE_AUTH_CLIENT_ID;
const JsonUtil = require("../util/JsonUtil");
const User = require("../models/User.model");

// This file is old
// We want to migrate all these functions into mongoose model functions.
// These functions were intially intended for a helper function to conduct a reusable operation the DB.


async function getUserByEmail (email, callback){
    User.findOne(
        {email: email},
        (err, user) =>{
            if (err){
                return JsonUtil.operationResult(200, false, undefined);
            }
            return JsonUtil.operationResult(200, true, user);
        }   
    )
}

async function getGoogleUser(bearerToken) {
    const client = new OAuth2Client(GOOGLE_AUTH_CLIENT_ID);
    try {
        const ticket = await client.verifyIdToken({
            idToken: bearerToken,
            audience: GOOGLE_AUTH_CLIENT_ID,  // Specify the GOOGLE_AUTH_CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[GOOGLE_AUTH_CLIENT_ID_1, GOOGLE_AUTH_CLIENT_ID_2, GOOGLE_AUTH_CLIENT_ID_3]
        });
        const googleUser = ticket.getPayload();
        return JsonUtil.operationResult(200, true, googleUser);
    }catch(err){
        return JsonUtil.operationResult(401, false, "Google authentication token is invalid or expired. Alternatively server was unable to fetch the user info from Google.");
    }
}

async function createUserWithGoogle(googleUser){
    try{
        // Create interface when rewriting in TypeScript.
        const newUser = new User({
            authType: UserAuthTypes.GOOGLE,
            email: googleUser.email,
            first_name: googleUser.given_name,
            last_name: googleUser.family_name,
        });
        newUser.save();
        return JsonUtil.successJson(201, true, newUser);
    }catch(err){
        return JsonUtil.operationResult(500, false, "Server error occurred while creating a new user.");
    }
}

module.exports = {
    
}