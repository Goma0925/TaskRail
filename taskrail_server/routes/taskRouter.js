const express = require('express');
const mongoUtil = require("../MongoUtil");
const db = mongoUtil.getDb();
const ObjectID = require('mongodb').ObjectID;
const Collections = require("../consts/MongoDB").Collections; //Constant var to avoid typos
const workspaceRouter = express.Router();
const CommonDbOperations = require("../common_operations/taskOperations.js");

//READ all workspaces
workspaceRouter.get('/users/:userId/workspaces', (async (req, res) => {
    console.log("workspace root");
    const userId = req.params.id;
    console.log(userId);
    const workspaceCollection = db.collection(Collections.Workspaces);
    const cursor = workspaceCollection.find();
    const workspaces = await cursor.toArray();
    console.log(cursor);
    //May require error checking.
    res.send({success:true, data:workspaces});
}));

//READ a particular workspace
workspaceRouter.get("/users/:userId/workspaces/:workspaceId", (async (req, res)=>{
    // Return workspace with task parents nested inside of it.
    const workspaceId = req.params.workspaceId;
    console.log("GET workspace:", workspaceId);
    const workspaceCollection = db.collection(Collections.Workspaces);
    const query = {"_id": ObjectID(workspaceId)};
    const workspace = await workspaceCollection.findOne(query);
    if (workspace != null){
        res.send({success:true, data:workspace});
    }else{
        res.send({success: false});
    }
}));

//CREATE workspace
workspaceRouter.post('/users/:userId/workspaces', (async (req, res) => {
    const userId = req.params.id;
    const workspaceCollection = db.collection(Collections.Workspaces);
    //Get payload
    const workspaceName = req.body.name;
    //Insert a new workspace
    const workspace = { name: workspaceName, taskparents: []};
    const status = await workspaceCollection.insertOne(workspace);
    //We want to have a clean success check for every operation. Needs work here.
    if (status.result.ok){
        res.send({success:true, data: workspace});
    }else{
        res.send({success: false});
    }
}));

//GET All TaskParents

//CREATE TaskParent
workspaceRouter.post("/users/:userId/workspaces/:workspaceId/taskparents", (async (req, res)=>{
    // Return workspace with task parents nested inside of it.
    const workspaceId = req.params.workspaceId;
    const taskParentName = req.body.name;
    console.log("Create taskparent:", workspaceId);
    const workspaceCollection = db.collection(Collections.Workspaces);
    const taskParent = {
        _id: ObjectID(),
        name: taskParentName, 
        taskParentDeadline: null, 
        note: "",
        complete: false
    };
    //Add taskparent
    const query = {"_id": ObjectID(workspaceId)};
    const update = {
        $push: {"taskparents": taskParent}
    }
    const status = await workspaceCollection.updateOne(
        query,
        update,
    );
    if (status.result.ok){
        res.send({success:true, data:taskParent});
    }else{
        res.send({success: false});
    }
}));

//READ all subtasks
workspaceRouter.get("/users/:userId/workspaces/:workspaceId/taskparents/:taskParentId/subtasks", (async (req, res)=>{
    const workspaceId = req.params.workspaceId;
    const taskParentId = req.params.taskParentId;

    const queryByTaskParentId = {"taskParentId": taskParentId};
    const cursor = await db.collection(Collections.Subtasks).find(queryByTaskParentId);
    const subtasks = await cursor.toArray();
    console.log(subtasks);
    res.send({success:true, subtasks: subtasks})
}));

// CREATE Subtask
workspaceRouter.post("/users/:userId/workspaces/:workspaceId/taskparents/:taskParentId/subtasks", (async (req, res)=>{
    const workspaceId = req.params.workspaceId;
    const taskParentId = req.params.taskParentId;
    // Mandatory info: Add validation later
    const subtaskName = req.body.name;
    const scheduledDate = req.body.scheduledDate; //TODO: Do date validation.
    // Options
    const subtaskDeadline = req.body.deadline? req.body.deadline:null; 
    const note = req.body.note? req.body.note: "";
    const complete = req.body.complete? req.body.complete: false;

    console.log("workspaceId, taskParentId", workspaceId, taskParentId);
    //First check if the workspace exists
    const qryResultForWorkspace = await CommonDbOperations.getWorkspaceById(workspaceId);
    console.log("Result", qryResultForWorkspace);
    if (qryResultForWorkspace.success){
        const workspace = qryResultForWorkspace.workspace;
        //Check if the task parent of the specified ID exists
        const taskParent = workspace.taskparents.find((taskParent)=>{
            return taskParent._id == taskParentId;
        });
        if (taskParent != null){
            // Insert a new subask
            const subtask = {
                _id: ObjectID(),
                taskParentId: taskParentId,
                name: subtaskName,
                scheduledDate: scheduledDate,
                deadline: subtaskDeadline,
                note: note,
                complete: complete
            };
            const status = await db.collection(Collections.Subtasks).insertOne(subtask);
            //We want to have a clean success check for every operation. Needs work here.
            if (status.result.ok){
                res.send({success:true, data: subtask});
            }else{
                res.send({success: false, error_msg: "Inserting subtask failed."});
            }
        }else{
            res.send({success: false, error_msg: "A task parent with ID '"+taskParentId+"' could not be found."})
        }
    }else{
        res.send(qryResultForWorkspace);
    }
}));

module.exports = workspaceRouter;