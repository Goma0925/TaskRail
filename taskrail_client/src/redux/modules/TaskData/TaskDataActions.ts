import Subtask from "../../../models/ClientModels/Subtask";
import SubTask from "../../../models/ClientModels/Subtask";
import TaskParent from "../../../models/ClientModels/TaskParent";
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

export class DeleteSubtask implements ReduxAction {
    static type  = "DeleteSubtask";
    type: string;
    subtaskId: string;
    constructor(subtaskId: string){
        this.type = DeleteSubtask.type;
        this.subtaskId = subtaskId;
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
export class AddTaskParent implements ReduxAction{
    static idCount = 101;
    static type = "AddTaskParent";
    type: string;
    taskParent: TaskParent
    constructor(taskParent: TaskParent){
        this.type = AddTaskParent.type;
        this.taskParent = taskParent;
    }
}
export class DeleteTaskParent implements ReduxAction{
    static type = "DeleteTaskParent";
    type: string;
    taskParentId: string;
    constructor(taskParentId: string){
        this.type = DeleteTaskParent.type;
        this.taskParentId = taskParentId;
    }
}
export class UpdateTaskParent implements ReduxAction{
    static type = "UpdateTaskParent";
    type: string;
    taskParent: TaskParent;
    constructor(taskParent: TaskParent){
        this.type = UpdateTaskParent.type;
        this.taskParent = taskParent;
    }
}