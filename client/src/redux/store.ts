import { createStore, combineReducers, applyMiddleware, CombinedState, Reducer } from "redux";
import classInstanceUnpacker from "./middleware/classInstanceUnpacker";
import {
  PaginationReducers,
  RailUiReducers,
  TaskDataReducers,
  LoginReducers
} from "./modules/index";
import * as UserActions from "./modules/User/UserActions";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import ReduxAction from "./modules/ReduxAction";

const appReducer = combineReducers({
  railUi: RailUiReducers, //stateSliceName: reducerName
  pagination: PaginationReducers,
  taskData: TaskDataReducers,
  user: LoginReducers,
});
type AppReducerType = typeof appReducer;
// Export the store signiture for components to use.
export type RootState = ReturnType<typeof appReducer>;

const rootReducer = (state: RootState, action: ReduxAction)=>{
  let resetState = false;
  // If logging out, reset the state to initial state.
  if (action.type == UserActions.Logout.type){
      resetState = true;
      console.log("Logout from rootReducer");
      
  }  
  return appReducer(resetState?undefined:state, action);
}

const logger = createLogger();

const store = createStore(
  <AppReducerType>rootReducer,
  //Always make sure classInstanceUnpacker comes at last when using class-based action.
  applyMiddleware(thunk, classInstanceUnpacker, logger) 
);

export default store;

// Cache the initial state for resetting on logout

