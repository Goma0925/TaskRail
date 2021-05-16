import TaskParent from "../../../models/ClientModels/TaskParent";
import * as Actions from "./TaskDataActions";
import store from "../../store";
import { AddSubtask } from "./TaskDataActions";
import Subtask from "../../../models/ClientModels/Subtask";
import axios, { AxiosResponse } from "axios";
import {
  SubtaskJson,
  TaskParentJson,
  WorkspaceJson,
} from "../../../models/ApiModels/TaskDataJson";
import { BaseJson } from "../../../models/ApiModels/BaseJson";
import Workspace from "../../../models/ClientModels/Workspace";
import { AppDispatch } from "../../redux-utils/ReduxUtils";
import { getDateStr, parseOnlyDateFromUTC } from "../../../helpers/DateTime";
import { SelectItem, SetContentLoaded } from "../RailUi/RailUiActions";
import * as TaskDataEndpoints from "../../api_endpoints/TaskData";

export function createSubtaskOp(
  subtaskName: string,
  taskParentId: string,
  assignedDate: Date
) {
  const workspaceId = store
    .getState()
    .taskData.workspaces.currentWorkspace?.getId();
  return async (dispatch: AppDispatch) => {
    if (workspaceId) {
      // Create a JSON subtask to post to the server.
      const rawSubtaskJson: SubtaskJson = {
        _id: "",
        name: subtaskName,
        taskParentId: taskParentId,
        scheduledDate: getDateStr(assignedDate),
        deadline: null,
        note: "",
        complete: false,
      };
      // POST request to create a new subtask.
      axios
        .post(
          TaskDataEndpoints.POST.subtasks.createOneByHierarchy(
            workspaceId,
            taskParentId
          ),
          rawSubtaskJson
        )
        .then((res: AxiosResponse<BaseJson<SubtaskJson>>) => {
          const returnedSubtaskJson = res.data.data;
          // Reconstruct the client subtask model from the server response to
          // add to the Redux store.
          const newSubtask = new Subtask(
            returnedSubtaskJson.name,
            returnedSubtaskJson._id,
            returnedSubtaskJson.taskParentId,
            parseOnlyDateFromUTC(returnedSubtaskJson.scheduledDate),
            returnedSubtaskJson.deadline
              ? parseOnlyDateFromUTC(returnedSubtaskJson.deadline)
              : undefined,
            returnedSubtaskJson.note,
            returnedSubtaskJson.complete
          );
          console.log("returened subtask", returnedSubtaskJson);
          
          //Dispatch a new subtask to the redux store.
          dispatch(new Actions.AddSubtask(newSubtask));
        })
        .catch((err: Error) => {
          throw err;
        });
    } else {
      window.alert("Fatal error occured. Workspace is not selected.");
      throw Error("Workspace ID does not exists");
    }
  };
}

export function deleteSubtaskOp(subtaskId: string) {
  const workspaceId = store
    .getState()
    .taskData.workspaces.currentWorkspace?.getId();
  // Get taskParentsById for later to look up the given subtask's parent ID.
  const taskParentsById = store.getState().taskData.taskParents.byId;
  return async (dispatch: AppDispatch) => {
    if (workspaceId) {
      // WARNING: This is an inefficient look up due to the API structure. Should be refactored.
      // API endpoint should be replaced with a one that only requires subtask ID.
      // Search for taskparent ID using the target subtask ID in order to call API.
      var taskParentId = null;
      for (var tpId in taskParentsById) {
        // For each taskParent, check if the given subtask ID exists.
        const subtaskPosIndex = taskParentsById[tpId]
          .getSubtaskIdsFromCurrentFrame()
          .find((subId) => subId === subtaskId);
        // If the subtask ID is found in the subtask, get the taskparent ID.
        if (subtaskPosIndex != undefined) {
          taskParentId = tpId;
        }
      }
      if (taskParentId != null) {
        // Call the API to delete the subtask.
        axios
          .delete(
            TaskDataEndpoints.DELETE.sutasks.deleteOneByHierarchy(
              workspaceId,
              taskParentId,
              subtaskId
            )
          )
          .then((res: AxiosResponse<BaseJson<SubtaskJson>>) => {
            if (res.data.success) {
              // Unselect the current item first.
              dispatch(new SelectItem({ type: "NONE", itemId: "" }));
              const subtaskJson = res.data.data;
              dispatch(new Actions.DeleteSubtask(subtaskJson._id));
            } else {
              throw "Subtask could not be deleted due to a server error";
            }
          })
          .catch((err: Error) => {
            window.alert("Deletion failed");
            throw err;
          });
      } else {
        throw (
          "TaskParent associated with Subtask(ID='" +
          subtaskId +
          "' could not be found."
        );
      }
    }
  };
}

export function createTaskParentOp(title: string) {
  const workspaceId = store
    .getState()
    .taskData.workspaces.currentWorkspace?.getId();
  return async (dispatch: AppDispatch) => {
    if (workspaceId) {
      const rawTaskParentJson: TaskParentJson = {
        _id: "",
        name: title,
        taskParentDeadline: null,
        note: "",
        complete: false,
      };
      axios
        .post(
          TaskDataEndpoints.POST.taskParents.createOneByHierarchy(workspaceId),
          rawTaskParentJson
        )
        .then((res: AxiosResponse<BaseJson<TaskParentJson>>) => {
          const createdTaskParentJson = res.data.data;
          //Reconstruct the taskparent as a client model
          const taskParent = new TaskParent(
            createdTaskParentJson.name,
            createdTaskParentJson._id,
            createdTaskParentJson.taskParentDeadline
              ? parseOnlyDateFromUTC(createdTaskParentJson.taskParentDeadline)
              : null,
            [],
            createdTaskParentJson.complete
          );
          console.log("CREATED TASKPARENT:", taskParent);

          //Dispatch it to the redux store
          dispatch(new Actions.AddTaskParent(taskParent));
        })
        .catch((err: Error) => {
          throw err;
        });
    } else {
      window.alert("Fatal error occured. Workspace is not selected.");
      throw Error("Workspace ID does not exists");
    }
  };
}

export function deleteTaskParentOp(taskParentId: string) {
  const workspaceId = store
    .getState()
    .taskData.workspaces.currentWorkspace?.getId();
  return async (dispatch: AppDispatch) => {
    if (workspaceId) {
      axios
        .delete(
          TaskDataEndpoints.DELETE.taskParents.deleteOneByHierarchy(
            workspaceId,
            taskParentId
          )
        )
        .then((res: AxiosResponse<BaseJson<TaskParentJson>>) => {
          if (res.data.success) {
            const taskParentJson = res.data.data;
            // Unselect the current item first.
            dispatch(new SelectItem({ type: "NONE", itemId: "" }));
            dispatch(new Actions.DeleteTaskParent(taskParentJson._id));
          } else {
            throw "TaskParent could not be deleted due to a server error.";
          }
        });
    } else {
      window.alert("Fatal error occured. Workspace is not selected.");
      throw Error("Workspace ID does not exists");
    }
  };
}

export function updateTaskParentOp(taskParent: TaskParent) {
  const workspaceId = store
    .getState()
    .taskData.workspaces.currentWorkspace?.getId();
  return async (dispatch: AppDispatch) => {
    if (workspaceId) {
      //Contruct taskparent JSON
      const taskParentDeadline = taskParent.getDeadline();
      const rawTaskParentJson: TaskParentJson = {
        _id: taskParent.getId(),
        name: taskParent.getName(),
        taskParentDeadline: taskParentDeadline
          ? getDateStr(taskParentDeadline)
          : null,
        note: "",
        complete: false,
      };
      //PUT it to the server
      axios
        .put(
          TaskDataEndpoints.PUT.taskParents.updateOneByHierarchy(
            workspaceId,
            taskParent.getId()
          ),
          rawTaskParentJson
        )
        .then((res: AxiosResponse<BaseJson<TaskParentJson>>) => {
          // Dispatch the update to the redux store.
          dispatch(new Actions.UpdateTaskParent(taskParent));
        })
        .catch((err: Error) => {
          throw err;
        });
    } else {
      window.alert("Fatal error occured. Workspace is not selected.");
      throw Error("Workspace ID does not exists");
    }
  };
}

export function updateSubtaskOp(subtask: Subtask) {
  const workspaceId = store
    .getState()
    .taskData.workspaces.currentWorkspace?.getId();
  return async (dispatch: AppDispatch) => {
    if (workspaceId) {
      /* Construct the SubTask JSON */
      const subtaskDeadline = subtask.getSubtaskDeadline();
      const rawSubtaskJson: SubtaskJson = {
        _id: subtask.getId(),
        taskParentId: subtask.getParentId(),
        name: subtask.getName(),
        scheduledDate: getDateStr(subtask.getAssignedDate()),
        deadline: subtaskDeadline ? getDateStr(subtaskDeadline) : null,
        note: subtask.getNote(),
        complete: subtask.getStatus(),
      };
      /* Then post it to the server */
      console.log("rawSubtaskJson", rawSubtaskJson);
      
      axios
        .put(
          TaskDataEndpoints.PUT.subtasks.updateOneByHierarchy(
            workspaceId,
            subtask.getParentId(),
            subtask.getId()
          ),
          rawSubtaskJson
        )
        .then((res: AxiosResponse<BaseJson<TaskParentJson>>) => {
          if (res.data.success) {
            // Dispatch the update to the redux store.
            dispatch(new Actions.UpdateSubtask(subtask));
          } else {
            throw "Subtask could not be created due to a server error.";
          }
        })
        .catch((err: Error) => {
          throw err;
        });
    } else {
      window.alert("Fatal error occured. Workspace is not selected.");
      throw Error("Workspace ID does not exists");
    }
  };
}

// create workspace operation
export function createWorkspaceOp(workspace: Workspace, setAsCurrentWorkspace?: boolean) {
  const rawWorkspaceJson: WorkspaceJson = {
    _id: "",
    name: workspace.getName(),
    taskparents: [],
  };

  return async (dispatch: AppDispatch) => {
    axios
      .post(TaskDataEndpoints.POST.workspaces.createOne(), rawWorkspaceJson)
      .then((res: AxiosResponse<BaseJson<WorkspaceJson>>) => {
        const returnedWorkspaceJson = res.data.data;
        const taskparentstrings = returnedWorkspaceJson.taskparents.map(
          (taskParentJsonObject) => {
            return taskParentJsonObject.name;
          }
        );
        const newWorkspace = new Workspace(
          returnedWorkspaceJson.name,
          returnedWorkspaceJson._id,
          taskparentstrings
        );
        dispatch(new Actions.AddWorkspace(newWorkspace));
        if (setAsCurrentWorkspace) {
          dispatch(loadCurrentWorkspaceContent(newWorkspace.getId()));
        }
      })
      .catch((err: Error) => {
        console.error(err);
      });
  };
}

// delete workspace operation
export function deleteWorkspaceOp(workspaceId: string) {
  return async (dispatch: AppDispatch) => {
    axios
      .delete(TaskDataEndpoints.DELETE.workspaces.deleteOneById(workspaceId))
      .then((res: AxiosResponse<BaseJson<WorkspaceJson>>) => {
        if (res.data.success) {
          const workspaceJson = res.data.data;
          dispatch(new Actions.DeleteWorkspace(workspaceJson._id));
        }
      });
  };
}

// update workspace operation
export function updateWorkspaceOp(workspace: Workspace) {
  return async (dispatch: AppDispatch) => {
    const rawWorkspaceJson: WorkspaceJson = {
      _id: workspace.getId(),
      name: workspace.getName(),
      taskparents: [],
    };
    axios
      .put(
        TaskDataEndpoints.PUT.workspaces.byId(workspace.getId()),
        rawWorkspaceJson
      )
      .then((res: AxiosResponse<BaseJson<WorkspaceJson>>) => {
        if (res.data.success) {
          dispatch(new Actions.UpdateWorkspace(workspace));
        } else {
          throw "Workspace couldn't be created due to a server error.";
        }
      })
      .catch((err: Error) => {
        throw err;
      });
  };
}

export function loadAllWorkspaces() {
  return async (dispatch: AppDispatch) => {
    await axios
      .get(TaskDataEndpoints.GET.workspaces.getAll())
      .then((res: AxiosResponse<BaseJson<WorkspaceJson[]>>) => {
        console.log("Loading all workspaces...");
        if (res.data.success) {
          const currentWorkspace = store.getState().taskData.workspaces
            .currentWorkspace;

          const WorkspaceJsonArray = res.data.data.filter(
            (workspaceJson: WorkspaceJson) => {
              console.log("Filtering...");
              return workspaceJson._id != currentWorkspace?.getId();
            }
          );

          const workspaceArray = WorkspaceJsonArray.map(
            (workspaceJson: WorkspaceJson) => {
              console.log("Mapping", workspaceJson.name);
              const workspace = new Workspace(
                workspaceJson.name,
                workspaceJson._id,
                []
              );
              dispatch(new Actions.AddWorkspace(workspace));

              return workspace;
            }
          );

          console.log("Workspace Array:", workspaceArray);
          console.log("Current Workspace:", WorkspaceJsonArray[0]._id);
          dispatch(loadCurrentWorkspaceContent(WorkspaceJsonArray[0]._id));
        }
      });
  };
}
export function loadCurrentWorkspaceContent(workspaceId: string) {
  return async (dispatch: AppDispatch) => {
    var workspace: Workspace | undefined = undefined;
    var taskParents: TaskParent[] = [];
    console.log("Ran Functon...");
    // GET request to the server by workspace ID.
    await axios
      .get(TaskDataEndpoints.GET.workspaces.getOneById(workspaceId))
      .then((res: AxiosResponse<BaseJson<WorkspaceJson>>) => {
        console.log("Response:", res);
        if (res.data.success) {
          console.log("Loading current workspace...");

          dispatch(new SelectItem({ type: "NONE", itemId: "" }));
          dispatch(new Actions.ClearTaskParents());
          dispatch(new Actions.ClearSubtasks());
          const nestedWorkspaceJson: WorkspaceJson = res.data.data;

          workspace = new Workspace(
            nestedWorkspaceJson.name,
            nestedWorkspaceJson._id,
            [] //Leave the ID blank because AddTaskParent action will add the ID automatically
          );
          // Set the current workspace instance.
          dispatch(new Actions.AddWorkspace(workspace));
          dispatch(new Actions.SetCurrentWorkspace(workspace));
          taskParents = nestedWorkspaceJson.taskparents.map(
            (taskParentJson: TaskParentJson) => {
              const taskParent = new TaskParent(
                taskParentJson.name,
                taskParentJson._id,
                taskParentJson.taskParentDeadline != null
                  ? parseOnlyDateFromUTC(taskParentJson.taskParentDeadline)
                  : null,
                [],
                taskParentJson.complete
              );
              // Dispatch task parent to the redux store.
              dispatch(new Actions.AddTaskParent(taskParent));
              // Return to the array to call the subtask API later.
              return taskParent;
            }
          );
        }
      })
      .catch((err: Error) => {
        throw err;
      });

    // Query for subtasks
    for (let i = 0; i < taskParents.length; i++) {
      const subtaskIds: string[] = [];
      const taskParent = taskParents[i];
      await axios
        .get(
          TaskDataEndpoints.GET.subtasks.getAllByHierarchy(
            workspaceId,
            taskParent.getId()
          )
        )
        .then((res: AxiosResponse<BaseJson<SubtaskJson[]>>) => {
          if (res.data.success) {
            // For-loop all the subtasks and construct Subtask instances.
            res.data.data.map((subtaskJson: SubtaskJson) => {
              // Collect the subtask IDs to an array to set them to parent.
              subtaskIds.push(subtaskJson._id);
              //Create subtask instance
              const subtask = new Subtask(
                subtaskJson.name,
                subtaskJson._id,
                subtaskJson.taskParentId,
                parseOnlyDateFromUTC(subtaskJson.scheduledDate),
                subtaskJson.deadline
                  ? parseOnlyDateFromUTC(subtaskJson.deadline)
                  : undefined,
                subtaskJson.note,
                subtaskJson.complete
              );
              //Dispatch subtask to the redux store.
              dispatch(new Actions.AddSubtask(subtask));
            });
          }
        })
        .catch((err: Error) => {
          throw err;
        });
    }
    // Dispatch SetContentLoaded to stop the loading view.
    dispatch(new SetContentLoaded(true));
  };
}
