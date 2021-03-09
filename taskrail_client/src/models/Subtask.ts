export default class SubTask {
    private name: string;
    private id: string;
    private subtaskDeadline: Date|undefined;
    private assignedDate: Date;
    private parentId: string;

    public constructor (name: string,  subtaskId: string, parentId:string, assignedDate: Date, subtaskDeadline?: Date){
        this.name = name;
        this.assignedDate = assignedDate;
        this.subtaskDeadline = subtaskDeadline? subtaskDeadline: undefined;
        this.id = subtaskId;
        this.parentId = parentId;
    }
    //setters or modifiers
    public setName(name:string){
        this.name = name;
    }

    public setId(id:string){
        this.id = id;
    }

    public setParentId(id: string){
        this.parentId = id;
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
    };

    public getParentId(){
        return this.parentId;
    }

    public getAssignedDate(){
        return this.assignedDate;
    }

    public getSubtaskDeadline(){
        return this.subtaskDeadline;
    }
}