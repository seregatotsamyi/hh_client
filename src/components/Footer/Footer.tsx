import React from 'react';
import {Link} from "react-router-dom";
import {MAIN_PATH} from "../../utils/consts";
import LogoImg from "../../media/images/logo.svg";
import IconStore from "../../media/iconStore";
import iconStore from "../../media/iconStore";

const Footer: React.FC = () => {

    const scrollToUp = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return (
        <footer className="footer">

            <div className="footer__wrap">

                <img className="footer__bg" src={IconStore.spaceMoonPink} alt="space-moon"/>

                <div className="container">
                    <div className="footer__inner">

                        <div className="footer__left">
                            <Link className="footer__logo logo" to={MAIN_PATH}>
                                <img className="logo__img" width="250" height="53" src={LogoImg} alt="logo"/>
                            </Link>
                        </div>

                        <ul className="footer__list">
                            <li className="footer__item">
                                <Link className="footer__link underline" to={MAIN_PATH}>
                                    Искателям
                                </Link>
                            </li>
                            <li className="footer__item">
                                <Link className="footer__link underline" to="/emp">
                                    Давателям
                                </Link>
                            </li>
                        </ul>

                        <div className="footer__right">
                            <button className="footer__up js-to-up" onClick={scrollToUp}>
                                <img className="footer__up-img" src={iconStore.spaceTransport} alt="up"
                                     width="50" height="50"/>
                            </button>
                        </div>


                    </div>
                    <div className="footer__copyright">
                        Создатель <Link className="underline" to="https://t.me/seregatot">@seregatot</Link>
                    </div>
                </div>

            </div>

        </footer>
    );
};

export default Footer;