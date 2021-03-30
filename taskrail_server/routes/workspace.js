const express = require('express');
const dbClient = require("../DatabaseClient");
const workspaceRouter = express.Router();

workspaceRouter.get('/workspace', (req, res) => {
    console.log("workspace root");
    const collections = dbClient.getDb().collections;
    console.log(dbClient.getDb());
    // res.send();
    // collections.array.forEach(collection => {
    //     console.log(collection);
    // });
});

module.exports = workspaceRouter;