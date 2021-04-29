import Subtask from "../../../models/ClientModels/Subtask";
import ReduxAction from "../ReduxAction";
import { RailUiSelection } from "./RailUiReducers";
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

export class SetContentLoaded implements ReduxAction{
    static type = "SetContentLoaded";
    type: string;
    loaded:boolean;
    constructor(loaded: boolean){
        this.type = SetContentLoaded.type;
        this.loaded = loaded
    }
}