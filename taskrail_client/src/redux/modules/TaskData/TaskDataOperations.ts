import TaskParent from "../../../models/ClientModels/TaskParent";
import { Dispatch } from "redux";
import {
  AddTaskParent,
  DeleteSubtask,
  DeleteTaskParent,
  SetCurrentWorkspace,
  UpdateTaskParent,
} from "./TaskDataActions";
import store, { RootState } from "../../store";
import { AddSubtask } from "./TaskDataActions";
import SubTask from "../../../models/ClientModels/Subtask";
import axios, { AxiosResponse } from "axios";
import { SubtaskJson, TaskParentJson, WorkspaceJson } from "../../../models/ApiModels/TaskDataJson";
import { BaseJson } from "../../../models/ApiModels/BaseJson";
import Workspace from "../../../models/ClientModels/Workspace";
import { AppDispatch } from "../../redux-utils/ReduxUtils";
import { getDateStr, LocalDateParse } from "../../../helpers/DateTime";
import { SetContentLoaded } from "../RailUi/RailUiActions";
import * as TaskDataEndpoints from "../../api_endpoints/TaskData";

export function createSubtaskOp(
  subtaskName: string,
  taskParentId: string,
  assignedDate: Date
) {
  return async (dispatch: AppDispatch)=>{    
    const workspaceId = store.getState().taskData.workspace.currentWorkspace?.getId();
    if (workspaceId){
      // POST request to create a subtask here
      const subtask: SubtaskJson = {
        _id: "",
        name: subtaskName,
        taskParentId: taskParentId,
        scheduledDate: getDateStr(assignedDate),
        deadline: null,
        note: "",
        complete: false,
      };
      axios.post(TaskDataEndpoints.POST.sutasks.createByHierarchy(workspaceId, taskParentId), subtask)
        .then((res: AxiosResponse<BaseJson<SubtaskJson>>)=>{
          const subtaskJson = res.data.data;
          const createdSubtask = new SubTask(
            subtaskJson.name,
            subtaskJson._id,
            subtaskJson.taskParentId,
            LocalDateParse(subtaskJson.scheduledDate),
            subtaskJson.deadline?LocalDateParse(subtaskJson.deadline):undefined,
            subtaskJson.note,
            subtaskJson.complete,
          );
          //Dispatch a new subtask to the redux store.
          dispatch(new AddSubtask(createdSubtask));
        }, )
    }else{
      throw Error("Workspace does not exists");
    }
  }
}

export function deleteSubtaskOp(subtaskId: string) {
  store.dispatch(new DeleteSubtask(subtaskId));
}

export function createTaskParentOp(title: string) {
  return async (dispatch: AppDispatch)=>{
    window.alert("hi");
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
}

export function deleteTaskParentOp(taskParentId: string) {
  store.dispatch(new DeleteTaskParent(taskParentId));
}

export function updateTaskParentOp(taskParent: TaskParent) {
  store.dispatch(new UpdateTaskParent(taskParent));
}

export function loadAllContentOp(workspaceId: string){  
  return async (dispatch: AppDispatch) => {
    var workspace: Workspace|undefined = undefined;
    var taskParents:TaskParent[] = [];
    await axios.get(TaskDataEndpoints.GET.workspaces.byId(workspaceId))
        .then((res:AxiosResponse<BaseJson<WorkspaceJson>>)=>{
          if (res.data.success){
            const nestedWorkspaceJson: WorkspaceJson = res.data.data;
            
            workspace = new Workspace(
                nestedWorkspaceJson.name,
                nestedWorkspaceJson._id,
                [], //Leave the ID blank because AddTaskParent action will add the ID automatically
            )
            // Set the current workspace instance.
            dispatch(new SetCurrentWorkspace(workspace));
            
            taskParents = nestedWorkspaceJson.taskparents.map((taskParentJson: TaskParentJson)=>{    
              const taskParent = new TaskParent(
                taskParentJson.name,
                taskParentJson._id,
                taskParentJson.taskParentDeadline!=null?LocalDateParse(taskParentJson.taskParentDeadline):undefined,
                [],
                taskParentJson.complete
              );
              // Dispatch task parent to the redux store.
              dispatch(new AddTaskParent(taskParent));
              // Return to the array to call the subtask API later.
              return taskParent;
            });
            
          }
        })
        .catch((err: Error)=>{
            throw err;
        });

    // Query for subtasks
    for (let i=0; i<taskParents.length; i++){
      const subtaskIds:string[] = []
      const taskParent = taskParents[i]      
      await axios.get(TaskDataEndpoints.GET.subtasks.allByHierarchy(workspaceId, taskParent.getId()))
        .then((res:AxiosResponse<BaseJson<SubtaskJson[]>>)=>{
          if (res.data.success){
            // For-loop all the subtasks and construct Subtask instances.
            res.data.data.map((subtaskJson:SubtaskJson)=>{     
              // Collect the subtask IDs to an array to set them to parent.
              subtaskIds.push(subtaskJson._id);
              //Create subtask instance                    
              const subtask = new SubTask(
                subtaskJson.name,
                subtaskJson._id,
                subtaskJson.taskParentId,
                LocalDateParse(subtaskJson.scheduledDate),
                subtaskJson.deadline?LocalDateParse(subtaskJson.deadline):undefined,
                subtaskJson.note,
                subtaskJson.complete,
              );
              //Dispatch subtask to the redux store.
              dispatch(new AddSubtask(subtask));
            });
          }
        }).catch((err: Error)=>{
          throw err;
        })
    }
    // Dispatch SetContentLoaded to stop the loading view.
    dispatch(new SetContentLoaded(true));
  }
}
