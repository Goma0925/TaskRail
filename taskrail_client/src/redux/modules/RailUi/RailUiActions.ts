import SubTask from "../../../models/Subtask";
import ReduxAction from "../ReduxAction";
import { RailUiSelection } from "./RailUiReducers";
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

export class SelectItem implements ReduxAction{
    static type = "SetSelection";
    type: string;
    selection: RailUiSelection
    constructor(selection: RailUiSelection){
        this.type = SelectItem.type;
        this.selection = selection;
    }
}
