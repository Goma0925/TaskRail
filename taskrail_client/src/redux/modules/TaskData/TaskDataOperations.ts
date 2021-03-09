import TaskParent from "../../../models/TaskParent";
import { AddTaskParent } from "./TaskDataActions";
import store from "../../store";
import {AddSubtask} from "./TaskDataActions";
import SubTask from "../../../models/Subtask";

export function createSubtaskOp(subtaskName: string, taskParentId: string, assignedDate: Date){
        // This method will be overwritten once we have API.
        const subtaskId = AddSubtask.idCount.toString();

        // POST request to create a subtask here
        const subtask = new SubTask(subtaskName, AddSubtask.idCount.toString(), taskParentId, assignedDate, undefined);
    
        // ToDo: Rename CreateSubtask
        store.dispatch(new AddSubtask(subtask, taskParentId));
        return subtask;
}

export function createTaskParentOp(title: string){
    // This method will be overwritten once we have API.
    const subtaskId = AddTaskParent.idCount.toString();

    // POST request to create here
    
    const taskParent = new TaskParent(title, AddTaskParent.idCount.toString(), new Date());

    // ToDo: Rename AddTaskParent
    store.dispatch(new AddTaskParent(taskParent));
    
    //Increment the ID. Only for testing purpose.
    AddTaskParent.idCount += 1;
}