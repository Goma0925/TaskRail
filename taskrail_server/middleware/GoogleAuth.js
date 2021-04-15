const ObjectId = require("mongodb").ObjectId;
const {OAuth2Client} = require('google-auth-library');
const GOOGLE_AUTH_CLIENT_ID = process.env.GOOGLE_AUTH_GOOGLE_AUTH_CLIENT_ID;
const mongoUtil = require("../MongoUtil");

async function verify(bearerToken, client_id) {
    console.log("TOKEN:", bearerToken);
    const client = new OAuth2Client(GOOGLE_AUTH_CLIENT_ID);
    const ticket = await client.verifyIdToken({
        idToken: bearerToken,
        audience: client_id,  // Specify the GOOGLE_AUTH_CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[GOOGLE_AUTH_CLIENT_ID_1, GOOGLE_AUTH_CLIENT_ID_2, GOOGLE_AUTH_CLIENT_ID_3]
    });
    const googleUser = ticket.getPayload();
    // const userid = payload['sub'];
    return googleUser;
}


const login = async (req, res, next) => {
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
            googleUser = await verify(token, GOOGLE_AUTH_CLIENT_ID);
            isValidGoogleUser = true;
        }catch(err){
            console.log(err);
            return res.status(401).json({status: false, error_msg: "Google authentication token is invalid or expired."});
        }
    };
    const appUser = await getUser(googleUser);
    if (appUser){
        req.locals.user = appUser;
        next();
    }else{
        return res.status(401).json({status: false, error_msg: "User record could not be found."});
    }
};

const getUser = async (googleUser) =>{
    const db = mongoUtil.getDb();
    const userCollection = db.collection("Users");
    const query = {email: googleUser.email};
    const targetUser = await userCollection.findOne(query);
    return targetUser;

    // Create interface when rewriting in TypeScript.
    // const user = {
    //     _id: ObjectId(googleUser.sub),
    //     authType: "GOOGLE",
    //     email: googleUser.email,
    //     first_name: googleUser.given_name,
    //     last_name: googleUser.family_name,
    // }
    // await userCollection.insertOne(user);
}

module.exports = {
    login: login
}