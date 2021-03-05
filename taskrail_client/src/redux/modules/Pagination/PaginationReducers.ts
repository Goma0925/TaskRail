import ReduxAction from "../ReduxAction";
import FrameFactory from "./TestPaginationData/FrameFactory";

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