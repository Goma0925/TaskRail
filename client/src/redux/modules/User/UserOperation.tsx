import axios, { AxiosResponse } from "axios";
import { AppDispatch } from "../../redux-utils/ReduxUtils";
// import LoginEndpoint from "../../api_endpoints/User/LoginEndpoint";
import AuthEndpoint from "../../api_endpoints/User/AuthEndpoints";
import { BaseJson } from "../../../models/ApiModels/BaseJson";
import { UserJson } from "../../../models/ApiModels/UserJson";
import { Login, Logout } from "./UserActions";
import Workspace from "../../../models/ClientModels/Workspace";
import { createWorkspaceOp } from "../TaskData/TaskDataOperations";
import Cookies from "universal-cookie";

export function loginOp() {
    return async (dispatch: AppDispatch) => {
        axios.post(
            AuthEndpoint.login()
        )
        .then((res: AxiosResponse<BaseJson<UserJson>>) => {
            // if returns success, user is logged in successfully.
            // communicate this to App.tsx and go to the main app
            // page. Otherwise, go to "landing page" and call the
            // signup endpoint here.
            const success = res.data.success;
            if (success) {
                console.log("hi from successful loigin op :)");
                dispatch(new Login());
            }
        })
        .catch((err) => {
            console.log("hi from unsuccessful login op :/", err.response);
            dispatch(new Logout());
            dispatch(SignupOp());
        })
    }
}

export function SignupOp() {
    return async (dispatch: AppDispatch) => {
        axios.post(
            AuthEndpoint.signup()
        )
        .then((res: AxiosResponse<BaseJson<UserJson>>) => {
            if (res.data.success) {
                console.log("successful signup op :)");
                const workspace = new Workspace("Your First Workspace","");
                dispatch(createWorkspaceOp(workspace));
                return dispatch(new Login());
            } 
            if (!res.data.success) {
                // something has gone wrong. Alert or print info to console.
                console.log("error in signup op :/");
            }
        }).catch((err: Error)=>{
            return dispatch(new Logout());
        });
    }
}

export function logoutOp() {
    return async (dispatch: AppDispatch) => {
        const cookies = new Cookies();
        cookies.remove('Authorization', {path: '/', domain:".app.localhost"});
        const cookie2 = new Cookies();
        return dispatch(new Logout());
    }
}