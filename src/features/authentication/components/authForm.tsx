import {useState} from "react";


interface iAuthFormProps {
    authenticate: (email: string, password: string) => void;
}

const AuthForm = ({authenticate}: iAuthFormProps) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return <div className="authForm-container">
        <p className="authForm__title">Log in form</p>
        <form className="authForm" onSubmit={(e) => {
            e.preventDefault();
            authenticate(email, password);
        }}>
            <label className="authForm__label-email">
                Email address:
                <input className={'authForm__input-email'} type={'email'} value={email}
                       onChange={(e) => setEmail(e.target.value)}/>
            </label>
            <label className="authForm__label-password">
                Password:
                <input className={'authForm__input-password'} type={'password'} value={password}
                       onChange={(e) => setPassword(e.target.value)}/>
            </label>
            <button className={'authForm__button-login'}>Login</button>
        </form>
    </div>
}

export default AuthForm;