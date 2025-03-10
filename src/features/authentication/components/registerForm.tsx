import {useState} from "react";

interface iAuthFormProps {
    register: (email: string, username: string, password: string) => void;
}

const RegisterForm = ({register}: iAuthFormProps) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    return <div className="registerForm-container">
        <form className={'registerForm'} onSubmit={(e) => {
            e.preventDefault();
            register(email, username, password)
        }}>
            <p className="registerForm__title">Register form</p>
            <label className="registerForm__label-email">
                Email address:
                <input className={'registerForm__input-email'} type={'email'} value={email}
                       onChange={(e) => setEmail(e.target.value)}/>
            </label>
            <label className="registerForm__label-username">
                Username:
                <input className={'registerForm__input-username'} type={'text'} value={username}
                       onChange={(e) => setUsername(e.target.value)}/>
            </label>
            <label className="registerForm__label-password">
                Password:
                <input className={'registerForm__input-password'} type={'password'} value={password}
                       onChange={(e) => setPassword(e.target.value)}/>
            </label>
            <button className={'registerForm__button-register'}>Register</button>
        </form>
    </div>
}

export default RegisterForm;