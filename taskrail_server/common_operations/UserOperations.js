const UserAuthTypes = require("../consts/mongodb").UserAuthTypes;
const userCollection = db.collection("Users");

const getUserByEmail = async (email) =>{
    const db = mongoUtil.getDb();
    const query = {email: email};
    const targetUser = await userCollection.findOne(query);
    if (targetUser){
        return {success: true, user: targetUser};
    }else {
        return {status: false, error_msg: "User record could not be found."};
    }
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
    createUserWithGoogle: createUserWithGoogle,
}