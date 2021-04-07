import { BaseJson } from "./BaseJson";

export interface TaskParentJson{
    _id: string;
    name: string;
    taskParentDeadline: Date;
    note: string;
    complete: boolean;
}

export interface WorkspaceJson{
    name: string;
    _id: string;
    taskparents:TaskParentJson[]
}

export interface SubtaskJson{
    _id: string;
    taskParentId: string;
    name: string;
    scheduledDate: string;
    deadline: string;
    note: string;
    complete: boolean
}
