import { produce } from "immer";
import ReduxAction from "../ReduxAction";
import Workspace from "../../../models/Workspace";
import * as Actions from "./TaskDataActions";

import TestWorkplaceData from "./TestTaskData/TestWorkplaceData";
import SubTask from "../../../models/Subtask";
import { Action } from "redux";

interface TaskDataState{
    currentWorkspace: Workspace|undefined;
    allWorkspaceIds: string[]; //Hold all the workspace IDs.
};

const initialState:TaskDataState = {
    currentWorkspace: TestWorkplaceData,
    allWorkspaceIds: [],
};

function taskDataReducer(
    state = initialState,
    action: ReduxAction
  ): TaskDataState{
    switch (action.type) {
        case  Actions.CreateSubtask.type:
            var a = action as Actions.CreateSubtask;
            const subtask = a.subtask;
            const taskParent = state.currentWorkspace?.getTaskParent(a.taskParentId);
            return produce(state, (draftState:TaskDataState)=>{
                if (taskParent){
                    draftState.currentWorkspace?.getTaskParent(taskParent.getId()).addSubtask(subtask);
                }
            })
        case Actions.AddTaskParent.type:
            return produce(state, (draftState:TaskDataState)=>{
                draftState.currentWorkspace?.addTaskParent((<Actions.AddTaskParent>action).taskParent);
            })
        case Actions.UpdateSubtask.type:
            return produce(state, (draftState:TaskDataState)=>{
                draftState.currentWorkspace?.getTaskParent((<Actions.UpdateSubtask> action).taskParent.getId()).addSubtask((<Actions.UpdateSubtask> action).subtask);
            })
        default:
          return state
      }
}

export default taskDataReducer;