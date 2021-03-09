import { count } from "console";
import SubTask from "../../../../models/Subtask";
import TaskParent from "../../../../models/TaskParent";

export default class TaskParentFactory{
    static count:number = 0;
    static create(name: string): TaskParent{
        const dateStr = (i:number) =>  new Date('2021-3-'.concat((i+1).toString()));
        const parentDeadline = new Date("'2021-3-12");
        const taskParent = new TaskParent(name, TaskParentFactory.count.toString(), parentDeadline);
        var subtaskNum = 1;
        for (var i=0; i<7; i++){
            // Create subtasks for every other day
            const date = new Date(dateStr(i));
            const subtaskName = name + "'s child(" + subtaskNum.toString() + ")";
            const subtask = new SubTask(subtaskName, i.toString(), TaskParentFactory.count.toString(), date, parentDeadline);
            taskParent.addSubtask(subtask);
            subtaskNum += 1;
        }
        TaskParentFactory.count += 1;
        return taskParent;
    }
}