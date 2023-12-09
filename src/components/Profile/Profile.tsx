import React from 'react';
import {useSelector} from "react-redux";
import { Navigate } from 'react-router-dom';
import {RootState} from "../../store/store";
import { LOGIN_PATH } from '../../utils/consts';
import Aside from "../Aside/Aside";


const Profile: React.FC = () => {


    const isAuth = useSelector((state: RootState) => state.auth.isAuth)
    const role = useSelector((state: RootState) => state.auth.role)



    if (!isAuth){
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
                            <div className="profile__date">
                                <ul className="profile__info">
                                    <li className="profile__info-item">
                                        <span>Имя: </span>
                                        <span>Сергей</span>
                                    </li>
                                    <li className="profile__info-item">
                                        <span>Количество размещенных вакансий: </span>
                                        <span><a href="#">14 </a> </span>
                                    </li>
                                </ul>
                                <ul className="profile__list-form">
                                    <li className="profile__form-item">
                                        <div className="profile__input input">
                                            <div className="input__input-wrap">
                                                <input className="input__input _check" type="checkbox" placeholder=""
                                                       id="check"/>
                                                <label className="input__label _check" htmlFor="check">
                                                    Соглашаюсь на обработку персональных данных
                                                </label>
                                            </div>
                                            <div className="input__error">
                                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur
                                                tempora, impedit corrupti in
                                                adipisci voluptates asperiores commodi quas provident et. Voluptatum
                                                explicabo dolorum natus
                                                laborum quisquam nobis modi vitae esse?
                                            </div>


                                        </div>
                                    </li>
                                </ul>
                                <button className="profile__btn btn" >
                                    Редактировать
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
};

export default Profile;