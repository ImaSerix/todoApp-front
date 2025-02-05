import {iAuthState} from "../authentication/authSlice.ts";
import {iAuthenticationHandlers} from "./NavigationContainer.tsx";
import AuthForm from "../authentication/authForm.tsx";


interface iMiniProfileProps{
    auth: iAuthState,
    authenticationHandlers: iAuthenticationHandlers,
}

const MiniProfile = ({ auth, authenticationHandlers}:iMiniProfileProps) => {

    // If not authenticated
    if (!auth.auth) return <div className="mini-profile">
        <p className={'mini-profile__username'}>Guest</p>
        <span className={'mini-profile__toggle'}/>
        <AuthForm authenticate={authenticationHandlers.login}/>
    </div>

    return <div className="mini-profile">
        <p className={'mini-profile__username'}>{auth.user!.username}</p>
        <button className={'mini-profile__button-logout'} onClick={authenticationHandlers.logout}>Logout</button>
    </div>
}

export default MiniProfile;