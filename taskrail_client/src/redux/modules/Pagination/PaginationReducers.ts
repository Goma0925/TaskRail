import Subtask from "../../../models/Subtask";
import ReduxAction from "../ReduxAction";
import FrameFactory from "./TestData/FrameFactory";

export interface PaginationFrame{
    [taskParentId: string]: string[][]; //[[SubtaskID],[SubtaskID]...]
}

interface PaginationState{
    // Holds task data for pagination
    previousFrame?: PaginationFrame;
    currentFrame: PaginationFrame; //Subtask IDs to show for the current week. Each element is an array of subtask ID for the particular day.
    nextFrame?: PaginationFrame;
}

const initialPaginationState: PaginationState= {
    currentFrame: FrameFactory.create(["0", "1"])
}

function weekPaginationReducer(
    state = initialPaginationState,
    action: ReduxAction
  ): PaginationState{
    switch (action.type) {
        // case  SetSomeData.type:
        //     // Process for SetSomeData goes here.
        //     // // To supress the type error, cast action to access its attributes
        //     // const width = (<SetSomeData>action).width;
        //     // // Use immer produce to create a new state object to return.
        //     // return produce(state, (draftState)=>{
        //     //     draftState.height = 200; //Update the draftState.
        //     // });
        default:
          return state
      }
}

export default weekPaginationReducer;