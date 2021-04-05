const MongoUtil =  require("../MongoUtil");
const db = MongoUtil.getDb();
const ObjectID = require('mongodb').ObjectID;
const Collections = require("../consts/MongoDB").Collections;

async function getWorkspaceById(workspaceId){
    const workspaceCollection = db.collection(Collections.Workspaces);
    const workspaceQuery = {
        "_id": ObjectID(workspaceId),
    };
    const workspace = await workspaceCollection.findOne(workspaceQuery);
    if (workspace != null){
        return {success: true, workspace: workspace, error_msg: ""}
    }else{
        return {success: false, workspace: null, error_msg: "A workspace with ID '"+workspaceId+"' could not be found."}
    }
}

async function getTaskParentById(taskParentId){
    // TO be worked on
    console.log(taskParentId);
    
}

module.exports = {
    getWorkspaceById,
    getTaskParentById,
}