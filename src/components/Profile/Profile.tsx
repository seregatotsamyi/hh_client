import {ConfigProvider} from 'antd';
import ru_RU from 'antd/locale/ru_RU';
import React from 'react';
import {useSelector} from "react-redux";
import {Navigate, Outlet} from 'react-router-dom';
import {RootState} from "../../store/store";
import {LOGIN_PATH} from '../../utils/consts';
import Aside from "../Aside/Aside";


const Profile: React.FC = () => {


    const isAuth = useSelector((state: RootState) => state.auth.isAuth)


    if (!isAuth) {
        return <Navigate to={LOGIN_PATH}/>
    }

    return (
        <>
            <div className="container">
                <div className="main__title _h2">
                    Профиль
                </div>
            </div>


            <section className="profile">
                <div className="container">
                    <div className="profile__inner">

                        <Aside/>

                        <div className="profile__content">
                            <ConfigProvider locale={ru_RU}>
                                <Outlet/>
                            </ConfigProvider>
                        </div>

                    </div>

                </div>
            </section>
        </>
    );
};

export default Profile;