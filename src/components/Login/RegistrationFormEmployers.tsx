import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {LOGIN_PATH} from "../../utils/consts";


const RegistrationFormEmployers = () => {


    return (
        <form>
            <ul className="login__grid">
                <li className="login__row">
                    <div className="login__input input">
                        <label className="input__label" htmlFor="name">
                            Имя (название)
                        </label>
                        <input className="input__input" id="name" type="text" placeholder='ОАО "Строитель"'/>
                    </div>
                </li>
                <li className="login__row">
                    <div className="login__input input">
                        <label className="input__label" htmlFor="email">
                            E-mail
                        </label>
                        <input className="input__input" id="email" type="email" placeholder="example@exml.ru"/>
                    </div>
                </li>
                <li className="login__row">
                    <div className="login__input input">
                        <label className="input__label" htmlFor="phone">
                            Телефон
                        </label>
                        <input className="input__input" id="phone" type="text" placeholder="+7 (922) 62-77-858"/>
                    </div>
                </li>
                <li className="login__row">
                    <div className="login__input input">
                        <label className="input__label" htmlFor="login">
                            Логин
                        </label>
                        <input className="input__input" id="login" name={"login"} type="text" placeholder="user"/>
                    </div>
                </li>
                <li className="login__row">
                    <div className="login__input input">
                        <label className="input__label" htmlFor="password">
                            Пароль
                        </label>
                        <input className="input__input" id="password" name={"password"} type="password" placeholder="*****"/>
                    </div>
                </li>
                <li className="login__row">
                    <div className="login__input input">
                        <label className="input__label" htmlFor="password2">
                            Повторите пароль
                        </label>
                        <input className="input__input" id="password2" name={"password2"} type="password" placeholder="*****"/>
                    </div>
                </li>
                <li className="login__row">
                    <div className="login__input input">
                        <label className="input__label" htmlFor="address">
                            Адрес
                        </label>
                        <input className="input__input" id="address" type="text" placeholder="г. Оренбург, ул. Брестская, д. 9, кв. 50"/>
                    </div>
                </li>
                <li className="login__row">
                    <div className="login__input input">
                        <input className="input__input _check" type="checkbox" placeholder="" id="check"/>
                        <label className="input__label _check" htmlFor="check">
                            Согалшаюсь на обработку персональных данных
                        </label>

                    </div>
                </li>
            </ul>




            <button className="login__btn btn">
                Регистрация
            </button>
            <div className="login__subtext">
                <span>Уже зарегистрированы?</span> <Link to={LOGIN_PATH}>Авторизируйтесь!</Link>
            </div>


        </form>
    )
};

export default RegistrationFormEmployers;