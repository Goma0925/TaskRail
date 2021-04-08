import { produce } from "immer";
import ReduxAction from "../ReduxAction";
import Workspace from "../../../models/ClientModels/Workspace";
import * as Actions from "./TaskDataActions";
import TaskParent from "../../../models/ClientModels/TaskParent";
import SubTask from "../../../models/ClientModels/Subtask";
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

// const initialState:TaskDataState = {
//     workspace: {
//         currentWorkspace: TestTaskData.workspace,
//         allIds: TestTaskData.allWorkspaceIds,
//     },
//     taskParents: {
//         byId: TestTaskData.taskParentById,
//         allIds: TestTaskData.allTaskParentIds
//     },
//     subtasks: {
//         byId: TestTaskData.subtaskbyId,
//         allIds: TestTaskData.allSubtaskIds
//     }
// };
const initialState:TaskDataState = {
    workspace: {
        currentWorkspace: undefined,
        allIds: [],
    },
    taskParents: {
        byId: {},
        allIds: []
    },
    subtasks: {
        byId: {},
        allIds: []
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
                draftState.taskParents.byId[taskParentId].setSubtaskIdsToCurrentFrame(
                    draftState.taskParents.byId[taskParentId].getSubtaskIdsFromCurrentFrame().concat([subtask.getId()])
                    )
                // Add subtask instance and ID to the subtask store.
                draftState.subtasks.byId[subtask.getId()] = subtask;
                // ToDo the ID has to be inserted at the right location.
                draftState.subtasks.allIds = draftState.subtasks.allIds.concat([subtask.getId()]);
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
            });
        case Actions.UpdateSubtask.type:
            var subtask = (<Actions.UpdateSubtask>action).subtask;
            return produce(state, (draftState:TaskDataState)=>{
                draftState.subtasks.byId[subtask.getId()] = subtask;
            })
        case Actions.AddTaskParent.type:
            var taskParent = (<Actions.AddTaskParent>action).taskParent;
            var taskParentId = taskParent.getId();
            return produce(state, (draftState:TaskDataState)=>{
                // Add task parent to the workspace store
                draftState.workspace.currentWorkspace?.setTaskParentIds(draftState.workspace.currentWorkspace?.getTaskParentIds().concat([taskParentId]));
                // Add task parent ID and instances to the task parent store
                draftState.taskParents.byId[taskParentId] = taskParent;
                draftState.taskParents.allIds.push(taskParentId);
            });
        case Actions.DeleteTaskParent.type:
            taskParentId =  (<Actions.DeleteTaskParent>action).taskParentId;
            return produce(state, draftState=>{
                // Delete taskparent from the taskparent table
                draftState.taskParents.allIds.splice(draftState.taskParents.allIds.indexOf(taskParentId), 1);
                delete draftState.taskParents.byId[taskParentId];
                // Delete taskParent ID from workspace table.
                var taskParentsIds = state.workspace.currentWorkspace?.getTaskParentIds();
                taskParentsIds = taskParentsIds? taskParentsIds: [];
                taskParentsIds?.splice(taskParentsIds.indexOf(taskParentId), 1);
                draftState.workspace.currentWorkspace?.setTaskParentIds(taskParentsIds);
            });
        case Actions.UpdateTaskParent.type:
            var taskParent = (<Actions.UpdateTaskParent>action).taskParent;
            return produce(state, (draftState)=>{
                draftState.taskParents.byId[taskParent.getId()] = taskParent;
            });
        case Actions.SetCurrentWorkspace.type:
            var workspace = (<Actions.SetCurrentWorkspace>action).workspace;
            return produce(state, (draftState=>{
                draftState.workspace.currentWorkspace = workspace;
                draftState.workspace.allIds = state.workspace.allIds.concat([workspace.getId()]);
            }));
        case Actions.UpdateWorkspace.type:
            var workspace = (<Actions.SetCurrentWorkspace>action).workspace;
            return produce(state, (draftState)=>{
                draftState.workspace.currentWorkspace = workspace;
            });
        case Actions.DeleteWorkspace.type:
            var workspace = (<Actions.SetCurrentWorkspace>action).workspace;
            return produce(state, (draftState)=>{
                draftState.workspace.currentWorkspace = undefined;
            })
        default:
          return state
      }
}

export default taskDataReducer;