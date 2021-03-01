import TaskParent from "./TaskParent";
export default class Workspace{
    name: string;
    id: string;
    taskParents: {[id: string]: TaskParent; } = {};
    constructor(name: string, id: string){
        this.name = name;
        this.id = id;
    }
    addTaskParent(TaskParent: TaskParent, id: string){
        this.taskParents[id] = TaskParent;
    }

    removeTaskParentById(id: string){
        delete this.taskParents[id];
    }
}