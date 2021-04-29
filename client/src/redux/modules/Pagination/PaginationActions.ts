// Define an action name starting with a verb as a class.
export class SetSubtaskOnDay{
    static type:string = "SetSomeData";
    type: string;
    taskParentId: string
    subtaskId: string;
    assignedDate: Date
    constructor(taskParentId: string, subtaskId: string, assignedDate: Date){
        this.type = SetSubtaskOnDay.type;
        this.taskParentId = taskParentId;
        this.subtaskId = subtaskId;
        this.assignedDate = assignedDate;
    }
}

export class SetDisplayRangeStartDate{
    static type: string = "PaginateNextWeek";
    type: string;
    date: Date;
    constructor(date: Date){
        this.type = SetDisplayRangeStartDate.type;
        this.date = date;
    }
}

