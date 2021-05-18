const express = require("express");
const subtaskRouter = express.Router({ mergeParams: true });
const Subtask = require("../../../../models/Subtask.model");
const JsonUtil = require("../../../../Util/JsonUtil");
  
//READ all subtasks
subtaskRouter.get(
  "/",
  async (req, res) => {
    try{
      Subtask.find(
        {taskParentId: req.params.taskParentId},
        (err, subtasks)=>{
          if (err){
            res.status(400).json(JsonUtil.errorJson(err.message));
          }
          res.status(200).json(JsonUtil.successJson(subtasks));
        }
      )
    }catch(err){
      return res.status(500).json(JsonUtil.errorJson("Server error ocurred while retrieving subtasks."));
    }
  }
);

// CREATE Subtask
subtaskRouter.post(
  "/",
  async (req, res) => {
    try{
      //Create subtask
      const user = res.locals.user;
      let newSubtask = Subtask.sanitizeReqBody(req.body);
      newSubtask.taskParentId = req.params.taskParentId;
      newSubtask.ownerId = user._id;
      Subtask.create(
        newSubtask,
        (err, substask) => {
          if (err){
            return res.status(400).json(JsonUtil.errorJson(err.message));
          }
          return res.status(200).json(JsonUtil.successJson(substask));
        }
      );
    }catch(err){
      return res.status(500).json(JsonUtil.errorJson("Server error ocurred while creating a subtask."));
    }
  }
);  

//Update subtask
subtaskRouter.put(
  "/:subtaskId",
  async (req, res) => {
    try{
      const user = res.locals.user;
      // Construct new subtask.
      let newSubtask = Subtask.sanitizeReqBody(req.body);
      newSubtask.taskParentId = req.params.taskParentId;
      newSubtask.ownerId = user._id;
      Subtask.findOneAndUpdate(
        // Query subtask that match the taskparent and subtask ID.
        {ownerId:user._id, taskParentId: req.params.taskParentId, _id: req.params.subtaskId},
        {$set: newSubtask},
        {new: true},
        (err, subtask) => {
          if (err){
            return res.status(400).json(JsonUtil.errorJson(err.message));
          }
          if (!subtask){
            res.status(404).json(JsonUtil.errorJson('Subtask with ID "'+req.params.subtaskId+'" does not exist or you do not have a permission.'));
          }
          return res.status(200).json(JsonUtil.successJson(subtask));
        }
      );
    }catch(err){
      return res.status(500).json(JsonUtil.errorJson("Server error ocurred while updating a subtask."));
    }
  }
);

//Delete Subtask
subtaskRouter.delete(
  "/:subtaskId",
  async (req, res) => {
    try{
      const user = res.locals.user;
      Subtask.findOneAndDelete(
        // Query subtask that match the taskparent and subtask ID.
        {ownerId:user._id, taskParentId: req.params.taskParentId, _id: req.params.subtaskId},
        (err, subtask)=>{
          if (err) {
            res.status(400).json(JsonUtil.errorJson(err.message));
          }
          if (!subtask){
            res.status(404).json(JsonUtil.errorJson('Subtask with ID "'+req.params.subtaskId+'" does not exist or you do not have a permission.'));
          }
          res.status(200).json(JsonUtil.successJson(subtask));
        }
      );
    }catch(err){
      return res.status(500).json(JsonUtil.errorJson("Server error ocurred while deleting a subtask."));
    }
  }
);
  
module.exports = subtaskRouter;