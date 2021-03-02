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
