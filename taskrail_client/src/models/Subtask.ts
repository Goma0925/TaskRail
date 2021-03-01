export default class SubTask {
    name: string;
    id: string;
    subtaskDeadline: Date;
    parentDeadline: Date;
    constructor (name: string, subtaskDeadline: Date, parentDeadline: Date, id: string){
        this.name = name;
        this.subtaskDeadline = subtaskDeadline;
        this.parentDeadline = parentDeadline;
        this.id = id;
    }
}