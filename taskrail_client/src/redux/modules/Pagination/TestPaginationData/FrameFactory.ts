import { PaginationFrame } from "../PaginationReducers";

export default class PaginationObjectFactory{
    static create(taskParentIds: string[]): PaginationFrame {
        var frame = {};
        for (var id in taskParentIds){
            const subtaskIds = [];
            for (var i=0; i<7; i++){
                // Create subtasks for every other day
                subtaskIds.push([i.toString()]);
            }
            var frameForSubtask:any = {};
            frameForSubtask[id.toString()] = subtaskIds;
            frame = {...frame, ...frameForSubtask};
        }
        return frame;
    }
};