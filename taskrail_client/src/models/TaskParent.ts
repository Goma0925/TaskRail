import SubTask from "./Subtask";
export default class TaskParent {
    name: string;
    id: string;
    parentDeadline: Date;
    subtasks: {[id: string]: SubTask} = {}
    constructor(name: string, id: string, parentDeadline: Date){
        this.name = name;
        this.id = id;
        this.parentDeadline = parentDeadline;
    }
    addSubtask(task: SubTask, id: string) {
        this.subtasks[id] = task;
    }

    removeSubtaskById(id: string){
        delete this.subtasks[id];
    }
}