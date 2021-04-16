import ReduxAction from "../ReduxAction";

export class SetIsLoggedIn implements ReduxAction {
    static type = "SetIsLoggedIn";
    type: string;
    isLoggedIn: boolean

    constructor(isLoggedIn: boolean) {
        this.type = SetIsLoggedIn.type;
        this.isLoggedIn = isLoggedIn;
    }
    
}