import {useState} from "react";


interface iAuthFormProps {
    authenticate: (email:string, password:string) => void;
}

const AuthForm = ({ authenticate }:iAuthFormProps) =>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return <div className="auth-form">
        <input className={'auth-form__input-email'} type={'email'} value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input className={'auth-form__input-password'} type={'password'} value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button className={'auth-form__button-login'} onClick={()=> authenticate(email, password)}>Login</button>
    </div>
}

export default AuthForm;