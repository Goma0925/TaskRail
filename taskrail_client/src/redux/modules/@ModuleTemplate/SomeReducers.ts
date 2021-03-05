import { SetSomeData } from "./SomeActions";
import { produce } from "immer";
import ReduxAction from "../ReduxAction";

// Define a shape of the state slice as interface. (Delete this comment when starting)
interface SomeState{
    width: number;
    height: number;
};

// Fill the state slice with the initial data. (Delete this comment when starting)
const initialState:SomeState = {
    width: 200,
    height: 100
};

function someReducer(
    state = initialState,
    action: ReduxAction
  ): SomeState{
    switch (action.type) {
        case  SetSomeData.type:
            // Process for SetSomeData goes here.
            // To supress the type error, cast action to access its attributes
            const width = (<SetSomeData>action).width;//Eg: get width from action
            // Use immer produce to create a new state object to return.
            return produce(state, (draftState)=>{
                //Update the draftState. If you're confused with produce function,
                //find immer library documentation. It basically helps 
                //create an immutable object.
                draftState.height = 200; 
            });
        default:
          return state
      }
}

export default someReducer;