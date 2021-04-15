const express = require("express");
const authRouter = express.Router();
const mongoUtil = require("../MongoUtil");
const db = mongoUtil.getDb();
const ObjectId = require("mongodb").ObjectId;
const Collections = require("../consts/MongoDB").Collections; //Constant var to avoid typos

//READ all workspaces
authRouter.get("/google-login", async (req, res) => {
    
});