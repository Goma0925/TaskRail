import { produce } from "immer";
import ReduxAction from "../ReduxAction";
import Workspace from "../../../models/ClientModels/Workspace";
import * as Actions from "./TaskDataActions";
import TaskParent from "../../../models/ClientModels/TaskParent";
import Subtask from "../../../models/ClientModels/Subtask";
import TestTaskData from "./TestTaskData/TestTaskDataFactory";
import { DRAFT_STATE } from "immer/dist/internal";

export interface TaskDataState {
  workspaces: {
    currentWorkspace: Workspace | undefined;
    byId: {
      [workspaceId: string]: Workspace;
    };
    allIds: string[]; //Hold all the workspace IDs.
  };
  taskParents: {
    byId: {
      [taskParentId: string]: TaskParent;
    };
    allIds: string[];
  };
  subtasks: {
    byId: {
      [subtaskId: string]: Subtask;
    };
    allIds: string[];
  };
}

export const initialTaskDataState: TaskDataState = {
  workspaces: {
    currentWorkspace: undefined,
    byId: {},
    allIds: [],
  },
  taskParents: {
    byId: {},
    allIds: [],
  },
  subtasks: {
    byId: {},
    allIds: [],
  },
};

function taskDataReducer(
  state = initialTaskDataState,
  action: ReduxAction
): TaskDataState {
  switch (action.type) {
    case Actions.ClearTaskParents.type:
      return produce(state, (draftState) => {
        draftState.taskParents.byId = {};
        draftState.taskParents.allIds = [];
        draftState.subtasks.byId = {}; //Also clear the subtasks for cascading purposes.
        draftState.subtasks.allIds = [];
      });
    case Actions.ClearWorkspaces.type:
      return produce(state, (draftState) => {
        draftState.workspaces.byId = {};
        draftState.workspaces.allIds = [];
      });
    case Actions.ClearSubtasks.type:
      return produce(state, (draftState) => {
        draftState.subtasks.byId = {};
        draftState.subtasks.allIds = [];
      });
    case Actions.AddSubtask.type:
      var subtask = (<Actions.AddSubtask>action).subtask;
      var taskParentId = subtask.getParentId();

      return produce(state, (draftState) => {
        // Add subtask ID to the taskparent store.
        draftState.taskParents.byId[taskParentId].setSubtaskIdsToCurrentFrame(
          draftState.taskParents.byId[taskParentId]
            .getSubtaskIdsFromCurrentFrame()
            .concat([subtask.getId()])
        );
        // Add subtask instance and ID to the subtask store.
        draftState.subtasks.byId[subtask.getId()] = subtask;
        // ToDo the ID has to be inserted at the right location.
        draftState.subtasks.allIds.push(subtask.getId());
      });
    case Actions.DeleteSubtask.type:
      var subtaskId = (<Actions.DeleteSubtask>action).subtaskId;
      var taskParentId = state.subtasks.byId[subtaskId].getParentId();
      return produce(state, (draftState) => {
        // Delete subtask from the subtask table
        draftState.subtasks.allIds.splice(
          draftState.subtasks.allIds.indexOf(subtaskId),
          1
        );
        delete draftState.subtasks.byId[subtaskId];
        // Delete subtask ID from task parent table.
        draftState.taskParents.byId[
          taskParentId
        ].removeSubtaskByIdFromCurrentFrame(subtaskId);
      });
    case Actions.UpdateSubtask.type:
      var subtask = (<Actions.UpdateSubtask>action).subtask;
      return produce(state, (draftState: TaskDataState) => {
        if (draftState.subtasks.byId[subtask.getId()]) {
          draftState.subtasks.byId[subtask.getId()] = subtask;
        }
      });
    case Actions.AddTaskParent.type:
      var taskParent = (<Actions.AddTaskParent>action).taskParent;
      var taskParentId = taskParent.getId();
      return produce(state, (draftState: TaskDataState) => {
        // Add task parent to the taskparent IDs to the current workspace.
        // Make sure to copy an array.
        draftState.workspaces.currentWorkspace?.setTaskParentIds([
          ...draftState.workspaces.currentWorkspace?.getTaskParentIds(),
          taskParentId,
        ]);
        // Add task parent ID and instances to the task parent store
        draftState.taskParents.byId[taskParentId] = taskParent;
        // Add tasskparent Id to the allIds
        draftState.taskParents.allIds = draftState.taskParents.allIds.concat([
          taskParentId,
        ]);
      });
    case Actions.DeleteTaskParent.type:
      taskParentId = (<Actions.DeleteTaskParent>action).taskParentId;
      return produce(state, (draftState) => {
        // Delete taskparent from the taskparent table
        draftState.taskParents.allIds.splice(
          draftState.taskParents.allIds.indexOf(taskParentId),
          1
        );
        delete draftState.taskParents.byId[taskParentId];
        // Delete taskParent ID from workspace table.
        var taskParentsIds =
          state.workspaces.currentWorkspace?.getTaskParentIds();
        taskParentsIds = taskParentsIds ? taskParentsIds : [];
        taskParentsIds?.splice(taskParentsIds.indexOf(taskParentId), 1);
        draftState.workspaces.currentWorkspace?.setTaskParentIds(
          taskParentsIds
        );
      });
    case Actions.UpdateTaskParent.type:
      var taskParent = (<Actions.UpdateTaskParent>action).taskParent;
      return produce(state, (draftState) => {
        if (draftState.taskParents.byId[taskParent.getId()]) {
          draftState.taskParents.byId[taskParent.getId()] = taskParent;
        }
      });
    case Actions.SetCurrentWorkspace.type:
      var workspace = (<Actions.SetCurrentWorkspace>action).workspace;
      return produce(state, (draftState) => {
        draftState.workspaces.currentWorkspace = workspace;
      });
    case Actions.UnsetCurrentWorkspace.type:
      var workspace = (<Actions.UnsetCurrentWorkspace>action).workspace;
      return produce(state, (draftState) => {
        draftState.workspaces.currentWorkspace = undefined;
      });
    case Actions.AddWorkspace.type:
      var addingWorkspace = (<Actions.AddWorkspace>action).workspace;
      var workspaceId = addingWorkspace.getId();
      return produce(state, (draftState: TaskDataState) => {
        // Add workspace to the workspace list in redux
        draftState.workspaces.byId[workspaceId] = addingWorkspace;
        draftState.workspaces.allIds = state.workspaces.allIds.concat([
          workspaceId,
        ]);
      });
    case Actions.DeleteWorkspace.type:
      var workspaceId = (<Actions.DeleteWorkspace>action).workspaceId;
      return produce(state, (draftState: TaskDataState) => {
        // Add workspace to the workspace list in redux
        draftState.workspaces.allIds.splice(
          draftState.workspaces.allIds.indexOf(workspaceId),
          1
        );
        delete draftState.workspaces.byId[workspaceId];
      });
    case Actions.UpdateWorkspace.type:
      var workspace = (<Actions.UpdateWorkspace>action).workspace;
      return produce(state, (draftState: TaskDataState) => {
        // Add workspace to the workspace list in redux
        if (draftState.workspaces.byId[workspace.getId()]) {
          draftState.workspaces.byId[workspace.getId()] = workspace;
        }
      });
    default:
      return state;
  }
}

export default taskDataReducer;
