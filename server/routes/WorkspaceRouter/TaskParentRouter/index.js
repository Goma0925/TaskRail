const express = require("express");
const taskParentRouter = express.Router({ mergeParams: true });
const Workspace = require("../../../models/Workspace.model");
const TaskParent = require("../../../models/TaskParent.schema");
const JsonUtil = require("../../../util/JsonUtil");
const requireValidWorkspaceIdParam = require("../../../middleware/ParamChecker").requireValidWorkspaceIdParam;

// Route nested subtask endpoints. 
// Check if the workspace ID in URL param is valid using requireValidWorkspaceIdParam middleware.
taskParentRouter.use("/:taskParentId/subtasks", requireValidWorkspaceIdParam, require("./SubtaskRouter"));

//CREATE TaskParent
taskParentRouter.post(
  "/",
  async (req, res) => {
    try {
      const user = res.locals.user;
      const newTaskParent = TaskParent.sanitizeReqBody(req.body);
      // Add taskparent in workspace's subdocument.
      Workspace.findOneAndUpdate(
        { _id: req.params.workspaceId, ownerId: user._id },
        {
          $push: { taskparents: newTaskParent },
        },
        { new: true }, //options to return an updated document.
        (err, workspace) => {
          if (err) {
            return res.status(400).json(JsonUtil.errorJson(err.message));
          };
          if (!workspace) {
            return res.status(400).json(JsonUtil.errorJson("Workspace with ID '" + req.params.workspaceId + "' either doesn't exist or you don't have a proper permission."));
          }
          const taskParent = workspace.taskparents[workspace.taskparents.length - 1];
          return res.status(200).json(JsonUtil.successJson(taskParent));
        });
    } catch (err) {
      console.log(err);
      return res.status(500).json(JsonUtil.errorJson("Server error ocurred while creating a workspace."));
    }
  }
)

//Delete a TaskParent
taskParentRouter.delete(
  "/:taskParentId",
  async (req, res) => {
    try {
      const user = res.locals.user;
      const taskParentId = req.params.taskParentId;
      // Use updateMany to use result.nModified attribute in order to tell if $pull was successful.
      Workspace.updateMany(
        { _id: req.params.workspaceId, ownerId: user._id },
        { $pull: { taskparents: { _id: taskParentId } } },
        // Prevent timestamp update because it happends regardless of $pull operation's success,
        // which results in not being able to tell from result.nModified if $pull was successful.
        // Would like to fix in the future when Mongoose supports it: 
        // Issue ref: https://github.com/Automattic/mongoose/issues/6861
        { timestamps: false, rawResult: true }, 
        (err, result) => {
          if (err) {
            return res.status(400).json(JsonUtil.errorJson(err.message));
          }
          // Check if $pull operation actually updated the workspace. 
          if (result.nModified == 0) {
            return res.status(400).json(JsonUtil.errorJson('No taskparent found with ID "' + taskParentId + '".'));
          }
          return res.status(200).json(JsonUtil.successJson());
        }
      )
    } catch (err) {
      return res.status(500).json(JsonUtil.errorJson("Server error ocurred while deleting a workspace."));
    }
  }
);

//Update taskparent
taskParentRouter.put(
  "/:taskParentId",
  async (req, res) => {
    const user = res.locals.user;
    const taskParentId = req.params.taskParentId;
    const newTaskParent = TaskParent.sanitizeReqBody(req.body);

    // Construct $set query in the following shape: { "taskparents.$.field":  newTaskParent[field] }
    // in order to update all the fields.
    let setAllFieldQuery = {};
    Object.keys(newTaskParent).filter((field)=>{
      setAllFieldQuery["taskparents.$."+field] = newTaskParent[field];
    })
    // Update taskparent in workspace's subdocument.
    Workspace.findOneAndUpdate(
      // Select the taskparent sub document by ID as the update target.
      { _id: req.params.workspaceId, ownerId: user._id, "taskparents._id":taskParentId },
      // Update all the fields that are provided in the user request body.
      {
        $set: setAllFieldQuery,
      },
      { new: true }, //options to return an updated document.
      (err, workspace) => {
        if (err) {
          return res.status(400).json(JsonUtil.errorJson(err.message));
        };
        if (!workspace) {
          return res.status(400).json(JsonUtil.errorJson("Workspace with ID '" + req.params.workspaceId + "' either doesn't exist or you don't have a proper permission."));
        };
        const taskParent = workspace.taskparents.filter(taskParent=>taskParent._id == taskParentId)[0];
        return res.status(200).json(JsonUtil.successJson(taskParent));
    });
  }
);

module.exports = taskParentRouter;