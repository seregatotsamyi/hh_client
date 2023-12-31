import React from 'react';
import LogoImg from "../../media/images/logo.svg";
import {Link} from "react-router-dom";
import {LOGIN_PATH, MAIN_PATH, PROFILE_PATH, REGISTRATION_PATH} from '../../utils/consts';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import BurgerSvg from "../Svg/BurgerSvg";
import {showMobMenu} from '../../store/appReducer';
import BurgerSvgClose from "../Svg/BurgerSvgClose";
import {removeAuthData} from "../../store/authReducer";

const Header: React.FC = () => {

    const dispatch = useDispatch()

    const isAuth = useSelector((state: RootState) => state.auth.isAuth)
    const width = useSelector((state: RootState) => state.app.width)
    const isShowMenu = useSelector((state: RootState) => state.app.showMobMenu)

    const toShowMenu = () => {
        dispatch(showMobMenu(!isShowMenu))
    }

    const unLogin = () => {
        dispatch(removeAuthData())
        localStorage.setItem('token', "")
    }

    return (
        <header className="header">

            <div className="container">
                <div className="header__inner">

                    <div className="header__left-wrap">
                        <Link className="header__logo logo" to={MAIN_PATH}>
                            <img className="logo__img" width="50" height="50" src={LogoImg} alt="logo"/>
                        </Link>
                    </div>

                    <div className={isShowMenu ? "header__nav-wrap _active" : "header__nav-wrap"}>
                        <button className="header__burger btn" onClick={toShowMenu}>
                            <BurgerSvgClose/>
                        </button>
                        <nav className="menu">
                            <ul className="menu__list">
                                <li className="menu__item">
                                    <Link className="menu__link" to={MAIN_PATH}>
                                        Соискателям
                                    </Link>
                                </li>
                                <li className="menu__item">
                                    <Link className="menu__link" to="/emp">
                                        Работодателям
                                    </Link>
                                </li>
                                {
                                    width < 769 && isAuth ? (
                                        <li className="menu__item">
                                            <button className="menu__link menu__link_exit" onClick={unLogin}>
                                                Выйти
                                            </button>
                                        </li>
                                    ) : ""
                                }
                            </ul>
                        </nav>
                        <Link className="header__mob-profile" to={PROFILE_PATH}>
                            Личный кабинет
                        </Link>
                    </div>


                    <div className="header__right-wrap">
                        {isAuth && <>
                            <div className="header__auth">
                                <Link className="header__profile btn" to={PROFILE_PATH}>
                                    Личный кабинет
                                </Link>

                            </div>
                            {
                                width <= 1024 ? (
                                    <button className="header__burger btn" onClick={toShowMenu}>
                                        <BurgerSvg/>
                                    </button>
                                ) : null
                            }

                        </>}

                        {!isAuth && <>
                            <div className="header__unAuth">
                                <Link className="header__unAuth-btn btn" to={LOGIN_PATH}>
                                    Войти
                                </Link>
                                <Link className="header__unAuth-btn btn btn_2" to={REGISTRATION_PATH}>
                                    Регистрация
                                </Link>
                            </div>
                        </>}


                    </div>

                </div>
            </div>
        </header>
    );
};

export default Header;