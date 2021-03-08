import SubTask from "../../../models/Subtask";
import store from "../../store";
import { CreateSubtask } from "../TaskData/TaskDataActions";
import { SetSubtaskOnDay } from "./PaginationActions";

export function CreateSubtaskOp(subtaskName: string, taskParentId: string, assignedDate: Date){
    // This method will be overwritten once we have API.
    const subtaskId = CreateSubtask.idCount.toString();

    // POST request to create a subtask here
    const subtask = new SubTask(subtaskName, CreateSubtask.idCount.toString(), assignedDate, undefined);

    // ToDo: Rename CreateSubtask
    store.dispatch(new CreateSubtask(subtask, taskParentId));
    console.log("store.dispatch(new CreateSubtask");
    
    store.dispatch(new SetSubtaskOnDay(taskParentId, subtaskId, assignedDate));

    //Increment the ID. Only for testing purpose.
    CreateSubtask.idCount += 1;
}