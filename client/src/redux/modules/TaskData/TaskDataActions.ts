import Subtask from "../../../models/ClientModels/Subtask";
import TaskParent from "../../../models/ClientModels/TaskParent";
import Workspace from "../../../models/ClientModels/Workspace";
import ReduxAction from "../ReduxAction";

export class AddSubtask implements ReduxAction {
  // This method needs to be overwritten once we have an API.
  static type = "AddSubtask";
  type: string;
  subtask: Subtask;
  constructor(subtask: Subtask) {
    this.type = AddSubtask.type;
    this.subtask = subtask;
  }
}

export class DeleteSubtask implements ReduxAction {
  static type = "DeleteSubtask";
  type: string;
  subtaskId: string;
  constructor(subtaskId: string) {
    this.type = DeleteSubtask.type;
    this.subtaskId = subtaskId;
  }
}
export class UpdateSubtask implements ReduxAction {
  static type = "UpdateSubtask";
  type: string;
  subtask: Subtask;
  constructor(subtask: Subtask) {
    this.subtask = subtask;
    this.type = UpdateSubtask.type;
  }
}
export class ClearSubtasks implements ReduxAction {
  static type = "ClearSubtasks";
  type: string;
  constructor() {
    this.type = ClearSubtasks.type;
  }
}
export class AddTaskParent implements ReduxAction {
  static type = "AddTaskParent";
  type: string;
  taskParent: TaskParent;
  constructor(taskParent: TaskParent) {
    this.type = AddTaskParent.type;
    this.taskParent = taskParent;
  }
}
export class DeleteTaskParent implements ReduxAction {
  static type = "DeleteTaskParent";
  type: string;
  taskParentId: string;
  constructor(taskParentId: string) {
    this.type = DeleteTaskParent.type;
    this.taskParentId = taskParentId;
  }
}
export class UpdateTaskParent implements ReduxAction {
  static type = "UpdateTaskParent";
  type: string;
  taskParent: TaskParent;
  constructor(taskParent: TaskParent) {
    this.type = UpdateTaskParent.type;
    this.taskParent = taskParent;
  }
}

export class ClearTaskParents implements ReduxAction {
  static type = "ClearTaskParents";
  type: string;
  constructor() {
    this.type = ClearTaskParents.type;
  }
}

export class SetCurrentWorkspace implements ReduxAction {
  static type = "SetWorkspace";
  type: string;
  workspace: Workspace;
  constructor(workspace: Workspace) {
    this.type = SetCurrentWorkspace.type;
    this.workspace = workspace;
  }
}

export class UnsetCurrentWorkspace implements ReduxAction {
  static type = "UnsetWorkspace";
  type: string;
  workspace: Workspace;
  constructor(workspace: Workspace) {
    this.type = UnsetCurrentWorkspace.type;
    this.workspace = workspace;
  }
}

export class AddWorkspace implements ReduxAction {
  static type = "AddWorkspace";
  type: string;
  workspace: Workspace;
  constructor(workspace: Workspace) {
    this.type = AddWorkspace.type;
    this.workspace = workspace;
  }
}

export class DeleteWorkspace implements ReduxAction {
  static type = "DeleteWorkspace";
  type: string;
  workspaceId: string;
  constructor(workspaceId: string) {
    this.type = DeleteWorkspace.type;
    this.workspaceId = workspaceId;
  }
}

export class UpdateWorkspace implements ReduxAction {
  static type = "UpdateWorkspace";
  type: string;
  workspace: Workspace;
  constructor(workspace: Workspace) {
    this.type = UpdateWorkspace.type;
    this.workspace = workspace;
  }
}

export class ClearWorkspaces implements ReduxAction {
  static type = "ClearWorkspaces";
  type: string;
  constructor() {
    this.type = ClearWorkspaces.type;
  }
}
