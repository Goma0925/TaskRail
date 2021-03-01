import { Middleware } from "redux";

const classInstanceUnpacker: Middleware = () => (next) => (action) => {
    // Since actions created by class raise "not pure object" error,
    // this middleware unpacks a class instance and convert it into a pure object.
    return next({...action});
};
export default classInstanceUnpacker;