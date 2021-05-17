const express = require("express");
const workspaceRouter = express.Router({mergeParams: true}); //Set mergeParam to receive params from parent router.
const JsonUtil = require("../../Util/JsonUtil");
const Workspace = require("../../models/Workspace.model");

// Route to nested taskparent endpoints
workspaceRouter.use("/workspaces/:workspaceId/taskparents", require("./TaskParentRouter"));

//READ ALL workspaces
workspaceRouter.get("/workspaces", async (req, res) => {
    try{
      const user = res.locals.user;
      Workspace.find(
        {ownerId: user._id}, 
        (err, workspaces)=>{
          if (err){
            return res.status(400).json(JsonUtil.errorJson(err.message));
          }
          return res.status(200).json(JsonUtil.successJson(workspaces));
        }
      );
    }catch(err){
      return res.status().json(JsonUtil.errorJson("Sever error occured while finding workspaces."));
    }
  });

//READ workspace
workspaceRouter.get("/workspaces/:workspaceId", async (req, res) => {
  try{
    const user = res.locals.user;
    Workspace.findOne(
      {_id: req.params.workspaceId, ownerId: user._id},
      (err, workspace)=>{
        if (err){
          return res.status(400).json(JsonUtil.errorJson(err.message));
        }
        if (!workspace){
          return res.status(400).json(JsonUtil.errorJson("Workspace with ID '"+req.params.workspaceId+"' either doesn't exist or you don't have a proper permission."));
        }
        return res.status(200).json(JsonUtil.successJson(workspace));
      }
    )
  }catch(err){
    return res.status(500).json(JsonUtil.errorJson("Server error ocurred while retrieving a workspace."));
  }
});

//CREATE workspace
workspaceRouter.post("/workspaces", async (req, res) => {
  try{
    let newWorkspace = Workspace.sanitizeReqBody(req.body);
    newWorkspace.ownerId = res.locals.user._id;
    Workspace.create(
      newWorkspace, 
      (err, workspace)=>{
      if (err){
        return res.status(400).json(JsonUtil.errorJson(err.message));
      }
      return res.status(200).json(JsonUtil.successJson(workspace));
    });
  }catch(err){
    return res.status(500).json(JsonUtil.errorJson("Server error ocurred while creating a workspace."));
  }
});

//UPDATE workspace
workspaceRouter.put(
    "/workspaces/:workspaceId",
    async (req, res) => {
      try{
        const user = res.locals.user;
        const workspaceId = req.params.workspaceId;
        // List of attributes that are allowed to be modified on this endpoint.
        const newWorkspace = Workspace.sanitizeReqBody(req.body);
        // Construct $set query in the following shape: { "field":  newWorkspace[field] }
        // in order to update all the fields provided in body.
        let setAllFieldQuery = {};
        Object.keys(newWorkspace).filter((field)=>{
          setAllFieldQuery[field] = newWorkspace[field];
        })
        Workspace.findOneAndUpdate(
          {_id: workspaceId, ownerId: user._id},
          {$set: setAllFieldQuery},
          {new: true}, //options to return an updated document.
          (err, workspace) => {
            if (err){
              return res.status(400).json(JsonUtil.errorJson(err.message));
            };
            if (!workspace){
              return res.status(400).json(JsonUtil.errorJson("Workspace with ID '"+req.params.workspaceId+"' either doesn't exist or you don't have a proper permission."));
            }
            return res.status(200).json(JsonUtil.successJson(workspace));
          }
        )
      }catch(err){
        return res.status(500).json(JsonUtil.errorJson("Server error ocurred while updating a workspace."));
      }
    }
  );

//DELETE Workspace
workspaceRouter.delete(
    "/workspaces/:workspaceId",
    async (req, res) => {
      try{
        const user = res.locals.user;
        const workspaceId = req.params.workspaceId;
        Workspace.findOneAndDelete(
          {_id: workspaceId, ownerId: user._id},
          (err, workspace)=>{
            if (err){
              return res.status(400).json(JsonUtil.errorJson("Workspace with ID'"+workspaceId+"' either does not exist or you don' have a proper permission."));
            }
            return res.status(200).json(JsonUtil.successJson(workspace));
          }
        )
      }catch(err){
        return res.status(500).json(JsonUtil.errorJson("Server error ocurred while deleting a workspace."))
      }
    }
);

module.exports = workspaceRouter;
