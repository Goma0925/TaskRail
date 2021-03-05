import TaskParent from "./TaskParent";

export default class Workspace{
    private name: string;
    private id: string;
    private taskParents: {[id: string]: TaskParent; } = {};

    public constructor(name: string, id: string){
        this.name = name;
        this.id = id;
    }
    //setters or modifiers

    public setName(name:string){
        this.name = name;
    }

    public setId(id:string){
        this.id = id;
    }

    public setTaskParents(taskParents: TaskParent[]){
        const self = this;
        taskParents.map((taskParent)=>{
            self.taskParents[taskParent.getId()] = taskParent;
        })
    }
    
    public addTaskParent(TaskParent: TaskParent){
        this.taskParents[TaskParent.getId()] = TaskParent;
    }

    public removeTaskParentById(id: string){
        delete this.taskParents[id];
    }

    //getters

    public getName(){
        return this.name;
    }

    public getId(){
        return this.id;
    }

    public getTaskParents(): {[id: string]: TaskParent; }{
        return this.taskParents;
    }

    public getTaskParent(id: string){
        return this.taskParents[id];
    }
}