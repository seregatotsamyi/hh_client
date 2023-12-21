import React from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import LoginForm from './LoginForm';
import RegistrationForm from "./RegistrationForm";
import {LOGIN_PATH, PROFILE_PATH} from "../../utils/consts";
import {useSelector} from "react-redux";
import {RootState} from '../../store/store';


const Login: React.FC = () => {

    const location = useLocation()
    const isLogin: string = location.pathname

    const isAuth = useSelector((state: RootState) => state.auth.isAuth)

    if (isAuth) {
        return <Navigate to={PROFILE_PATH}/>
    }


    return (
        <main className="main">
            <section className="login">
                <div className="container">
                    <div className="login__inner">

                        <div className="login__box">

                            {isLogin === LOGIN_PATH ? <LoginForm/> : <RegistrationForm/>}

                        </div>

                    </div>
                </div>
            </section>
        </main>
    );
};

export default Login;