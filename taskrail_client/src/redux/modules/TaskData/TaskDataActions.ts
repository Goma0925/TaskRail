import SubTask from "../../../models/Subtask";
import ReduxAction from "../ReduxAction";

export class CreateSubtask implements ReduxAction{
    // This method needs to be overwritten once we have an API.
    static idCount = 100;
    static type = "CreateSubtaske";
    type: string;
    name: string;
    taskParentId: string;
    assignedDate: Date;
    subtask: SubTask|undefined;
    constructor(name: string, taskParentId: string, assignedDate: Date){
        this.type = CreateSubtask.type;
        this.taskParentId = taskParentId;
        this.name = name;
        this.assignedDate = assignedDate
        this.subtask = undefined;
        CreateSubtask.idCount += 1;
    }

    async api(){

    }
}