export default class SubTask {
    private name: string;
    private id: string;
    private subtaskDeadline: Date;
    private assignedDate: Date;

    public constructor (name: string,  id: string, assignedDate: Date, subtaskDeadline: Date){
        this.name = name;
        this.assignedDate = assignedDate
        this.subtaskDeadline = subtaskDeadline;
        this.id = id;
    }
    //setters or modifiers
    public setName(name:string){
        this.name = name;
    }

    public setId(id:string){
        this.id = id;
    }

    public setSubtaskDeadline(subtaskDeadline:Date){
        this.subtaskDeadline = subtaskDeadline;
    }

    //getters
    public getName(){
        return this.name;
    }

    public getId(){
        return this.id;
    }

    public getSubtaskDeadline(){
        return this.subtaskDeadline;
    }
}