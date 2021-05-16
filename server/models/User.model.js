const mongoose = require('mongoose');
const Schema = require("mongoose").Schema;
const { UserAuthTypes } = require('./ModelConstants');
const {OAuth2Client} = require('google-auth-library');
const GOOGLE_AUTH_CLIENT_ID = process.env.GOOGLE_AUTH_GOOGLE_AUTH_CLIENT_ID;
const MongoError = require("mongodb").MongoError;

const userSchema = new Schema({
    email: {
        type: String, 
        required: true,
        unique: true
    },
    authType: {
        type: String,
        enum: [UserAuthTypes.GOOGLE] //Enumeration of user registration types. Currently only support Google account.
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
}, {
    timestamps: true,
})

// Custom class to add additional methods to the mongoose model.
// Custom static methods mimic the Mongoose's built-in callback signiture.
// Reference - Mongoose queries: https://mongoosejs.com/docs/queries.html
class UserClass {
    static async fetchGoogleUserByToken(bearerToken, callback) {
        const client = new OAuth2Client(GOOGLE_AUTH_CLIENT_ID);
        let err = undefined;
        let googleUser = undefined;
        try {
            const ticket = await client.verifyIdToken({
                idToken: bearerToken,
                audience: GOOGLE_AUTH_CLIENT_ID,  // Specify the GOOGLE_AUTH_CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[GOOGLE_AUTH_CLIENT_ID_1, GOOGLE_AUTH_CLIENT_ID_2, GOOGLE_AUTH_CLIENT_ID_3]
            });
            googleUser = ticket.getPayload();
        }catch(_){
            err = new MongoError("Google authentication token is invalid or expired.");
        }
        callback(err, googleUser);
    };

    static async createWithGoogleUser(googleUser, callback){
        return this.create({
            authType: UserAuthTypes.GOOGLE,
            email: googleUser.email,
            first_name: googleUser.given_name,
            last_name: googleUser.family_name,
        }, callback);
    };

    static async findUserByEmail(email, callback){
        return this.findOne({email: email}, callback);
    }
}

userSchema.loadClass(UserClass);
const User = mongoose.model('Users', userSchema);
module.exports = User;
