import React from 'react';
import {NavLink} from 'react-router-dom';
import {LOGIN_PATH, MAIN_PATH, PROFILE_PATH} from '../../utils/consts';
import {removeAuthData} from "../../store/authReducer";
import {useDispatch} from "react-redux";

const Aside: React.FC = () => {

    const dispatch = useDispatch()

    const unLogin = () => {
        dispatch(removeAuthData())
        localStorage.setItem('token', "")
    }

    return (
        <>

            <aside className="profile__aside">
                <ul className="profile__list">
                    <li className="profile__item">
                        <NavLink className={({isActive}) => (isActive ? "profile__link _active" : "profile__link")}
                                 to={PROFILE_PATH}>
                            Ваши данные
                        </NavLink>
                    </li>
                    <li className="profile__item">
                        <NavLink className={({isActive}) => (isActive ? "profile__link _active" : "profile__link")}
                                 to={MAIN_PATH}>
                            Список ваших вакансий
                        </NavLink>
                    </li>
                    <li className="profile__item">
                        <NavLink className={({isActive}) => (isActive ? "profile__link _active" : "profile__link")}
                                 to={LOGIN_PATH}>
                            Разместить вакансию
                        </NavLink>
                    </li>
                    <li className="profile__item">
                        <button className="profile__link" type={'button'} onClick={unLogin}>
                            Выйти
                        </button>
                    </li>
                </ul>
            </aside>

        </>
    );
};

export default Aside;