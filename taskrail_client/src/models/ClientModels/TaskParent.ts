export default class TaskParent {
  private name: string;
  private id: string;
  private taskParentDeadline: Date | undefined;
  private currentFrameSubtaskIds: string[] = [];
  private note: string = "";
  private complete: boolean = false;

  public constructor(
    name: string,
    id: string,
    taskParentDeadline?: Date|undefined,
    currentFrameSubtaskIds?: string[],
    complete?: boolean
  ) {
    this.name = name;
    this.id = id;
    this.taskParentDeadline = taskParentDeadline;
    this.currentFrameSubtaskIds = currentFrameSubtaskIds?
        currentFrameSubtaskIds
      : [];
    this.complete = complete?
        complete
       :false;
  }
  //setters or modifiers
  public setName(name: string) {
    this.name = name;
  }

  public setId(id: string) {
    this.id = id;
  }

  public setNote(note: string) {
    this.note = note;
  }
  public setTaskParentDeadline(taskParentDeadline: Date) {
    this.taskParentDeadline = taskParentDeadline;
  }

  public setSubtaskIdsToCurrentFrame(subtaskIds: string[]) {
    this.currentFrameSubtaskIds = subtaskIds
  }

  public addSubtaskIdToCurrentFrame(subtaskId: string) {
    this.currentFrameSubtaskIds.push(subtaskId);
  }

  public removeSubtaskByIdFromCurrentFrame(subtaskId: string) {
    const index = this.currentFrameSubtaskIds.indexOf(subtaskId);
    if (index == -1) {
      throw Error(
        "Subtask with ID '" + subtaskId + "' does not exist on the TaskParent."
      );
    } else {
      this.currentFrameSubtaskIds.splice(index, 1);
    }
  }

  public clearCurrentFrameSubtaskIds() {
    this.currentFrameSubtaskIds = [];
  }

  public completeTask() {
    this.complete = true;
  }

  public uncompleteTask() {
    this.complete = false;
  }

  //getters
  public getName() {
    return this.name;
  }

  public getId() {
    return this.id;
  }

  public getAssignedDate() {
    return this.taskParentDeadline;
  }

  public getSubtaskIdsFromCurrentFrame() {
    return this.currentFrameSubtaskIds;
  }

  public getSubtask(subtaskId: string) {
    return this.currentFrameSubtaskIds[
      this.currentFrameSubtaskIds.indexOf(subtaskId)
    ];
  }

  public getDeadline() {
    return this.taskParentDeadline;
  }

  public getNote() {
    return this.note;
  }

  public isComplete(){
    return this.complete;
  }

  public getCopy() {
    return new TaskParent(
      this.name,
      this.id,
      this.taskParentDeadline,
      this.currentFrameSubtaskIds,
      this.complete
    );
  }
}
