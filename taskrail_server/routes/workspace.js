const express = require('express');
const mongoUtil = require("../MongoUtil");
const db = mongoUtil.getDb();
const workspaceRouter = express.Router();

workspaceRouter.get('users/:user_id/workspace', (async (req, res) => {
    console.log("workspace root");
    const userId = req.params.id;
    const collection = db.collection("Subtask");
    const cursor = collection.find()
    const arr = await cursor.toArray();
    console.log(arr);
    res.send(arr);
}));

workspaceRouter.post('users/:user_id/workspace', (async (req, res) => {
    // Create a workspace under the user.
    const userId = req.params.id;
    const doc = { name: "New Workspace"};
    const result = await collection.insertOne(doc);
}));

workspaceRouter.get("users/:user_id/workspace/:workspace_id", (async (req, res)=>{
    // Return workspace with task parents nested inside of it.
    const workspaceId = req.params.workspaceId;
}));

module.exports = workspaceRouter;