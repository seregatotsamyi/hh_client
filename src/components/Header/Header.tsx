import React from 'react';
import LogoImg from "../../media/images/logo.svg";
import {Link} from "react-router-dom";
import {
    LOGIN_PATH,
    MAIN_PATH,
    PROFILE_PATH,
    REGISTRATION_PATH,
    typeAppDesktop,
    typeAppMobile
} from '../../utils/consts';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import BurgerSvg from "../Svg/BurgerSvg";
import {showMobMenu} from '../../store/appReducer';
import BurgerSvgClose from "../Svg/BurgerSvgClose";
import {removeAuthData} from "../../store/authReducer";

const Header: React.FC = () => {

    const dispatch = useDispatch()

    const isAuth = useSelector((state: RootState) => state.auth.isAuth)
    const typeApp = useSelector((state: RootState) => state.app.typeApp)
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

            <div className="header__top">
                <div className="container">
                    <ul className="header__top-list">
                        <li className="header__top-item">
                            <Link className="header__top-link underline" to={MAIN_PATH}>
                                Искателям
                            </Link>
                        </li>
                        <li className="header__top-item">
                            <Link className="header__top-link underline" to={"/"}>
                                Давателям
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="container">
                <div className="header__inner">

                    <div className="header__left-wrap">
                        <Link className="header__logo logo" to={MAIN_PATH}>
                            <img className="logo__img"  width="250" height="53" src={LogoImg} alt="logo"/>
                        </Link>
                    </div>

                    <div className={isShowMenu ? "header__nav-wrap _active" : "header__nav-wrap"}>
                        <button className="header__burger btn" onClick={toShowMenu}>
                            <BurgerSvgClose/>
                        </button>
                        <nav className="menu">
                            <ul className="menu__list">
                                <li className="menu__item">
                                    <Link className="menu__link" to={""}>
                                        О проекте
                                    </Link>
                                </li>
                                {
                                    typeApp === typeAppMobile && isAuth ? (
                                        <li className="menu__item">
                                            <button className="menu__link menu__link_exit" onClick={unLogin}>
                                                Выйти
                                            </button>
                                        </li>
                                    ) : ""
                                }
                            </ul>
                        </nav>

                        <div className="header__mob-profile-wrap">
                            {
                                isAuth ? <Link className="header__mob-profile btn" to={PROFILE_PATH}>
                                    Личный кабинет
                                </Link> : <>
                                    <Link className="header__mob-profile btn" to={LOGIN_PATH}>
                                        Войти
                                    </Link>
                                    <Link className="header__mob-profile btn btn_2" to={REGISTRATION_PATH}>
                                        Регистрация
                                    </Link>
                                </>
                            }

                        </div>

                    </div>


                    <div className="header__right-wrap">
                        {isAuth &&
                            <div className="header__auth">
                                <Link className="header__profile btn" to={PROFILE_PATH}>
                                    Личный кабинет
                                </Link>

                            </div>
                        }

                        {!isAuth && typeApp === typeAppDesktop && <>
                            <div className="header__unAuth">
                                <Link className="header__unAuth-btn btn" to={LOGIN_PATH}>
                                    Войти
                                </Link>
                                <Link className="header__unAuth-btn btn btn_2" to={REGISTRATION_PATH}>
                                    Регистрация
                                </Link>
                            </div>
                        </>}

                        {
                            typeApp === typeAppMobile ? (
                                <button className="header__burger btn" onClick={toShowMenu}>
                                    <BurgerSvg/>
                                </button>
                            ) : null
                        }


                    </div>

                </div>
            </div>
        </header>
    );
};

export default Header;