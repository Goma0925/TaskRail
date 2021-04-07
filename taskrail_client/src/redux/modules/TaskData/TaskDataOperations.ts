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
import axios, { AxiosResponse } from "axios";
import { WorkspaceJson } from "../../../models/ApiModels/TaskDataJson";
import { BaseJson } from "../../../models/ApiModels/BaseJson";
import Workspace from "../../../models/ClientModels/Workspace";

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
  return async (dispatch: Dispatch) => {
    const baseURL = "http://localhost:4000"; //Make sure to separate this so we can deploy app on any domain.
    const workspaceId = "606ce37557f04e1e3594dd82";
    axios.get(baseURL + "/users/1/workspaces/"+workspaceId)
        .then((response:AxiosResponse<BaseJson<WorkspaceJson>>)=>{
            console.log("Initial operation called");
            console.log(response.data);
            if (response.data.success){
              const nestedWorkspaceJson: WorkspaceJson = response.data.data;
              const workspace = new Workspace(
                  nestedWorkspaceJson.name,
                  nestedWorkspaceJson._id,
                  nestedWorkspaceJson.taskparents.map(taskParent=>taskParent._id)
              )
              console.log("-----------Workspace Model constructed from JSON response-------------");
              console.log(workspace);
            }
        })
        .catch((err: Error)=>{
            console.log(err);
        })
  }

  // Get workspace
    //Parse taskparents from workspace
  // Get subtasks
  // const workspace: any = axios.get()
  // store.dispatch(new CreateWorkspace())
  // store.dispatch(new CreateSubtask());
}
