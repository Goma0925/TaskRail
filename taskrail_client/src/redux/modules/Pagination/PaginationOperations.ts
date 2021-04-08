import { getNDaysLater } from "../../../helpers/DateTime";
import SubTask from "../../../models/ClientModels/Subtask";
import store from "../../store";
import * as TaskDataActions from "../TaskData/TaskDataActions";
import * as TaskDataOperations from "../TaskData/TaskDataOperations";
import * as PaginationActions from "./PaginationActions";
import { SetDisplayRangeStartDate } from "./PaginationActions";

export function paginateNextWeek(currentStartDate: Date){
    const oneWeekLater = getNDaysLater(currentStartDate ,7);
    store.dispatch(new SetDisplayRangeStartDate(oneWeekLater));
}

export function paginatePrevWeek(currentStartDate: Date){
    const oneWeekLater = getNDaysLater(currentStartDate ,-7);
    store.dispatch(new SetDisplayRangeStartDate(oneWeekLater));
}