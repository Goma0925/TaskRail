import store from "../../store";
import { SetDisplayRangeStartDate } from "./PaginationActions";

export function setWeekStartDate(startDate: Date){
    store.dispatch(new SetDisplayRangeStartDate(startDate));
}
