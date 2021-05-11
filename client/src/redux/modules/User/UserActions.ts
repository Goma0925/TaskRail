import ReduxAction from "../ReduxAction";

export class Login implements ReduxAction {
    static type = "Login";
    type: string;
    constructor() {
        this.type = Login.type;
    }   
}

export class Logout implements ReduxAction {
    static type = "Logout";
    type: string;
    constructor() {
        this.type = Logout.type;
    }   
}