import React from "react";
import { GoogleLogout } from 'react-google-login'
import Cookies from 'universal-cookie';

export default function Logout()
{
    // from google cloud
    const clientId =
        '746088176189-r8u8htgpbaivsno9uos7biukb9425rqa.apps.googleusercontent.com';

    const onSuccess = () => {
        /* Delete cookie */
        const cookies = new Cookies();
        cookies.remove('Authorization');
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