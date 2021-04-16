const express = require("express");
const mongoUtil = require("../MongoUtil");
const db = mongoUtil.getDb();
const ObjectId = require("mongodb").ObjectId;
const Collections = require("../consts/MongoDB").Collections; //Constant var to avoid typos
const workspaceRouter = express.Router();
const CommonDbOperations = require("../common_operations/TaskOperations.js");

//READ all workspaces
workspaceRouter.get("/workspaces", async (req, res) => {
  const userId = req.app.locals.user._id;
  const workspaceCollection = db.collection(Collections.Workspaces);
  const queryByUser = {owner_id: ObjectId(userId)};
  const cursor = workspaceCollection.find(queryByUser);
  const workspaces = await cursor.toArray();
  //May require error checking.
  res.send({ success: true, data: workspaces ? workspaces : [] });
});

//READ a particular workspace
workspaceRouter.get("/workspaces/:workspaceId", async (req, res) => {
    // Return workspace with task parents nested inside of it.
    const workspaceId = req.params.workspaceId;
    console.log("GET workspace:", workspaceId);
    const workspaceCollection = db.collection(Collections.Workspaces);
    const query = { _id: ObjectId(workspaceId) };
    const workspace = await workspaceCollection.findOne(query);
    if (workspace != null) {
      res.send({ success: true, data: workspace });
    } else {
      res.send({ success: false });
    }
  }
);

//CREATE workspace
workspaceRouter.post("/workspaces", async (req, res) => {
  const userId = req.app.locals.user._id;
  const workspaceCollection = db.collection(Collections.Workspaces);
  //Get payload
  const workspaceName = req.body.name;
  //Insert a new workspace
  const workspace = { name: workspaceName, owner_id:userId, taskparents: [] };
  const status = await workspaceCollection.insertOne(workspace);
  //We want to have a clean success check for every operation. Needs work here.
  if (status.result.ok) {
    res.send({ success: true, data: workspace });
  } else {
    res.send({ success: false });
  }
});

//GET All TaskParents

//CREATE TaskParent
workspaceRouter.post(
  "/workspaces/:workspaceId/taskparents",
  async (req, res) => {
    // Return workspace with task parents nested inside of it.
    const workspaceId = req.params.workspaceId;
    const taskParentName = req.body.name;
    console.log("Create taskparent at workspace:", workspaceId);
    const workspaceCollection = db.collection(Collections.Workspaces);
    const taskParent = {
      _id: ObjectId(),
      name: taskParentName,
      taskParentDeadline: null,
      note: "",
      complete: false,
    };
    //Add taskparent
    const query = { _id: ObjectId(workspaceId) };
    const update = {
      $push: { taskparents: taskParent },
    };
    const status = await workspaceCollection.updateOne(query, update);
    console.log("TaskParentID:", taskParent._id);
    if (status.result.ok) {
      res.send({ success: true, data: taskParent });
    } else {
      res.send({ success: false });
    }
  }
);

//Delete a TaskParent
workspaceRouter.delete(
  "/workspaces/:workspaceId/taskparents/:taskParentId",
  async (req, res) => {
    const workspaceId = req.params.workspaceId;
    const taskParentId = req.params.taskParentId;
    console.log("Delete taskparent:\n", "\ntaskParentId:\t", taskParentId);
    // Construc a query to get the taskparent to return
    const workspaceCollection = db.collection(Collections.Workspaces);
    const selectWorkspaceQuery = { _id: ObjectId(workspaceId) };
    const workspace = await workspaceCollection.findOne(selectWorkspaceQuery);
    if (!workspace) {
      res.send({
        success: false,
        error_msg: "No matching workspace found with the ID:" + workspaceId,
      });
    } else {
      const previousTaskParents = workspace.taskparents;
      console.log("before", workspace.taskparents);
      // Find taskparent from the workspace
      var taskParentToRemove = null;
      var foundTaskParentToRemove = false;
      const newTaskParents = previousTaskParents.filter((tp) => {
        if (tp._id == taskParentId) {
          taskParentToRemove = tp;
          return false; //Exclude the item if we find the taskParentToRemove.
        } else {
          return true;
        }
      });
      console.log("After", newTaskParents);
      console.log("Found:", taskParentToRemove);
      // Check if we have found the taskparent.
      if (previousTaskParents.length == newTaskParents.length) {
        // If there's no matching taskparent, the length of the arrays stays the same.
        res.send({
          success: false,
          error_msg: "No matching taskparent found with the ID:" + taskParentId,
        });
      } else {
        // Construc a query to update the workspace's taskparents arr
        // with a new one without the target taskparent.
        const udpateTaskParentQuery = { $set: { taskparents: newTaskParents } };

        //Construct a query to delete all the subtasks of the taskparent.
        const subtaskCollection = db.collection(Collections.Subtasks);
        const selectSubtaskQuery = { taskParentId: taskParentId };

        // Execute the queries.
        const subtaskDeletionStatus = await subtaskCollection.deleteMany(
          selectSubtaskQuery
        );
        const workspaceUpdateStatus = await workspaceCollection.updateOne(
          selectWorkspaceQuery,
          udpateTaskParentQuery
        );
        if (workspaceUpdateStatus.result.ok) {
          res.send({ success: true, data: taskParentToRemove });
        } else {
          res.send({
            success: false,
            error_msg: "Error occurred while updating workspace.",
          });
        }
      }
    }

    // //Construct query to delete taskparent from a workspace
    // const selectWorkspaceQuery = { _id: ObjectID(workspaceId) };
    // const deleteTaskParentQuery = {
    //   $pull: { taskparents: {_id: ObjectID(taskParentId)} },
    // };

    //Construc a query to delete all the subtasks of the taskparent.
    const subtaskCollection = db.collection(Collections.Subtasks);
    const selectSubtaskQuery = { taskParentId: taskParentId };

    // Execute the queries.
    const subtaskDeletionStatus = await subtaskCollection.deleteMany(
      selectSubtaskQuery
    );
    const taskParentDeletionStatus = await workspaceCollection.updateOne(
      selectWorkspaceQuery,
      deleteTaskParentQuery
    );
    // if (taskParentDeletionStatus.result.ok && subtaskDeletionStatus.result.ok) {
    //   res.send({ success: true, data: selectTaskParentStatus });
    // } else {
    //   res.send({ success: false });
    // }
  }
);

//Delete Workspace
workspaceRouter.delete(
  "/workspaces/:workspaceId",
  async (req, res) => {
    const workspaceId = req.params.workspaceId;
    const workspaceCollection = db.collection(Collections.Workspaces);
    const subtaskCollection = db.collection(Collections.Subtasks);
    const query = { _id: ObjectId(workspaceId) };
    const workspace = await workspaceCollection.findOne(query);
    const taskParents = workspace.taskparents.map((obj) => {
      return obj._id.toString();
    });
    console.log(
      "Delete workspace:",
      "\n\t",
      workspaceId,
      "\n\t",
      workspace,
      "\n\t",
      taskParents
    );

    //Delete workspace
    const status = await workspaceCollection.remove(query);
    const query2 = { taskParentId: { $in: taskParents } };
    const status2 = await subtaskCollection.remove(query2);

    console.log("Subtasks:", status2);
    if (status.result.ok && status2.result.ok) {
      res.send({ success: true, data: workspace });
    } else {
      res.send({ success: false });
    }
  }
);

//Delete Subtask
workspaceRouter.delete(
  "/workspaces/:workspaceId/taskparents/:taskParentId/subtasks/:subtaskId",
  async (req, res) => {
    const subtaskId = req.params.subtaskId;
    const taskParentId = req.body.taskParentId;
    const subtaskName = req.body.name;
    // const subtaskScheduledDate = req.body.scheduledDate;
    // const subtaskDeadline = req.body.deadline;
    // const subtaskNote = req.body.note;
    // const subtaskComplete = req.body.complete;
    console.log("Delete subtask:", "\n\t", subtaskId);
    // const subtask = {
    //   _id: ObjectID(subtaskId),
    //   taskParentId: taskParentId,
    //   name: subtaskName,
    //   scheduledDate: subtaskScheduledDate,
    //   deadline: subtaskDeadline,
    //   note: subtaskNote,
    //   complete: subtaskComplete,
    // };
    const subtaskCollection = db.collection(Collections.Subtasks);
    const query = { _id: ObjectId(subtaskId) };
    //Delete subtask
    const status = await subtaskCollection.findOneAndDelete(query);
    console.log("status", status);
    console.log("ok?", status.ok);
    if (status.ok) {
      const subtask = status.value;
      res.send({ success: true, data: subtask });
    } else {
      res.send({ success: false });
    }
  }
);

//Update taskparent
workspaceRouter.put(
  "/workspaces/:workspaceId/taskparents/:taskParentId",
  async (req, res) => {
    const workspaceId = req.params.workspaceId;
    const taskParentName = req.body.name;
    const taskParentId = req.params.taskParentId;
    const taskParentDeadline = req.body.taskParentDeadline;
    const taskParentNote = req.body.note;
    const taskParentComplete = req.body.complete;
    console.log(
      "Update taskparent:",
      "\n\t",
      taskParentName,
      "\n\t",
      taskParentId,
      "\n\t",
      taskParentDeadline,
      "\n\t",
      taskParentNote,
      "\n\t",
      taskParentComplete
    );
    const taskParent = {
      _id: ObjectId(taskParentId),
      name: taskParentName,
      taskParentDeadline: taskParentDeadline,
      note: taskParentNote,
      complete: taskParentComplete,
    };
    const workspaceCollection = db.collection(Collections.Workspaces);
    //Update taskparent
    const query = {
      _id: ObjectId(workspaceId),
      "taskparents._id": ObjectId(taskParentId),
    };
    const update = {
      $set: {
        "taskparents.$.name": taskParentName,
        "taskparents.$.taskParentDeadline": taskParentDeadline,
        "taskparents.$.note": taskParentNote,
        "taskparents.$.complete": taskParentComplete,
      },
    };
    const status = await workspaceCollection.updateOne(query, update);

    if (status.result.ok) {
      res.send({ success: true, data: taskParent });
    } else {
      res.send({ success: false });
    }
  }
);

//Update subtask
workspaceRouter.put(
  "/workspaces/:workspaceId/taskparents/:taskParentId/subtasks",
  async (req, res) => {
    const taskParentId = req.params.taskParentId;
    const subtaskId = req.body._id;
    const subtaskName = req.body.name;
    const subtaskScheduledDate = req.body.scheduledDate;
    const subtaskDeadline = req.body.deadline;
    const subtaskNote = req.body.note;
    const subtaskComplete = req.body.complete;
    console.log(
      "Update subtask:",
      "\n\t",
      subtaskId,
      "\n\t",
      taskParentId,
      "\n\t",
      subtaskName,
      "\n\t",
      subtaskScheduledDate,
      "\n\t",
      subtaskDeadline,
      "\n\t",
      subtaskNote,
      "\n\t",
      subtaskComplete
    );
    const subtask = {
      _id: ObjectId(subtaskId),
      taskParentId: taskParentId,
      name: subtaskName,
      scheduledDate: subtaskScheduledDate,
      deadline: subtaskDeadline,
      note: subtaskNote,
      complete: subtaskComplete,
    };
    const selectSubtaskQuery = {
      _id: ObjectId(subtaskId),
    };
    const updateConttentQuery = {
      $set: {
        name: subtaskName,
        scheduledDate: subtaskScheduledDate,
        deadline: subtaskDeadline,
        note: subtaskNote,
        complete: subtaskComplete,
      },
    };
    const subtaskCollection = db.collection(Collections.Subtasks);
    const updateStatus = await subtaskCollection.update(
      selectSubtaskQuery,
      updateConttentQuery
    );
    // Look up a fresh instance from the DB to return to client.
    const updatedSubtask = await subtaskCollection.findOne(selectSubtaskQuery);
    if (updateStatus.result.ok) {
      res.send({ success: true, data: updatedSubtask });
    } else {
      res.send({ success: false });
    }
  }
);

//update workspace
workspaceRouter.put(
  "/workspaces/:workspaceId",
  async (req, res) => {
    const workspaceId = req.params.workspaceId;
    const workspaceName = req.body.name;
    console.log(
      "Update Workspace:",
      "\n\t",
      workspaceId,
      "\n\t",
      workspaceName
    );
    const workspace = {
      name: workspaceName,
    };
    const query = {
      _id: ObjectId(workspaceId),
    };
    const update = { $set: workspace };
    const workspaceCollection = db.collection(Collections.Workspaces);
    const status = await workspaceCollection.update(query, update);

    if (status.result.ok) {
      res.send({ success: true, data: workspace });
    } else {
      res.send({ success: false });
    }
  }
);

//READ all subtasks
workspaceRouter.get(
  "/workspaces/:workspaceId/taskparents/:taskParentId/subtasks",
  async (req, res) => {
    const workspaceId = req.params.workspaceId;
    const taskParentId = req.params.taskParentId;
    const queryByTaskParentId = { taskParentId: taskParentId };
    const cursor = await db
      .collection(Collections.Subtasks)
      .find(queryByTaskParentId);
    const subtasks = await cursor.toArray();
    console.log(subtasks);
    res.send({ success: true, data: subtasks });
  }
);

// CREATE Subtask
workspaceRouter.post(
  "/workspaces/:workspaceId/taskparents/:taskParentId/subtasks",
  async (req, res) => {
    const workspaceId = req.params.workspaceId;
    const taskParentId = req.params.taskParentId;
    // Mandatory info: Add validation later
    const subtaskName = req.body.name;
    const scheduledDate = req.body.scheduledDate; //TODO: Do date validation.
    // Options
    const subtaskDeadline = req.body.deadline ? req.body.deadline : null;
    const note = req.body.note ? req.body.note : "";
    const complete = req.body.complete ? req.body.complete : false;

    console.log("workspaceId, taskParentId", workspaceId, taskParentId);
    //First check if the workspace exists
    const qryResultForWorkspace = await CommonDbOperations.getWorkspaceById(
      workspaceId
    );
    console.log("Result", qryResultForWorkspace);
    if (qryResultForWorkspace.success) {
      const workspace = qryResultForWorkspace.workspace;
      //Check if the task parent of the specified ID exists
      const taskParent = workspace.taskparents.find((taskParent) => {
        return taskParent._id == taskParentId;
      });
      if (taskParent != null) {
        // Insert a new subask
        const subtask = {
          _id: ObjectId(),
          taskParentId: taskParentId,
          name: subtaskName,
          scheduledDate: scheduledDate,
          deadline: subtaskDeadline,
          note: note,
          complete: complete,
        };
        const status = await db
          .collection(Collections.Subtasks)
          .insertOne(subtask);
        //We want to have a clean success check for every operation. Needs work here.
        if (status.result.ok) {
          res.send({ success: true, data: subtask });
        } else {
          res.send({ success: false, error_msg: "Inserting subtask failed." });
        }
      } else {
        res.send({
          success: false,
          error_msg:
            "A task parent with ID '" + taskParentId + "' could not be found.",
        });
      }
    } else {
      res.send(qryResultForWorkspace);
    }
  }
);

module.exports = workspaceRouter;
