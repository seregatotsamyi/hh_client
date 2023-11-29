import React from 'react';
import { Link } from 'react-router-dom';
import {REGISTRATION_PATH} from "../../utils/consts";
import {  useDispatch } from 'react-redux'
import {login} from "../../store/authReducer";


const LoginForm: React.FC = () => {

    const dispatch = useDispatch()

    const loginR =() =>{
        dispatch(login())
    }

    return <form>
        <div className="login__title _h2">
            Авторизация
        </div>

        <ul className="login__grid">
            <li className="login__row">
                <div className="login__input input">
                    <label className="input__label" htmlFor="login">
                        Логин
                    </label>
                    <input className="input__input" id="login" type="text" placeholder="Ваш логин"/>
                </div>
            </li>
            <li className="login__row">
                <div className="login__input input">
                    <label className="input__label" htmlFor="name">
                        Пароль
                    </label>
                    <input className="input__input" id="name" type="text" placeholder="Ваш пароль"/>
                </div>
            </li>

            <li className="login__row">
                <div className="login__radio">
                    <div className="login__radio-text">
                        Войти как:
                    </div>
                    <div className="login__radio-inputs">
                        <div className="login__input input">
                            <input value={"employers"} className="input__input  _radio" type="radio" name="r" id="r-1" defaultChecked={true}/>
                            <label className="input__label btn btn_2 _radio" htmlFor="r-1">
                                Работодатель
                            </label>
                        </div>
                        <div className="login__input input">
                            <input value={"applicants"} className="input__input _radio" type="radio" name="r" id="r-2"/>
                            <label className="input__label _radio btn btn_2" htmlFor="r-2">
                                Соискатель
                            </label>
                        </div>
                    </div>

                </div>

            </li>
        </ul>

        <button onClick={loginR} type={"button"} className="login__btn btn">
            Войти
        </button>

        <div className="login__subtext">
            <span>Еще не зарегистрированы?</span>  <Link to={REGISTRATION_PATH}>Зарегистрируйтесь!</Link>
        </div>

    </form>
};

export default LoginForm;