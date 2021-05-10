import { GoogleLogout } from 'react-google-login'
import { useDispatch, useSelector } from "react-redux";
import Cookies from 'universal-cookie';
import { logoutOp } from "../../redux/modules/User/UserOperation";


export default function Logout()
{
    const dispatch = useDispatch();

    // from google cloud
    const clientId =
        '746088176189-r8u8htgpbaivsno9uos7biukb9425rqa.apps.googleusercontent.com';

    const onSuccess = () => {
        console.log("on success");
        dispatch(logoutOp());
        console.log("just dispatched logout op");
        const cookie = new Cookies();
        cookie.get('Authorization');
        console.log(cookie);
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