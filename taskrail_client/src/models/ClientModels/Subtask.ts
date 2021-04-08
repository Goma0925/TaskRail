export default class SubTask {
  private name: string;
  private id: string;
  private subtaskDeadline: Date|undefined;
  private assignedDate: Date;
  private taskParentId: string;
  private note: string;
  private complete: boolean = false;
  private parentComplete: boolean = false;

  public constructor(
    name: string,
    subtaskId: string,
    parentId: string,
    assignedDate: Date,
    subtaskDeadline: Date|undefined,
    note = "",
    complete?: boolean,
  ) {
    this.name = name;
    this.assignedDate = assignedDate;
    this.subtaskDeadline = subtaskDeadline;
    this.id = subtaskId;
    this.taskParentId = parentId;
    this.note = note;
    this.complete = complete?
        complete
       :false;
  }
  //setters or modifiers
  public setName(name: string) {
    this.name = name;
  }

  public setNote(note: string) {
    this.note = note;
  }

  public setId(id: string) {
    this.id = id;
  }

  public setParentId(id: string) {
    this.taskParentId = id;
  }

  public setSubtaskDeadline(subtaskDeadline: Date) {
    this.subtaskDeadline = subtaskDeadline;
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

  public getNote() {
    return this.note;
  }

  public getId() {
    return this.id;
  }

  public getParentId() {
    return this.taskParentId;
  }

  public getAssignedDate() {
    return this.assignedDate;
  }

  public getSubtaskDeadline() {
    return this.subtaskDeadline;
  }

  public getCopy() {
    const newSubtask = new SubTask(
      this.name,
      this.id,
      this.taskParentId,
      this.assignedDate,
      this.subtaskDeadline,
      this.note,
      this.complete
    );
    return newSubtask;
  }

  public getStatus() {
    return this.complete;
  }

  public getParentComplete() {
    return this.parentComplete;
  }
}
