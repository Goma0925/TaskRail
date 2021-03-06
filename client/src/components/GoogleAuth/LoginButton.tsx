import React from "react";
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useDispatch } from "react-redux";
import { loginOp } from "../../redux/modules/User/UserOperation"

export default function Login()
{
    const dispatch = useDispatch();
    
    // from taskrail google cloud
    const clientId =
        '746088176189-r8u8htgpbaivsno9uos7biukb9425rqa.apps.googleusercontent.com';

    const onSuccess = (result: any) => {
        console.log("Logged in successfully. Welcome, " + result.profileObj.name + ". Your \
        google ID is " + result.googleId + ", your token ID is " + result.tokenId + "\
        , and your access token is " + result.accessToken);

        const cookie = new Cookies();
        cookie.set('Authorization', 'Bearer ' + result.tokenId, { path: '/' , domain: '.app.localhost'});

        axios.defaults.headers.common = {'Authorization': 'Bearer ' + result.tokenId};

        const findCookie = cookie.getAll();
        console.log("All cookies upon login:");
        console.log(findCookie)
        for (var i = 0; i < findCookie.length; i++) {
            console.log("hi");
            console.log(findCookie[i]);
        }

        dispatch(loginOp());
    }

    const onFailure = (result: any) => {
        console.log("Login failed. Result: " + result);
    }

    return (
        <div>
            <GoogleLogin 
                clientId={clientId}
                buttonText="Login with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    )
}
