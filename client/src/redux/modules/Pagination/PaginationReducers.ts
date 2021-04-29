import ReduxAction from "../ReduxAction";
import * as Actions from "./PaginationActions";
import produce from "immer";
import { getPreviousSunday } from "../../../helpers/DateTime";
import { SetDisplayRangeStartDate } from "./PaginationActions";

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
        case SetDisplayRangeStartDate.type:
            return produce(state, drafState=>{
                drafState.displayRangeStartDate = (<SetDisplayRangeStartDate>action).date;
            })
        default:
          return state
      }
}

export default weekPaginationReducer;