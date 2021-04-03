import { getNDaysLater } from "../../../helpers/DateTime";
import SubTask from "../../../models/Subtask";
import store from "../../store";
import * as TaskDataActions from "../TaskData/TaskDataActions";
import * as TaskDataOperations from "../TaskData/TaskDataOperations";
import * as PaginationActions from "./PaginationActions";
import { SetDisplayRangeStartDate } from "./PaginationActions";

export function createSubtaskOnRailOp(subtaskName: string, taskParentId: string, assignedDate: Date){
    // Create a subtask by calling the API and also add its ID to the week frame for pagination.
    const newSubtask = TaskDataOperations.createSubtaskOp(subtaskName, taskParentId, assignedDate);
    
    store.dispatch(new PaginationActions.SetSubtaskOnDay(taskParentId, newSubtask.getId(), assignedDate));

    //Increment the ID. Only for testing purpose.
    TaskDataActions.AddSubtask.idCount += 1;
}

export function paginateNextWeek(currentStartDate: Date){
    const oneWeekLater = getNDaysLater(currentStartDate ,7);
    store.dispatch(new SetDisplayRangeStartDate(oneWeekLater));
}

export function paginatePrevWeek(currentStartDate: Date){
    const oneWeekLater = getNDaysLater(currentStartDate ,-7);
    store.dispatch(new SetDisplayRangeStartDate(oneWeekLater));
}