export class SetSubtaskNodeWidth{
    static type:string = "SetSubtaskNodeWdith";
    type: string;
    width: number = 0;
    constructor(width: number){
        this.type = SetSubtaskNodeWidth.type;
        this.width = width;
    }
}

type RailUiActions = SetSubtaskNodeWidth; //Add more action types here
export default RailUiActions;