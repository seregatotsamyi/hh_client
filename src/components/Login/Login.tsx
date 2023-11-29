import React from 'react';
import {Navigate, useLocation } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegistrationForm from "./RegistrationForm";
import {LOGIN_PATH} from "../../utils/consts";
import {useDispatch, useSelector} from "react-redux";
import { RootState } from '../../store/store';
import {setAuth} from "../../store/authReducer";



const Login: React.FC = () => {

    const location = useLocation()
    const isLogin:string = location.pathname

    const isAuth = useSelector((state: RootState) => state.auth.isAuth)
    console.log(isAuth)



    if (isAuth) {
        return <Navigate to="/"/>
    }

    return (
        <section className="login">
            <div className="container">
                <div className="login__inner">

                    <div className="login__box">

                        {isLogin === LOGIN_PATH ? <LoginForm/> : <RegistrationForm/>}

                    </div>

                </div>
            </div>
        </section>
    );
};

export default Login;