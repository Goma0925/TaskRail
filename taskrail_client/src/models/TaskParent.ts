export default class TaskParent {
<<<<<<< HEAD
  private name: string;
  private id: string;
  private taskParentDeadline: Date | undefined;
  private currentFrameSubtaskIds: string[] = [];
  private complete = false;
=======
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
>>>>>>> bda6f6cdad4286dc4514453492185d36f0679835

  public constructor(
    name: string,
    id: string,
    taskParentDeadline?: Date,
    currentFrameSubtaskIds?: string[]
  ) {
    this.name = name;
    this.id = id;
    this.taskParentDeadline = taskParentDeadline;
    this.currentFrameSubtaskIds = currentFrameSubtaskIds
      ? currentFrameSubtaskIds
      : [];
  }
  //setters or modifiers
  public setName(name: string) {
    this.name = name;
  }

<<<<<<< HEAD
  public setId(id: string) {
    this.id = id;
  }
=======
    public setNote(note: string){
        this.note = note;
    }

    public setTaskParentDeadline(taskParentDeadline: Date) {
        this.taskParentDeadline = taskParentDeadline;
    }
>>>>>>> bda6f6cdad4286dc4514453492185d36f0679835

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

<<<<<<< HEAD
  public uncompleteTask() {
    this.complete = false;
  }

  //getters
  public getName() {
    return this.name;
  }
=======
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
>>>>>>> bda6f6cdad4286dc4514453492185d36f0679835

  public getId() {
    return this.id;
  }

<<<<<<< HEAD
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

  public getCopy() {
    const newTaskParent = new TaskParent(
      this.name,
      this.id,
      this.taskParentDeadline,
      this.currentFrameSubtaskIds
    );
    return newTaskParent;
  }

  public status() {
    return this.complete;
  }
}
=======
    public getCopy(){
        const newTaskParent = new TaskParent(this.name, this.id, this.taskParentDeadline, this.currentFrameSubtaskIds, this.note);
        return newTaskParent;
    }
}
>>>>>>> bda6f6cdad4286dc4514453492185d36f0679835
