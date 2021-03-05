import { createStore, combineReducers, applyMiddleware } from "redux";
import classInstanceUnpacker from "./middleware/classInstanceUnpacker";
import {PaginationReducers, RailUiReducers, TaskDataReducers} from "./modules/index";
import { createLogger } from 'redux-logger';

const rootReducer = combineReducers({
    railUi: RailUiReducers, //stateSliceName: reducerName
    taskData: TaskDataReducers,
    weekPagination: PaginationReducers
});

const logger = createLogger();

const store =  createStore(rootReducer, applyMiddleware(classInstanceUnpacker, logger));

export default store;

// Export the store signiture for components to use.
export type RootState = ReturnType<typeof rootReducer>;
