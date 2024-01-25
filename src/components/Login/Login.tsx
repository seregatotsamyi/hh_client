import React from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import LoginForm from './LoginForm';
import RegistrationForm from "./RegistrationForm";
import {LOGIN_PATH, PROFILE_PATH} from "../../utils/consts";
import {RootState} from '../../store/store';
import IconStore from "../../media/iconStore";
import { useAppSelector } from '../../store/hooks';



const Login: React.FC = () => {

    const location = useLocation()
    const isLogin: string = location.pathname

    const isAuth = useAppSelector((state: RootState) => state.auth.isAuth)

    if (isAuth) {
        return <Navigate to={PROFILE_PATH}/>
    }

    return (
        <main className="main">
            <section className="login">

                <img className="login__decor _1" src={IconStore.spaceMoon} alt="decor" width="200"
                     height="200"/>
                <img className="login__decor _2" src={IconStore.spaceRover} alt="decor" width="150"
                     height="150"/>
                <img className="login__decor _3" src={IconStore.moonFullMoonBlue} alt="decor"
                     width="150" height="150"/>

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