// Define an action name starting with a verb.
export class SetSomeData{
    static type:string = "SetSomeData";
    type: string;
    width: number = 0;
    constructor(width: number){
        this.type = SetSomeData.type;
        this.width = width;
    }
}

export class SetOtherData{
    static type:string = "SetSomeData";
    type: string;
    width: number = 0;
    constructor(width: number){
        this.type = SetSomeData.type;
        this.width = width;
    }
}

type SomeActionTypes = SetSomeData | SetOtherData; // List all the action types to export.
export default SomeActionTypes;