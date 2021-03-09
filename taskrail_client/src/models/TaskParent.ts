import SubTask from "./Subtask";
export default class TaskParent {
    private name: string;
    private id: string;
    private parentDeadline: Date;
    private subtasks: {[id: string]: SubTask} = {}

    public constructor(name: string, id: string, parentDeadline: Date){
        this.name = name;
        this.id = id;
        this.parentDeadline = parentDeadline;
    }
    //setters or modifiers
    public setName(name:string){
        this.name = name;
    }

    public setId(id:string){
        this.id = id;
    }

    public setParentDeadline(parentDeadline:Date){
        this.parentDeadline = parentDeadline;
    }

    public setSubtasks(subtasks: SubTask[]){
        const self = this;
        subtasks.map(subtask=>{
            if (this.getId()!=subtask.getParentId()){
                throw Error("Subtask (name='"+subtask.getName()+"' ID="+subtask.getId()+") is being added to a task parent that is not its original parent.")
            }else{
                self.subtasks[subtask.getId()] = subtask;
            }
        })
    }

    public addSubtask(task: SubTask) {
        if (this.getId()!=task.getParentId()){
            throw Error("Subtask (name='"+task.getName()+"' ID="+task.getId()+") is being added to a task parent that is not its original parent.")
        }else{
            this.subtasks[task.getId()] = task;
        }
    }

    public removeSubtaskById(id: string){
        delete this.subtasks[id];
    }

    //getters    

    public getName(){
        return this.name;
    }

    public getId(){
        return this.id;
    }

    public getParentDeadline(){
        return this.parentDeadline
    }

    public getSubtasks(){
        return this.subtasks;
    }

    public getSubtask(id: string){
        return this.subtasks[id];
    }
}