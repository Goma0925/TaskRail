const express = require("express");
const mongoUtil = require("../MongoUtil");
const db = mongoUtil.getDb();
const ObjectID = require("mongodb").ObjectID;
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
    res.send({success:true, data:workspaces?workspaces:[]});
}));

//READ a particular workspace
workspaceRouter.get(
  "/users/:userId/workspaces/:workspaceId",
  async (req, res) => {
    // Return workspace with task parents nested inside of it.
    const workspaceId = req.params.workspaceId;
    console.log("GET workspace:", workspaceId);
    const workspaceCollection = db.collection(Collections.Workspaces);
    const query = { _id: ObjectID(workspaceId) };
    const workspace = await workspaceCollection.findOne(query);
    if (workspace != null) {
      res.send({ success: true, data: workspace });
    } else {
      res.send({ success: false });
    }
  }
);

//CREATE workspace
workspaceRouter.post("/users/:userId/workspaces", async (req, res) => {
  const userId = req.params.id;
  const workspaceCollection = db.collection(Collections.Workspaces);
  //Get payload
  const workspaceName = req.body.name;
  //Insert a new workspace
  const workspace = { name: workspaceName, taskparents: [] };
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
  "/users/:userId/workspaces/:workspaceId/taskparents",
  async (req, res) => {
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
      complete: false,
    };
    //Add taskparent
    const query = { _id: ObjectID(workspaceId) };
    const update = {
      $push: { taskparents: taskParent },
    };
    const status = await workspaceCollection.updateOne(query, update);
    if (status.result.ok) {
      res.send({ success: true, data: taskParent });
    } else {
      res.send({ success: false });
    }
  }
);

//Delete a TaskParent
workspaceRouter.delete(
  "/users/:userId/workspaces/:workspaceId/taskparents/:taskParentId",
  async (req, res) => {
    const workspaceId = req.params.workspaceId;
    const taskParentName = req.body.name;
    const taskParentId = req.params.taskParentId;
    const taskParentDeadline = req.body.taskParentDeadline;
    const taskParentNote = req.body.note;
    const taskParentComplete = req.body.complete;
    console.log(
      "Delete taskparent:",
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
    const workspaceCollection = db.collection(Collections.Workspaces);
    const taskParent = {
      _id: ObjectID(taskParentId),
      name: taskParentName,
      taskParentDeadline: taskParentDeadline,
      note: taskParentNote,
      complete: taskParentComplete,
    };
    //Delete taskparent
    const query = { _id: ObjectID(workspaceId) };
    const update = {
      $pull: { taskparents: taskParent },
    };

    const subtaskCollection = db.collection(Collections.Subtasks);
    const query2 = { taskParentId: taskParentId };

    const status = await workspaceCollection.updateOne(query, update);
    const status2 = await subtaskCollection.remove(query2);

    if (status.result.ok && status2.result.ok) {
      res.send({ success: true, data: taskParent });
    } else {
      res.send({ success: false });
    }
  }
);

//Delete Workspace
workspaceRouter.delete("/users/:userId/workspaces/:workspaceId", async (req, res) => {
  const workspaceId = req.params.workspaceId;
  const workspaceCollection = db.collection(Collections.Workspaces);
  const subtaskCollection = db.collection(Collections.Subtasks);
  const query = { _id: ObjectID(workspaceId) };
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
});

//Delete Subtask
workspaceRouter.delete(
  "/users/:userId/workspaces/:workspaceId/taskparents/:taskParentId/subtasks/:subtaskId",
  async (req, res) => {
    const subtaskId = req.params.subtaskId;
    const taskParentId = req.body.taskParentId;
    const subtaskName = req.body.name;
    const subtaskScheduledDate = req.body.scheduledDate;
    const subtaskDeadline = req.body.deadline;
    const subtaskNote = req.body.note;
    const subtaskComplete = req.body.complete;
    console.log("Delete subtask:", "\n\t", subtaskId);
    const subtask = {
      _id: ObjectID(subtaskId),
      taskParentId: taskParentId,
      name: subtaskName,
      scheduledDate: subtaskScheduledDate,
      deadline: subtaskDeadline,
      note: subtaskNote,
      complete: subtaskComplete,
    };
    const subtaskCollection = db.collection(Collections.Subtasks);
    const query = { _id: ObjectID(subtaskId) };
    //Delete subtask
    const status = await subtaskCollection.remove(query);

    if (status.result.ok) {
      res.send({ success: true, data: subtask });
    } else {
      res.send({ success: false });
    }
  }
);

//Update taskparent
workspaceRouter.put(
  "/users/:userId/workspaces/:workspaceId/taskparents/:taskParentId",
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
      _id: ObjectID(taskParentId),
      name: taskParentName,
      taskParentDeadline: taskParentDeadline,
      note: taskParentNote,
      complete: taskParentComplete,
    };
    const workspaceCollection = db.collection(Collections.Workspaces);
    //Update taskparent
    const query = {
      _id: ObjectID(workspaceId),
      "taskparents._id": ObjectID(taskParentId),
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
  "/users/:userId/workspaces/:workspaceId/taskparents/:taskParentId/subtasks",
  async (req, res) => {
    const subtaskId = req.body._id;
    const taskParentId = req.params.taskParentId;
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
      _id: ObjectID(subtaskId),
      taskParentId: taskParentId,
      name: subtaskName,
      scheduledDate: subtaskScheduledDate,
      deadline: subtaskDeadline,
      note: subtaskNote,
      complete: subtaskComplete,
    };
    const query = {
      _id: ObjectID(subtaskId),
    };
    const update = { $set: subtask };
    const subtaskCollection = db.collection(Collections.Subtasks);
    const status = await subtaskCollection.update(query, update);

    if (status.result.ok) {
      res.send({ success: true, data: subtask });
    } else {
      res.send({ success: false });
    }
  }
);

//update workspace
workspaceRouter.put("/users/:userId/workspaces", async (req, res) => {
  const workspaceId = req.body._id;
  const workspaceName = req.body.name;
  console.log("Update Workspace:", "\n\t", workspaceId, "\n\t", workspaceName);
  const workspace = {
    name: workspaceName,
  };
  const query = {
    _id: ObjectID(workspaceId),
  };
  const update = { $set: workspace };
  const workspaceCollection = db.collection(Collections.Workspaces);
  const status = await workspaceCollection.update(query, update);

  if (status.result.ok) {
    res.send({ success: true, data: workspace });
  } else {
    res.send({ success: false });
  }
});

//READ all subtasks
workspaceRouter.get(
  "/users/:userId/workspaces/:workspaceId/taskparents/:taskParentId/subtasks",
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
  "/users/:userId/workspaces/:workspaceId/taskparents/:taskParentId/subtasks",
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
          _id: ObjectID(),
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
