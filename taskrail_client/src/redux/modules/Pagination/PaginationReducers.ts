import ReduxAction from "../ReduxAction";
import * as Actions from "./PaginationActions";
import produce from "immer";
import { getPreviousSunday } from "../../../helpers/DateTime";

interface PaginationState{
    displayRangeStartDate: Date;
}

const initialPaginationState: PaginationState = {
    displayRangeStartDate: getPreviousSunday(new Date())
}

function weekPaginationReducer(
    state = initialPaginationState,
    action: ReduxAction
  ): PaginationState{
    switch (action.type) {
        default:
          return state
      }
}

export default weekPaginationReducer;