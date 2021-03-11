import SubTask from "../../../models/Subtask";
import store from "../../store";
import * as TaskDataActions from "../TaskData/TaskDataActions";
import * as TaskDataOperations from "../TaskData/TaskDataOperations";
import * as PaginationActions from "./PaginationActions";

export function createSubtaskOnRailOp(subtaskName: string, taskParentId: string, assignedDate: Date){
    // Create a subtask by calling the API and also add its ID to the week frame for pagination.
    const newSubtask = TaskDataOperations.createSubtaskOp(subtaskName, taskParentId, assignedDate);
    
    store.dispatch(new PaginationActions.SetSubtaskOnDay(taskParentId, newSubtask.getId(), assignedDate));

    //Increment the ID. Only for testing purpose.
    TaskDataActions.AddSubtask.idCount += 1;
}

export function createTaskParentOnRailOp(title: string){
    const newTaskParent = TaskDataOperations.createTaskParentOp(title);
}
