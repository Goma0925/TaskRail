export default class TaskParent {
    private name: string;
    private id: string;
    private note: string;
    private taskParentDeadline: Date|undefined;
    private currentFrameSubtaskIds: string[] = [];

    public constructor(name: string, id: string, taskParentDeadline?: Date, currentFrameSubtaskIds?: string[], note?: string) {
        this.name = name;
        this.id = id;
        this.note = note? note: "";
        this.taskParentDeadline = taskParentDeadline;
        this.currentFrameSubtaskIds = currentFrameSubtaskIds?currentFrameSubtaskIds:[];
    }
    //setters or modifiers
    public setName(name: string) {
        this.name = name;
    }

    public setId(id: string) {
        this.id = id;
    }

    public setNote(note: string){
        this.note = note;
    }

    public setTaskParentDeadline(taskParentDeadline: Date) {
        this.taskParentDeadline = taskParentDeadline;
    }

    public setSubtaskIdsToCurrentFrame(subtaskIds: string[]) {
        this.currentFrameSubtaskIds.concat(subtaskIds);
    }

    public addSubtaskIdToCurrentFrame(subtaskId: string) {
        this.currentFrameSubtaskIds.push(subtaskId);
    }

    public removeSubtaskByIdFromCurrentFrame(subtaskId: string) {
        const index = this.currentFrameSubtaskIds.indexOf(subtaskId);
        if (index == -1){
            throw Error("Subtask with ID '"+subtaskId+"' does not exist on the TaskParent.")
        }else{
            this.currentFrameSubtaskIds.splice(index, 1);
        }
    }

    public clearCurrentFrameSubtaskIds(){
        this.currentFrameSubtaskIds = [];
    }

    //getters    
    public getName() {
        return this.name;
    }

    public getId() {
        return this.id;
    }

    public getNote(){
        return this.note;
    }

    public getAssignedDate() {
        return this.taskParentDeadline;
    }

    public getDeadline(){
        return this.taskParentDeadline;
    }

    public getSubtaskIdsFromCurrentFrame() {
        return this.currentFrameSubtaskIds;
    }

    public getSubtask(subtaskId: string) {
        return this.currentFrameSubtaskIds[this.currentFrameSubtaskIds.indexOf(subtaskId)];
    }

    public getCopy(){
        const newTaskParent = new TaskParent(this.name, this.id, this.taskParentDeadline, this.currentFrameSubtaskIds, this.note);
        return newTaskParent;
    }
}