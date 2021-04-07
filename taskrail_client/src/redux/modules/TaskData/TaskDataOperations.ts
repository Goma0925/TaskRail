import TaskParent from "../../../models/ClientModels/TaskParent";
import { Dispatch } from "redux";
import {
  AddTaskParent,
  DeleteSubtask,
  DeleteTaskParent,
  UpdateTaskParent,
} from "./TaskDataActions";
import store from "../../store";
import { AddSubtask } from "./TaskDataActions";
import SubTask from "../../../models/ClientModels/Subtask";
import thunk from "redux-thunk";

export function CreateSubtask(){ // CreateSubtask is an operation/action that returns a function.
    return async (dispatch: Dispatch) => { //Uses the dispatch method function to run an action asynchronously.
        try { // Try the following code
            
        } catch(e){ //Catch the error
            console.error(e);
        }
    }
}

export function createSubtaskOp(
  subtaskName: string,
  taskParentId: string,
  assignedDate: Date
) {
  // This method will be overwritten once we have API.
  const subtaskId = AddSubtask.idCount.toString();

  // POST request to create a subtask here
  const subtask = new SubTask(
    subtaskName,
    AddSubtask.idCount.toString(),
    taskParentId,
    assignedDate,
    assignedDate
  );

  // ToDo: Rename CreateSubtask
  store.dispatch(new AddSubtask(subtask));
  return subtask;
}

export function deleteSubtaskOp(subtaskId: string) {
  store.dispatch(new DeleteSubtask(subtaskId));
}

export function createTaskParentOp(title: string) {
  //Increment the ID. Only for testing purpose.
  AddTaskParent.idCount += 1;
  // This method will be overwritten once we have API.
  const subtaskId = AddTaskParent.idCount.toString();

  // POST request to create here

  const taskParent = new TaskParent(
    title,
    AddTaskParent.idCount.toString(),
    new Date()
  );

  // ToDo: Rename AddTaskParent
  store.dispatch(new AddTaskParent(taskParent));
}

export function deleteTaskParentOp(taskParentId: string) {
  store.dispatch(new DeleteTaskParent(taskParentId));
}

export function updateTaskParentOp(taskParent: TaskParent) {
  store.dispatch(new UpdateTaskParent(taskParent));
}

export async function loadAllContentOp(){
  // Get workspace
    //Parse taskparents from workspace
  // Get subtasks
  // const workspace: any = axios.get()
  // store.dispatch(new CreateWorkspace())
  // store.dispatch(new CreateSubtask());
}