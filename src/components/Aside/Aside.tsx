import React from 'react';
import {NavLink} from 'react-router-dom';
import {
    CREATE_VACANCY_PATH,
    LOGIN_PATH,
    MAIN_PATH,
    PROFILE_LIST_VACANCY,
    PROFILE_PATH,
    ROLE_EMP
} from '../../utils/consts';
import {removeAuthData} from "../../store/authReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";

const Aside: React.FC = () => {

    const dispatch = useDispatch()
    const role = useSelector((state: RootState) => state.auth.role)

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
                                 to={PROFILE_PATH} end>
                            Ваши данные
                        </NavLink>
                    </li>
                    {
                        role === ROLE_EMP ? (<>
                                <li className="profile__item">
                                    <NavLink
                                        className={({isActive}) => (isActive ? "profile__link _active" : "profile__link")}
                                        to={PROFILE_LIST_VACANCY}>
                                        Список ваших вакансий
                                    </NavLink>
                                </li>
                                <li className="profile__item">
                                    <NavLink
                                        className={({isActive}) => (isActive ? "profile__link _active" : "profile__link")}
                                        to={CREATE_VACANCY_PATH}>
                                        Разместить вакансию
                                    </NavLink>
                                </li>
                            </>
                        ) : ""
                    }

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