import React from "react";
import { GoogleLogout } from 'react-google-login'
import { useDispatch } from "react-redux";
import Cookies from 'universal-cookie';
import { logoutOp } from "../../redux/modules/User/UserOperation";

export default function Logout()
{
    const dispatch = useDispatch();

    // from google cloud
    const clientId =
        '746088176189-r8u8htgpbaivsno9uos7biukb9425rqa.apps.googleusercontent.com';

    const onSuccess = () => {
        dispatch(logoutOp());
    }

    return (
        <div>
            <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
            />
        </div>
    )
}