import { Middleware } from "redux";

const classInstanceUnpacker: Middleware = () => (next) => (action) => {
    // Since actions created by class raise "not pure object" error,
    // this middleware unpacks a class instance and convert it into a pure object.
    // if (action instanceof Promise){
    //     //If a thunk action is passed, dispatch as it is.
    //     next(action);
    // };

    return next({...action});
};
export default classInstanceUnpacker;