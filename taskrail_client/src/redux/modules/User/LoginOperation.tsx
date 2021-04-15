import axios, { AxiosResponse } from "axios";
import { AppDispatch } from "../../redux-utils/ReduxUtils";
import LoginEndpoint from "../../api_endpoints/User/LoginEndpoint";
import { BaseJson } from "../../../models/ApiModels/BaseJson";
import { UserJson } from "../../../models/ApiModels/UserJson";

export function loginOperation() {
    return async (dispatch: AppDispatch) => {
        axios.post(
            LoginEndpoint.login()
        )
        .then((res: AxiosResponse<BaseJson<UserJson>>) => {
            
        }

        )
    }
}