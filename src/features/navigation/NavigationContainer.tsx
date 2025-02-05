import Navigation from "./Navigation.tsx";
import {useAppDispatch, useAppSelector} from "../../hooks.ts";
import {login, logout} from "../authentication/authSlice.ts";


export interface iAuthenticationHandlers{
    login: (email:string, password:string) => void,
    logout: () => void,
}

const NavigationContainer = () => {

    const dispatch = useAppDispatch();

    const auth = useAppSelector((state) => state.auth);

    const authenticationHandlers:iAuthenticationHandlers = {
        login: (email:string, password:string) => {
            dispatch(login({email, password}));
        },
        logout: () => {
            dispatch(logout());
        }
    }

    return <Navigation auth = {auth} authenticationHandlers={authenticationHandlers} />
}

export default NavigationContainer;