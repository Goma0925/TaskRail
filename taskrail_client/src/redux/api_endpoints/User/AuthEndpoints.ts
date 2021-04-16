import baseUrl from "../BaseUrl";

const POST = {
    login: () => baseUrl + "/auth/login",
    signup: () => baseUrl + "/auth/signup"
}

export default POST;