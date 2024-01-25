import React from 'react';
import {Link, Navigate} from 'react-router-dom';
import {MAIN_PATH, REGISTRATION_PATH, ROLE_APL, ROLE_EMP} from "../../utils/consts";
import {SubmitHandler, useForm} from "react-hook-form";
import {loginFormType} from "../../type/type";
import {loginField, requiredField} from "../../utils/validators/validators";
import {inRegistrationSet, loginApl, loginEmp} from "../../store/authReducer";
import {RootState} from "../../store/store";
import {useAppDispatch, useAppSelector} from '../../store/hooks';


const LoginForm: React.FC = () => {

    const dispatch = useAppDispatch()

    dispatch(inRegistrationSet(false))

    const {register, handleSubmit, formState: {errors}} = useForm<loginFormType>()

    const onSubmit: SubmitHandler<loginFormType> = (data) => {
        if (data.role === ROLE_EMP) {
            dispatch(loginEmp(data))
        } else {
            dispatch(loginApl(data))
        }
    }

    const error = useAppSelector((state: RootState) => state.auth.error)

    const inLogging = useAppSelector((state: RootState) => state.auth.inLogging)

    if (inLogging) {
        return  <Navigate to={MAIN_PATH}  />
    }


    return <form onSubmit={handleSubmit(onSubmit)}>
        <div className="login__title _h2">
            Авторизация
        </div>

        <ul className="login__grid">
            <li className="login__row">
                <div className={`login__input input ${errors.login ? "_error" : ""}`}>
                    <div className="input__input-wrap">
                    <label className="input__label" htmlFor="login">
                        Логин
                    </label>
                    <input className="input__input" id="login" {...register("login", loginField)} type="text"
                           placeholder="Ваш псевдоним"/>
                    </div>
                    {
                        errors.login && (
                            <div className="input__error">
                                {errors.login.message}
                            </div>
                        )
                    }
                </div>
            </li>
            <li className="login__row">
                <div className="login__input input">
                    <label className="input__label" htmlFor="name">
                        Пароль
                    </label>
                    <input className="input__input" id="name" {...register("password", requiredField)} type="password"
                           placeholder="Ваш секретный пароль"/>
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
                                Даватель
                            </label>
                        </div>
                        <div className="login__input input">
                            <input value={ROLE_APL} className="input__input _radio" {...register("role", requiredField)}
                                   type="radio" name="role" id="r-2"/>
                            <label className="input__label _radio btn btn_2" htmlFor="r-2">
                                Искатель
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