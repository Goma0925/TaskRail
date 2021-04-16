import axios, { AxiosResponse } from "axios";
import { AppDispatch } from "../../redux-utils/ReduxUtils";
// import LoginEndpoint from "../../api_endpoints/User/LoginEndpoint";
import AuthEndpoint from "../../api_endpoints/User/AuthEndpoints";
import { BaseJson } from "../../../models/ApiModels/BaseJson";
import { UserJson } from "../../../models/ApiModels/UserJson";
import { SetIsLoggedIn } from "./LoginAction";

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
                window.alert("hi from login op :)");
                return dispatch(new SetIsLoggedIn(true));
            }
        })
        .catch(() => {
            console.log("hi from lower down in login op :/");
            return dispatch(new SetIsLoggedIn(false));
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
                // Same as above
            } 
            if (!res.data.success) {
                // something has gone wrong. Alert or print info to console.
            }
        })
    }
}