import { GoogleLogout } from 'react-google-login'
import { useDispatch, useSelector } from "react-redux";
import Cookies from 'universal-cookie';
import { logoutOp } from "../../redux/modules/User/UserOperation";
import "./LogoutButton.css";

export default function Logout()
{
    const dispatch = useDispatch();

    // from google cloud
    const clientId =
        '746088176189-r8u8htgpbaivsno9uos7biukb9425rqa.apps.googleusercontent.com';

    const onSuccess = () => {
        dispatch(logoutOp());
        const cookie = new Cookies();
        cookie.get('Authorization');
    }

    return (
        <GoogleLogout
            clientId={clientId}
            onLogoutSuccess={onSuccess}
            // Custom the JSX.
            render={(renderProps)=>{
                return <button className="logout-btn button is-rounded" onClick={renderProps.onClick}>Logout</button>
            }}
        />
    )
}