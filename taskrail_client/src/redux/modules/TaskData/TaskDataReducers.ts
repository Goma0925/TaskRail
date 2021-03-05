import { produce } from "immer";
import ReduxAction from "../ReduxAction";
import Workspace from "../../../models/Workspace";
import * as Actions from "./TaskDataActions";

import TestWorkplaceData from "./TestTaskData/TestWorkplaceData";
import SubTask from "../../../models/Subtask";

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
            const a = action as Actions.CreateSubtask;
            const id = Actions.CreateSubtask.idCount.toString();
            const taskParent = state.currentWorkspace?.getTaskParent(a.taskParentId);
            const subtask = new SubTask(a.name, id, a.assignedDate);
            (<Actions.CreateSubtask>action)
            return produce(state, draftState=>{
                if (taskParent){
                    draftState.currentWorkspace?.getTaskParent(taskParent.getId()).addSubtask(subtask);
                }
            })
        default:
          return state
      }
}

export default taskDataReducer;