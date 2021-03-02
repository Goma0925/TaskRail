import { produce } from "immer";
import ReduxAction from "../ReduxAction";
import * as Actions from "./RailUiActions";

export interface RailUiState{
    taskParentNodeWidth: number;
    subtaskNodeWidth: number;
    railUiWidth: number;
    selectedWorkspaceId: string|undefined;
    selectedSubtaskId: string|undefined; //Subtask ID 
    selectedTaskParentId: string|undefined; //TaskParent ID of the selected taskparent.
};

const initialState:RailUiState = {
    taskParentNodeWidth: 200,
    subtaskNodeWidth: 0,
    railUiWidth: 0,
    selectedWorkspaceId: undefined,
    selectedSubtaskId: undefined,
    selectedTaskParentId: undefined,
};

function railUiReducer(
    state = initialState,
    action: ReduxAction
  ): RailUiState{
    console.log("RailUiReducer got an action:", action);
    switch (action.type) {
        case Actions.SetSubtaskNodeWidth.type:
            return produce(state, (state)=>{
                // Use type casting to action to convince the compiler this action is Actions.SetSubtaskNodeWidth
                state.subtaskNodeWidth = (<Actions.SetSubtaskNodeWidth>action).subtaskNodeWidth;
            });
        case Actions.SetTaskParentNodeWidth.type:
            return produce(state, draftState => {
                draftState.taskParentNodeWidth = (<Actions.SetTaskParentNodeWidth>action).taskParentNodeWidth;
            })
        case Actions.SetRailUiWidth.type:
            return produce(state, draftState=>{
                draftState.railUiWidth = (<Actions.SetRailUiWidth>action).railUiWidth;
            });
        default:
          return state
      }
}

export default railUiReducer;