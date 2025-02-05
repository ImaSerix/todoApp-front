import {iAuthenticationHandlers} from "./NavigationContainer.tsx";
import MiniProfile from "./MiniProfile.tsx";
import {iAuthState} from "../authentication/authSlice.ts";

interface iNavigationProps{
    auth: iAuthState,
    authenticationHandlers: iAuthenticationHandlers,
}

const Navigation = ({auth, authenticationHandlers}:iNavigationProps) =>{
    return <nav className="app__nav">
        <MiniProfile auth = {auth} authenticationHandlers={authenticationHandlers}/>
    </nav>
}

export default Navigation;