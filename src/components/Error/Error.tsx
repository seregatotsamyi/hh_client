import React from 'react';
import {useNavigate } from 'react-router-dom';

const Error:React.FC = () => {

    const navigate = useNavigate();

    return (
        <main className="main _notFound">

            <section className="notFound">

                <div className="planet">
                    <div className="inner">
                        <div className="surface"></div>
                    </div>
                    <div className="ring"></div>
                    <div className="moon"></div>
                    <span className="notFound__span">4</span>
                    <span className="notFound__span">4</span>
                    <div className="stars s1"></div>
                    <div className="stars s2"></div>
                    <div className="stars s3"></div>
                    <div className="stars s4"></div>
                </div>
                <p className="alt">404</p>
                <div className="info">
                    <p className="info__text">Потерялись в космосе?</p>
                    <button className="info__btn btn" onClick={() => navigate(-1)}>
                        Сделать шаг назад
                    </button>
                </div>


            </section>
        </main>
    );
};

export default Error;