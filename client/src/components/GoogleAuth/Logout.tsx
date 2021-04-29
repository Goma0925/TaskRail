import React from "react";
import { GoogleLogout } from 'react-google-login'

export default function Logout()
{
    // from google cloud
    const clientId =
        '746088176189-r8u8htgpbaivsno9uos7biukb9425rqa.apps.googleusercontent.com';

    return (
        <div>
            <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
            />
        </div>
    )
}