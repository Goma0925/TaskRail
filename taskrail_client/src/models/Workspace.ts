export default class Workspace{
    private name: string;
    private id: string;
    private taskParentIds: string[] = [];

    public constructor(name: string, id: string, taskParentIds?:string[]){
        this.name = name;
        this.id = id;
        this.taskParentIds = taskParentIds? taskParentIds:[];
    }
    //setters or modifiers

    public setName(name:string){
        this.name = name;
    }

    public setId(id:string){
        this.id = id;
    }

    public setTaskParentIds(taskParentIds: string[]){
        this.taskParentIds = taskParentIds;
    }
    
    public addTaskParentId(taskParentId: string){
        this.taskParentIds.push(taskParentId);
    }

    public removeTaskParentById(taskParentId: string){
        const index = this.taskParentIds.indexOf(taskParentId);
        if (index == -1){
            throw Error("TaskParent with ID '"+taskParentId+"' does not exist on the workspace.")
        }else{
            this.taskParentIds.splice(index, 1);
        }
    }

    //getters

    public getName(){
        return this.name;
    }

    public getId(){
        return this.id;
    }

    public getTaskParentIds(): string[]{
        return this.taskParentIds;
    };
}