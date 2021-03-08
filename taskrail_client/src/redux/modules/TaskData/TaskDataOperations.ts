import TaskParent from "../../../models/TaskParent";
import { AddTaskParent } from "./TaskDataActions";
import store from "../../store";
import workspace from "./TestTaskData/TestWorkplaceData";

export function CreateTaskParentOp(title: string){
    // This method will be overwritten once we have API.
    const subtaskId = AddTaskParent.idCount.toString();

    // POST request to create here
    
    const taskParent = new TaskParent(title, AddTaskParent.idCount.toString(), new Date());

    // ToDo: Rename AddTaskParent
    store.dispatch(new AddTaskParent(taskParent));
    
    //Increment the ID. Only for testing purpose.
    AddTaskParent.idCount += 1;
}