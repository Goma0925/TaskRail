import RailUiActionTypes from "./RailUiActions";
import { SetSubtaskNodeWidth } from "./RailUiActions";
import { produce } from "immer";

export interface RailUiState{
    taskParentNodeWidth: number;
    subtaskNodeWidth: number;
    selectedNode: {
        type: "SUBTASK"|"TASK_PARENT"|"NONE", 
        id: string|undefined,
    }
};

const initialState:RailUiState = {
    taskParentNodeWidth: 200,
    subtaskNodeWidth: 0,
    selectedNode: {
        type: "NONE",
        id: undefined
    }
};

function railUiReducer(
    state = initialState,
    action: RailUiActionTypes
  ): RailUiState{
    switch (action.type) {
        case  SetSubtaskNodeWidth.type:
            console.log("RailUiReducer got an action:", action);
            return produce(state, (state)=>{
                state.subtaskNodeWidth = action.width;
            });
        default:
          return state
      }
}

export default railUiReducer;