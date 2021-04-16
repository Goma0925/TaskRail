import produce from "immer";
import { DRAFT_STATE } from "immer/dist/internal";
import { UserJson } from "../../../models/ApiModels/UserJson"
import ReduxAction from "../ReduxAction";
// import * as LoginActions from "../User/LoginAction";
import { SetIsLoggedIn } from "../User/LoginAction";

interface UserState {
    isLoggedIn: boolean | null,
}

const initialUserState: UserState  = {
    isLoggedIn: null,
}

function LoginReducer(
    state= initialUserState, 
    action: ReduxAction) 
    {
    switch (action.type) {
        case SetIsLoggedIn.type:
            return produce(state, draftState => {
                draftState.isLoggedIn = (<SetIsLoggedIn> action).isLoggedIn;
            })
        default:
            console.log(action.type);
            return state;
    }
}

export default LoginReducer;