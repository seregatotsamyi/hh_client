import React from 'react';
import { Link } from 'react-router-dom';
import iconStore from "../../media/iconStore";

const Promo = () => {
    return (
        <section className="promo section">

            <div className="container">

                <div className="promo__inner">

                    <div className="promo__title _h1">
                        Привет, путник!
                    </div>

                    <div className="promo__text-inner">

                        <div className="promo__text">
                            <p>
                                Долго добирался? Эхх, ладно, можешь не рассказывать. Я, Аграджаг, может сейчас я выгляжу
                                не очень, но
                                это временно. Кхм-кхм так о чем это я… а, точно! Если ты еще не
                                знаешь, то рассказываю. Ты сейчас находишься там, где искатели, ищут работу себе, а
                                даватели ее
                                дают.
                            </p>
                            <p>
                <span className="promo__text_accent">Все просто - у давателей свои планеты, на которых много работы, а
                  искатели очень хотят найти себя в
                  жизни,
                  поэтому они ищут работу и им, как и давателям, нужен этот сайт.</span> Суть в том, что ты либо ищешь
                                работу,
                                либо
                                ее даешь, вот и все. Удачи!)
                            </p>
                            <p>
                                А, чуть не забыл, чтобы почитать больше об этом месте, нажимай кнопку снизу!
                            </p>
                            <Link className="promo__text-btn btn" to={"/"}>
                                О проекте
                            </Link>
                        </div>

                        <div className="promo__img-wrap">
                            <img className="promo__img" src={iconStore.spaceInvaders} alt="space_invaders"
                                 width="200"
                                 height="200"/>
                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
};

export default Promo;