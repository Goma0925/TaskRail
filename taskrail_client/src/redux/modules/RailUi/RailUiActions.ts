import SubTask from "../../../models/Subtask";
import ReduxAction from "../ReduxAction";
export class SetTaskParentNodeWidth implements ReduxAction{
    static type = "SetTaskParentNodeWidth";
    type: string;
    taskParentNodeWidth: number;
    constructor(width: number){
        this.type = SetTaskParentNodeWidth.type;
        this.taskParentNodeWidth = width;
    }
}

export class SetSubtaskNodeWidth implements ReduxAction{
    static type = "SetSubtaskNodeWidth";
    type: string;
    subtaskNodeWidth: number = 0;
    constructor(width: number){
        this.type = SetSubtaskNodeWidth.type;
        this.subtaskNodeWidth = width;
    }
}

export class SetRailUiWidth implements ReduxAction{
    static type = "SetRailUiWidth";
    type: string;
    railUiWidth: number;
    constructor(width: number){
        this.type = SetRailUiWidth.type;
        this.railUiWidth = width;
    }
};

