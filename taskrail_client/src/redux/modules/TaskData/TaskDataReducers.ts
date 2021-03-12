import { produce } from "immer";
import ReduxAction from "../ReduxAction";
import Workspace from "../../../models/Workspace";
import * as Actions from "./TaskDataActions";
import TaskParent from "../../../models/TaskParent";
import SubTask from "../../../models/Subtask";
import TestTaskData from "./TestTaskData/TestTaskDataFactory";

interface TaskDataState{
    workspace: {
        currentWorkspace: Workspace|undefined
        allIds: string[]; //Hold all the workspace IDs.
    };
    taskParents: {
        byId: {
            [taskParentId: string]: TaskParent,
        };
        allIds:string[];
    }
    subtasks: {
        byId: {
            [subtaskId: string]: SubTask
        };
        allIds: string[]
    }
};

const initialState:TaskDataState = {
    workspace: {
        currentWorkspace: TestTaskData.workspace,
        allIds: TestTaskData.allWorkspaceIds,
    },
    taskParents: {
        byId: TestTaskData.taskParentById,
        allIds: TestTaskData.allTaskParentIds
    },
    subtasks: {
        byId: TestTaskData.subtaskbyId,
        allIds: TestTaskData.allSubtaskIds
    }
};

function taskDataReducer(
    state = initialState,
    action: ReduxAction
  ): TaskDataState{
    switch (action.type) {
        case  Actions.AddSubtask.type:
            var subtask = (<Actions.AddSubtask>action).subtask;
            var taskParentId = subtask.getParentId();
            return produce(state, draftState=>{
                // Add subtask ID to the taskparent store.
                draftState.taskParents.byId[taskParentId].addSubtaskIdToCurrentFrame(subtask.getId());
                // Add subtask instance and ID to the subtask store.
                draftState.subtasks.byId[subtask.getId()] = subtask;

                // ToDo the ID has to be inserted at the right location.
                draftState.subtasks.allIds.push(subtask.getId());
            });
        case Actions.DeleteSubtask.type:
            var subtaskId = (<Actions.DeleteSubtask>action).subtaskId;
            var taskParentId = state.subtasks.byId[subtaskId].getParentId();
            return produce(state, draftState=>{
                // Delete subtask from the subtask table
                draftState.subtasks.allIds.splice(draftState.subtasks.allIds.indexOf(subtaskId), 1);
                delete draftState.subtasks.byId[subtaskId];
                // Delete subtask ID from task parent table.
                draftState.taskParents.byId[taskParentId].removeSubtaskByIdFromCurrentFrame(subtaskId);
            })
        case Actions.AddTaskParent.type:
            var taskParent = (<Actions.AddTaskParent>action).taskParent;
            var taskParentId = taskParent.getId();
            return produce(state, (draftState:TaskDataState)=>{
                // Add task parent to the workspace store
                draftState.workspace.currentWorkspace?.addTaskParentId(taskParentId);
                // Add task parent ID and instances to the task parent store
                draftState.taskParents.byId[taskParentId] = taskParent;
                draftState.taskParents.allIds.push(taskParentId);
            })
        case Actions.UpdateSubtask.type:
            var subtask = (<Actions.UpdateSubtask>action).subtask;
            return produce(state, (draftState:TaskDataState)=>{
                draftState.subtasks.byId[subtask.getId()] = subtask;
            })
        default:
          return state
      }
}

export default taskDataReducer;