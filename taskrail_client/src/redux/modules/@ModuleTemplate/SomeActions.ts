import ReduxAction from "../ReduxAction";

// Define an action name starting with a verb as a class.
export class SetSomeData implements ReduxAction{
    static type:string = "SetSomeData";
    type: string;
    width: number = 0;
    constructor(width: number){
        this.type = SetSomeData.type;
        this.width = width;
    }
}
