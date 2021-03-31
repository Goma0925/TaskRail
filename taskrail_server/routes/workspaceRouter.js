const express = require('express');
const mongoUtil = require("../MongoUtil");
const db = mongoUtil.getDb();
const ObjectID = require('mongodb').ObjectID;
const Collections = require("../consts/MongoDB").Collections; //Constant var to avoid typos
const workspaceRouter = express.Router();

//READ all workspaces
workspaceRouter.get('/users/:userId/workspaces', (async (req, res) => {
    console.log("workspace root");
    const userId = req.params.id;
    console.log(userId);
    const collection = db.collection(Collections.Workspaces);
    const cursor = collection.find();
    const workspaces = await cursor.toArray();
    res.send({success:true, data:workspaces});
}));

//READ a particular workspace
workspaceRouter.get("/users/:userId/workspaces/:workspaceId", (async (req, res)=>{
    // Return workspace with task parents nested inside of it.
    const workspaceId = req.params.workspaceId;
    console.log("GET workspace:", workspaceId);
    const collection = db.collection(Collections.Workspaces);
    const query = {"_id": ObjectID(workspaceId)};
    const workspace = await collection.findOne(query);
    console.log("Workspace:", workspace);
    if (workspace != null){
        res.send({success:true, data:workspace});
    }else{
        res.send({success: false});
    }
}));

//CREATE workspace
workspaceRouter.post('/users/:userId/workspaces', (async (req, res) => {
    // Create a workspace under the user.
    const userId = req.params.id;
    const collection = db.collection(Collections.Workspaces);
    //Get payload
    const workspaceName = req.body.name;
    //Insert a new workspace
    const workspace = { name: workspaceName, taskparents: []};
    const status = await collection.insertOne(workspace);
    //We want to have a clean success check for every operation. Needs work here.
    if (status.result.ok){
        res.send({success:true, data: workspace});
    }else{
        res.send({success: false});
    }
}));

//CREATE TaskParent
workspaceRouter.post("/users/:userId/workspaces/:workspace_id/taskparents", (async (req, res)=>{
    // Return workspace with task parents nested inside of it.
    const workspaceId = req.params.workspaceId;
    console.log("Create taskparent:", workspaceId);
    const collection = db.collection(Collections.Workspaces);
    const taskParent = {
        name: "New taskparent", 
        taskParentDeadline: null, 
        note: "",
        complete: false
    };
    //Add taskparent: To be worked on.
    const query = {"_id": ObjectID(workspaceId)};
    const update = {
        $push: {"taskparents": taskParent}
    }
    const status = await collection.updateOne(
        query,
        update,
    );
    console.log(status);
    res.send("Add taskparent");
}));

module.exports = workspaceRouter;