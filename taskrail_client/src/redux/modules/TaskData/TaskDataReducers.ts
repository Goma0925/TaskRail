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
                // Add subtask ID to the taskparent.
                draftState.taskParents.byId[taskParentId].addSubtaskIdToCurrentFrame(subtask.getId());
                // Add subtask instance to the store.
                draftState.subtasks.byId[subtask.getId()] = subtask;
            });
        case Actions.AddTaskParent.type:
            var taskParent = (<Actions.AddTaskParent>action).taskParent;
            return produce(state, (draftState:TaskDataState)=>{
                // Add task parent to the store
                draftState.workspace.currentWorkspace?.addTaskParentId(taskParent.getId());
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