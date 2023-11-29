import React from 'react';
import {Link, Navigate} from 'react-router-dom';
import {REGISTRATION_PATH, ROLE_APL, ROLE_EMP} from "../../utils/consts";
import {useDispatch, useSelector} from 'react-redux'
import {SubmitHandler, useForm} from "react-hook-form";
import {loginFormType, RegistrationFormApplicantType} from "../../type/type";
import {requiredField} from "../../utils/validators/validators";
import {loginApl} from "../../store/authReducer";
import {RootState} from "../../store/store";


const LoginForm: React.FC = () => {

    const dispatch = useDispatch()

    const {register, handleSubmit} = useForm<RegistrationFormApplicantType>()

    const onSubmit: SubmitHandler<loginFormType> = (data) => {
        if (data.role === ROLE_EMP) {
            console.log("employers login")
        } else {
            dispatch(loginApl(data))
        }
    }

    const error = useSelector((state: RootState) => state.auth.error)


    return <form onSubmit={handleSubmit(onSubmit)}>
        <div className="login__title _h2">
            Авторизация
        </div>

        <ul className="login__grid">
            <li className="login__row">
                <div className="login__input input">
                    <label className="input__label" htmlFor="login">
                        Логин
                    </label>
                    <input className="input__input" id="login" {...register("login", requiredField)} type="text"
                           placeholder="Ваш логин"/>
                </div>
            </li>
            <li className="login__row">
                <div className="login__input input">
                    <label className="input__label" htmlFor="name">
                        Пароль
                    </label>
                    <input className="input__input" id="name" {...register("password", requiredField)} type="text"
                           placeholder="Ваш пароль"/>
                </div>
            </li>

            <li className="login__row">
                <div className="login__radio">
                    <div className="login__radio-text">
                        Войти как:
                    </div>
                    <div className="login__radio-inputs">
                        <div className="login__input input">
                            <input value={ROLE_EMP} className="input__input  _radio"
                                   type="radio" {...register("role", requiredField)} name="role" id="r-1"
                                   defaultChecked={true}/>
                            <label className="input__label btn btn_2 _radio" htmlFor="r-1">
                                Работодатель
                            </label>
                        </div>
                        <div className="login__input input">
                            <input value={ROLE_APL} className="input__input _radio" {...register("role", requiredField)}
                                   type="radio" name="role" id="r-2"/>
                            <label className="input__label _radio btn btn_2" htmlFor="r-2">
                                Соискатель
                            </label>
                        </div>
                    </div>

                </div>

            </li>
        </ul>

        {
            error && (
                <div className="login__error-field">
                    {error}
                </div>
            )
        }

        <button type={"submit"} className="login__btn btn">
            Войти
        </button>

        <div className="login__subtext">
            <span>Еще не зарегистрированы?</span> <Link to={REGISTRATION_PATH}>Зарегистрируйтесь!</Link>
        </div>

    </form>
};

export default LoginForm;