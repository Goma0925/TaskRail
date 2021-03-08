import Subtask from "../../../models/Subtask";
import SubTask from "../../../models/Subtask";
import ReduxAction from "../ReduxAction";

export class CreateSubtask implements ReduxAction{
    // This method needs to be overwritten once we have an API.
    static idCount = 100;
    static type = "CreateSubtask";
    type: string;
    subtask: SubTask;
    taskParentId: string;
    constructor(subtask: Subtask, taskParentId: string){
        this.type = CreateSubtask.type;
        CreateSubtask.idCount+=1;
        this.subtask = subtask;
        this.taskParentId = taskParentId;
    }
}