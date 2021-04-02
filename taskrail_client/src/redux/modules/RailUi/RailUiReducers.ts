import { produce } from "immer";
import { getPreviousSunday } from "../../../helpers/DateTime";
import SubTask from "../../../models/Subtask";
import ReduxAction from "../ReduxAction";
import * as Actions from "./RailUiActions";

export interface RailUiSelection {
  type: "NONE" | "SUBTASK" | "TASKPARENT";
  itemId: string;
}

interface RailUiState {
  taskParentSectionWidth: number;
  taskParentNodeWidth: number;
  subtaskNodeWidth: number; //Dynamically calculated
  minSubtaskNodeWidth: number;
  railUiWidth: number; //Dynamically calculated
  calendarBorderWidth: number;
  selection: RailUiSelection;
  displayRangeStartDate: Date;
}

const initialState: RailUiState = {
  taskParentSectionWidth: 100,
  taskParentNodeWidth: 100,
  subtaskNodeWidth: 0,
  minSubtaskNodeWidth: 100,
  railUiWidth: 0,
  calendarBorderWidth: 4,
  selection: { type: "SUBTASK", itemId: "1" },
  displayRangeStartDate: getPreviousSunday(new Date()),
};

function railUiReducer(state = initialState, action: ReduxAction): RailUiState {
  switch (action.type) {
    case Actions.SetRailUiWidth.type:
      const railUiWidth = (<Actions.SetRailUiWidth>action).railUiWidth;
      const outerContainerWidth = railUiWidth;
      const taskParentNodeWidth = state.taskParentNodeWidth;
      const minSubtaskNodeWidth = state.minSubtaskNodeWidth;
      const calculatedSubtaskNodeWidth =
        (outerContainerWidth - taskParentNodeWidth) / 7;
      // If calculated SubtaskNodeWidth is smaller than the min SubtaskWidth,
      // take the minimum so that we have the lower bound of the width.
      const subtaskNodeWidth =
        calculatedSubtaskNodeWidth > minSubtaskNodeWidth
          ? calculatedSubtaskNodeWidth
          : minSubtaskNodeWidth;
      return produce(state, (draftState) => {
        draftState.railUiWidth = railUiWidth;
        draftState.subtaskNodeWidth = subtaskNodeWidth;
      });
    case Actions.SelectItem.type:
      return produce(state, (draftState) => {
        draftState.selection.type = (<Actions.SelectItem>action).selection.type;
        draftState.selection.itemId = (<Actions.SelectItem>(
          action
        )).selection.itemId;
      });
    default:
      return state;
  }
}

export default railUiReducer;
