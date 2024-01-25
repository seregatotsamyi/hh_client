import React from 'react';
import {NavLink} from 'react-router-dom';
import {
    CREATE_VACANCY_PATH,
    PROFILE_LIST_VACANCY,
    PROFILE_PATH,
    ROLE_EMP
} from '../../utils/consts';
import {removeAuthData} from "../../store/authReducer";
import {RootState} from "../../store/store";
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const Aside: React.FC = () => {

    const dispatch = useAppDispatch()
    const role = useAppSelector((state: RootState) => state.auth.role)

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
                            Обо мне
                        </NavLink>
                    </li>
                    {
                        role === ROLE_EMP ? (<>
                                <li className="profile__item">
                                    <NavLink
                                        className={({isActive}) => (isActive ? "profile__link _active" : "profile__link")}
                                        to={PROFILE_LIST_VACANCY}>
                                        Список моих вакансий
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