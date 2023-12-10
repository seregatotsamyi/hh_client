import React from 'react';
import {Link} from "react-router-dom";
import {MAIN_PATH} from "../../utils/consts";
import LogoImg from "../../media/images/logo.svg";
import IconStore from "../../media/iconStore";

const Footer: React.FC = () => {

    const scrollToUp = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__inner">

                    <div className="footer__left">
                        <Link className="footer__logo logo" to={MAIN_PATH}>
                            <img className="logo__img" width="50" height="50" src={LogoImg} alt="logo"/>
                        </Link>
                    </div>

                    <ul className="footer__list">
                        <li className="footer__item">
                            <a className="footer__link" href="#">
                                Соискателям
                            </a>
                        </li>
                        <li className="footer__item">
                            <Link className="footer__link" to="/emp">
                                Работдателям
                            </Link>
                        </li>
                    </ul>

                    <button className="footer__up js-to-up" onClick={scrollToUp}>
                        <img className="footer__up-img" src={IconStore.ArrowTopImg} alt="up"/>
                    </button>

                </div>
                <div className="footer__copyright">
                    Разработано <Link to="https://t.me/seregatot">@seregatot</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;