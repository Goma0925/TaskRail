import { produce } from "immer";
import { getPreviousSunday } from "../../../helpers/calendar";
import SubTask from "../../../models/Subtask";
import ReduxAction from "../ReduxAction";
import * as Actions from "./RailUiActions";

export interface RailUiSelection{
    type: "NONE"|"SUBTASK"|"TASKPARENT";
    itemId: string;
}

interface RailUiState{
    taskParentNodeWidth: number;
    subtaskNodeWidth: number;
    railUiWidth: number;
    selection: RailUiSelection
    displayRangeStartDate: Date;
};

const initialState:RailUiState = {
    taskParentNodeWidth: 200,
    subtaskNodeWidth: 0,
    railUiWidth: 0,
    selection: {type :"SUBTASK", itemId: "1"},
    displayRangeStartDate: getPreviousSunday(new Date()),
};

function railUiReducer(
    state = initialState,
    action: ReduxAction
  ): RailUiState{
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
        case Actions.SelectItem.type:
            return produce(state, draftState=>{
                draftState.selection.type = (<Actions.SelectItem>action).selection.type;
                draftState.selection.itemId = (<Actions.SelectItem>action).selection.itemId;
            });
        default:
          return state
      }
}

export default railUiReducer;