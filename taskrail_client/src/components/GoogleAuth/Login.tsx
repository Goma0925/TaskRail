import React from "react";
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import Cookies from 'universal-cookie';

export default function Login()
{
    // from taskrail google cloud
    const clientId =
        '746088176189-r8u8htgpbaivsno9uos7biukb9425rqa.apps.googleusercontent.com';

    const onSuccess = (result: any) => {
        // console.log("Success. Current user: " + result.profileObj.name);
        console.log("Logged in successfully. Welcome, " + result.profileObj.name + ". Your \
        google ID is " + result.googleId + ", your token ID is " + result.tokenId + "\
        , and your access token is " + result.accessToken);

        const cookie = new Cookies(result.tokenId);

        // axios.defaults.baseURL = 'http://localhost:3000/';
        axios.defaults.headers.common = {'Authorization': 'Bearer ${' + cookie + '}'};

        // const findCookie = cookie.getAll();
        // console.log(findCookie.)
    }

    const onFailure = (result: any) => {
        console.log("Login failed. Result: " + result);
        alert("Login failure. Result: " + result);
    }

    return (
        <div>
            <GoogleLogin 
                clientId={clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
                // icon={false}
                // theme='dark'
            />
        </div>
    )
}