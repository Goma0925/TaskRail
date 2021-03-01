import { createStore, combineReducers, applyMiddleware } from "redux";
import classInstanceUnpacker from "./middleware/classInstanceUnpacker";
import {RailUiReducers} from "./modules/index";

const rootReducer = combineReducers({
    railUi: RailUiReducers, //stateSliceName: reducerName
});


const store =  createStore(rootReducer, applyMiddleware(classInstanceUnpacker));

export default store;

// Export the store signiture for components to use.
export type RootState = ReturnType<typeof rootReducer>;
