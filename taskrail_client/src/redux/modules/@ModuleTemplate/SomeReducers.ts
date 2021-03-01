import SomeActionTypes from "./SomeActions";
import { SetSomeData } from "./SomeActions";
import { produce } from "immer";

// Define a shape of the state slice. Make sure to export to use in components.
export interface SomeState{
    width: number;
    height: number;
};

const initialState:SomeState = {
    width: 200,
    height: 100
};

function someReducer(
    state = initialState,
    action: SomeActionTypes
  ): SomeState{
    switch (action.type) {
        case  SetSomeData.type:
            // Process for SetSomeData goes here.

            // Use immer produce to create a new state object to return.
            return produce(state, (draftState)=>{
                draftState.height = 200; //Update the draftState.
            });
        default:
          return state
      }
}

export default someReducer;