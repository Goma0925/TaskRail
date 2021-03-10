import Subtask from "../../../models/Subtask";
import SubTask from "../../../models/Subtask";
import TaskParent from "../../../models/TaskParent";
import ReduxAction from "../ReduxAction";

export class AddSubtask implements ReduxAction{
    // This method needs to be overwritten once we have an API.
    static idCount = 100;
    static type = "CreateSubtask";
    type: string;
    subtask: SubTask;
    constructor(subtask: Subtask){
        this.type = AddSubtask.type;
        this.subtask = subtask;

        // Only for testing purpose
        AddSubtask.idCount+=1;
    }
}

export class AddTaskParent implements ReduxAction{
    static idCount = 100;
    static type = "AddTaskParent";
    type: string;
    taskParent: TaskParent
    constructor(taskParent: TaskParent){
        this.type = AddTaskParent.type;
        this.taskParent = taskParent;
    }
}

export class UpdateSubtask implements ReduxAction{
    static type = "UpdateSubtask";
    type:string;
    subtask: Subtask;
    constructor(subtask:Subtask){
        this.subtask = subtask;
        this.type = UpdateSubtask.type;
    }
}