import { SetSomeData } from "./TaskDataActions";
import { produce } from "immer";
import ReduxAction from "../ReduxAction";
import Workspace from "../../../models/Workspace";

import TestWorkplaceData from "./TestTaskData/TestWorkplaceData";

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
        case  SetSomeData.type:
            // Process for SetSomeData goes here.
            // // To supress the type error, cast action to access its attributes
            // const width = (<SetSomeData>action).width;
            // // Use immer produce to create a new state object to return.
            // return produce(state, (draftState)=>{
            //     draftState.height = 200; //Update the draftState.
            // });
        default:
          return state
      }
}

export default taskDataReducer;