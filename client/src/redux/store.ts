import { createStore, combineReducers, applyMiddleware } from "redux";
import classInstanceUnpacker from "./middleware/classInstanceUnpacker";
import {
  PaginationReducers,
  RailUiReducers,
  TaskDataReducers,
  LoginReducers
} from "./modules/index";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  railUi: RailUiReducers, //stateSliceName: reducerName
  pagination: PaginationReducers,
  taskData: TaskDataReducers,
  user: LoginReducers,
});

const logger = createLogger();

const store = createStore(
  rootReducer,
  //Always make sure classInstanceUnpacker comes at last when using class-based action.
  applyMiddleware(thunk, classInstanceUnpacker, logger) 
);

export default store;

// Export the store signiture for components to use.
export type RootState = ReturnType<typeof rootReducer>;
