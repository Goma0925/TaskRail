const express = require('express');
const mongoUtil = require("../MongoUtil");
const db = mongoUtil.getDb();
const workspaceRouter = express.Router();

workspaceRouter.get('/workspace', (req, res) => {
    console.log("workspace root");
    const collection = db.collection("TaskRail");
    collection.forEach(element => {
        console.log(element);
    });
});

module.exports = workspaceRouter;