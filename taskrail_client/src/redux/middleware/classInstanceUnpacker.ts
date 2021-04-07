import { Middleware } from "redux";

const classInstanceUnpacker: Middleware = () => (next) => (action) => {
    // Since actions created by class raise "not pure object" error,
    // this middleware unpacks a class instance and convert it into a pure object.

    //If a thunk action is passed(Promise), do not pass it to the reducer.
    if (!(action instanceof Promise)){
        next({...action});
    }
};
export default classInstanceUnpacker;