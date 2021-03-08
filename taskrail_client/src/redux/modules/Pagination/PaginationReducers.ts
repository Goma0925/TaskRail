import ReduxAction from "../ReduxAction";
import FrameFactory from "./TestPaginationData/FrameFactory";
import * as Actions from "./PaginationActions";
import produce from "immer";

export interface PaginationFrame{
    //[[SubtaskID],[SubtaskID, SubtaskID]...] Each array is the subtask IDs for the particular day.
    [taskParentId: string]: string[][]; 
}

interface PaginationState{
    previousFrame?: PaginationFrame;
    currentDays: Date[]; //Date objects of the week that is currently selected.
    currentFrame: PaginationFrame; //Subtask IDs to show for the current week. Each element is an array of subtask ID for the particular day.
    nextFrame?: PaginationFrame;
}
const dateStr = (i:number) =>  new Date('2021-3-'.concat((i+1).toString()));

const currentDays = [...Array(7)].map((_, i)=>new Date('2021-3-'.concat((i+1).toString())));
const initialPaginationState: PaginationState = {
    currentDays: currentDays,
    currentFrame: FrameFactory.create(["0", "1"]) //Only for debugging purpose. To be replaced.
}

function weekPaginationReducer(
    state = initialPaginationState,
    action: ReduxAction
  ): PaginationState{
    switch (action.type) {
        case  Actions.SetSubtaskOnDay.type:
            const a = <Actions.SetSubtaskOnDay>action;
            // Calculate how many days after the first day of the current week frame.
            const dayIndex = Math.abs((currentDays[0].getTime() - a.assignedDate.getTime())/ (1000 * 3600 * 24));
            console.log("In weekPaginationReducer: dayIndex", state.currentFrame[a.taskParentId][dayIndex]);
            return produce(state, (draftState)=>{
                draftState.currentFrame[a.taskParentId][dayIndex].push(a.subtaskId);
            });
        default:
          return state
      }
}

export default weekPaginationReducer;