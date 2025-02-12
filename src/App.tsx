import './App.css'
import TodoContainer from "./features/todo/todoContainer.tsx";
import {useAppDispatch, useAppSelector} from "./hooks.ts";
import AuthForm from "./features/authentication/authForm.tsx";
import {login, logout} from "./features/authentication/authSlice.ts";
import Navigation from "./features/navigation/Navigation.tsx";

export interface iAuthenticationHandlers{
    login: (email:string, password:string) => void,
    logout: () => void,
}

function App() {

    const auth = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    const authenticationHandlers:iAuthenticationHandlers = {
        login: (email:string, password:string) => {
            dispatch(login({email, password}));
        },
        logout: () => {
            dispatch(logout());
        }
    }

    return (
        <div className="app">
            <Navigation authenticationHandlers={authenticationHandlers} auth={auth}/>
            <div className={'app__content'}>
                {auth.auth? <TodoContainer/>:<>
                    <div className={'authFrom-container'}>
                        <p className={'authForm-container__text'}>Please sign in for adding Todos</p>
                        <AuthForm authenticate={authenticationHandlers.login}/>
                    </div>
                </>}
            </div>
        </div>
    )
}

export default App
