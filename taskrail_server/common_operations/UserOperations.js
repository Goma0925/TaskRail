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
    }else {
        return {status: false, error_msg: "User record could not be found."};
    }
}

async function getGoogleUser(bearerToken, client_id) {
    const client = new OAuth2Client(GOOGLE_AUTH_CLIENT_ID);
    const ticket = await client.verifyIdToken({
        idToken: bearerToken,
        audience: client_id,  // Specify the GOOGLE_AUTH_CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[GOOGLE_AUTH_CLIENT_ID_1, GOOGLE_AUTH_CLIENT_ID_2, GOOGLE_AUTH_CLIENT_ID_3]
    });
    const googleUser = ticket.getPayload();
    return googleUser;
}

const createUserWithGoogle = async (googleUser)=>{
    // Create interface when rewriting in TypeScript.
    const user = {
        _id: ObjectId(googleUser.sub),
        authType: UserAuthTypes.GOOGLE,
        email: googleUser.email,
        first_name: googleUser.given_name,
        last_name: googleUser.family_name,
    }
    await userCollection.insertOne(user);
}

module.exports = {
    getUserByEmail: getUserByEmail,
    getGoogleUser: getGoogleUser,
    createUserWithGoogle: createUserWithGoogle,
}