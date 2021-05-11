import React from "react";
import Login from "../../components/GoogleAuth/LoginButton";

export default function LoginPage() {


    return (
        <div className="loginContainer" style={{height:"100vh", display:"flex", 
                                                justifyContent:"center", alignItems:"center"}}>
            <div className="loginButton">
                <Login/>
            </div>
        </div>
    )
}