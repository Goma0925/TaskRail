const UserAuthTypes = require("../consts/mongodb").UserAuthTypes;
const db = require("../MongoUtil").getDb();
const userCollection = db.collection("Users");
const ObjectId = require("mongodb").ObjectId;
const {OAuth2Client} = require('google-auth-library');
const GOOGLE_AUTH_CLIENT_ID = process.env.GOOGLE_AUTH_GOOGLE_AUTH_CLIENT_ID;

async function getUserByEmail (email){
    const query = {email: email};
    const targetUser = await userCollection.findOne(query);
    if (targetUser){
        return {success: true, user: targetUser};
    }
    return {status: false, error_msg: "User record could not be found."};
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
        return {success: true, googleUser};
    }catch(err){
        console.log(err);
        return {success: false, error_msg: "Google authentication token is invalid or expired. Alternatively server was unable to fetch to user info from Google."};
    }
}

async function createUserWithGoogle(googleUser){
    // Create interface when rewriting in TypeScript.
    const user = {
        _id: ObjectId(),
        authType: UserAuthTypes.GOOGLE,
        email: googleUser.email,
        first_name: googleUser.given_name,
        last_name: googleUser.family_name,
    }
    const status = await userCollection.insertOne(user);
    if (status.result.ok){
        return {success: true, user: status.ops[0]};
    }
    return {success: false, error_msg: "Server error occurred while creating a new user."}
}

module.exports = {
    getUserByEmail: getUserByEmail,
    getGoogleUser: getGoogleUser,
    createUserWithGoogle: createUserWithGoogle,
}