import './App.css'
import {useAppDispatch, useAppSelector} from "./hooks.ts";
import AuthForm from "./features/authentication/components/authForm.tsx";
import {
    register,
    login,
    logout,
    renewToken,
    selectUsername,
    selectAuthLoading
} from "./features/authentication/redux/authSlice.ts";
import Navigation from "./features/navigation/Navigation.tsx";
import {useEffect} from "react";
import RegisterForm from "./features/authentication/components/registerForm.js";
import './features/authentication/auth.scss';
import TodoContainer from "./features/todo/components/todoContainer.js";

export interface iAuthenticationHandlers{
    login: (email:string, password:string) => void,
    logout: () => void,
    register: (email:string, username:string ,password:string) => void,
}

function App() {

    const username = useAppSelector(selectUsername);
    const dispatch = useAppDispatch();
    const authLoading = useAppSelector(selectAuthLoading);

    useEffect(() => {
        if (authLoading === 'idle') dispatch(renewToken())
    });

    const authenticationHandlers:iAuthenticationHandlers = {
        login: (email:string, password:string) => {
            dispatch(login({email, password}));
        },
        logout: () => {
            dispatch(logout());
        },
        register: (email:string, username:string ,password:string) => {
            dispatch(register({email, username, password}));
        },
    }
    if (authLoading === 'pending' || authLoading === 'idle') return <div className="app"> Loading...</div>

    return (
        <div className="app">
            <Navigation logoutHandler={authenticationHandlers.logout} username={username}/>
            <div className={'app__content'}>
                {username? <TodoContainer/> :<>
                    <div className={'authenticationForms'}>
                        <p className={'authenticationForms__text'}>Please log in or register for adding Todos</p>
                        <AuthForm authenticate={authenticationHandlers.login}/>
                        <RegisterForm register={authenticationHandlers.register}/>
                    </div>
                </>}
            </div>
        </div>
    )
}

export default App
