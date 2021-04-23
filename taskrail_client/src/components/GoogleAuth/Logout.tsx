import React from "react";
import { GoogleLogout } from 'react-google-login'
import { useDispatch, useSelector } from "react-redux";
import Cookies from 'universal-cookie';
import { SetContentLoaded } from "../../redux/modules/RailUi/RailUiActions";
import { logoutOp } from "../../redux/modules/User/UserOperation";
import { RootState } from "../../redux/store";

export default function Logout()
{
    const dispatch = useDispatch();

    // from google cloud
    const clientId =
        '746088176189-r8u8htgpbaivsno9uos7biukb9425rqa.apps.googleusercontent.com';

    const onSuccess = () => {
        console.log("on success");
        dispatch(logoutOp());
        const cookie = new Cookies();
        cookie.get('Authorization');
        console.log(cookie);

        // const contentLoaded = useSelector(
        //     (state: RootState) => state.railUi.contentLoaded
        //   );

        dispatch(new SetContentLoaded(false));
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