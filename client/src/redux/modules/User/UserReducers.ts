import produce from "immer";
import * as UserActions from "../User/UserActions";
import ReduxAction from "../ReduxAction";

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
        case UserActions.Login.type:
            return produce(state, draftState => {
                draftState.isLoggedIn = true;
            });
        case UserActions.Logout.type:
            return produce(state, draftState => {
                draftState.isLoggedIn = false;
            });
        default:
            return state;
    }
}

export default LoginReducer;