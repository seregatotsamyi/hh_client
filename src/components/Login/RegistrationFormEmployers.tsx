import React from 'react';
import {Link} from "react-router-dom";
import {LOGIN_PATH, ROLE_EMP} from "../../utils/consts";
import {RootState} from "../../store/store";
import {SubmitHandler, useForm} from "react-hook-form";
import {RegistrationEmployerType, RegistrationFormEmployerType} from "../../type/type";
import {registerEmp} from "../../store/authReducer";
import {
    emailFieldRequired,
    loginField, nameCompany,
    nameField,
    passwordField,
    requiredField
} from "../../utils/validators/validators";
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import PhoneInput from "../Input/PhoneInput";
import AddressInput from "../Input/AddressInput";


const RegistrationFormEmployers = () => {

    const dispatch = useAppDispatch()

    const currentAddress = useAppSelector((state: RootState) => state.input.currentAddress)
    const error = useAppSelector((state: RootState) => state.auth.error)

    const {register, control, handleSubmit, formState: {errors}, getValues} = useForm<RegistrationFormEmployerType>()

    const onSubmit: SubmitHandler<RegistrationFormEmployerType> = (data) => {

        let dataSend: RegistrationEmployerType = {
            ...data,
            role: data.role = ROLE_EMP,
            address: data.address = {
                house: currentAddress.house,
                region: currentAddress.region,
                region_with_type: currentAddress.region_with_type,
                street_with_type: currentAddress.street_with_type,
                city: currentAddress.city,
                index: currentAddress.index,
                region_type: currentAddress.region_type,
                country: currentAddress.country
            }
        }
        dispatch(registerEmp(dataSend))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <ul className="login__grid">
                <li className="login__row">
                    <div className={`login__input input ${errors.name_company ? "_error" : ""}`}>
                        <div className="input__input-wrap">
                            <label className="input__label" htmlFor="name">
                                Имя планеты (название компании)
                            </label>
                            <input className="input__input" id="name" {...register("name_company", nameCompany)}
                                   type="text"
                                   placeholder='ОАО "Земля"'/>
                        </div>
                        {
                            errors.name_company && (
                                <div className="input__error">
                                    {errors.name_company.message}
                                </div>
                            )
                        }
                    </div>
                </li>
                <li className="login__row">
                    <div className={`login__input input ${errors.short_name ? "_error" : ""}`}>
                        <div className="input__input-wrap">
                            <label className="input__label" htmlFor="short_name">
                                Короткое название (необязательно)
                            </label>
                            <input className="input__input" id="short_name" {...register("short_name", nameField)}
                                   type="text"
                                   placeholder='Земля'/>
                        </div>
                        {
                            errors.short_name && (
                                <div className="input__error">
                                    {errors.short_name.message}
                                </div>
                            )
                        }
                    </div>
                </li>
                <li className="login__row">
                    <div className={`login__input input ${errors.email ? "_error" : ""}`}>
                        <div className="input__input-wrap">
                            <label className="input__label" htmlFor="email">
                                E-mail
                            </label>
                            <input className="input__input" id="email" {...register("email", emailFieldRequired)}
                                   type="email"
                                   placeholder="example@examp.ru"/>
                        </div>
                        {
                            errors.email && (
                                <div className="input__error">
                                    {errors.email.message}
                                </div>
                            )
                        }
                    </div>
                </li>
                <li className="login__row">
                    <div className={`login__input input ${errors.phone ? "_error" : ""}`}>
                        <div className="input__input-wrap">
                            <label className="input__label" htmlFor="phone">
                                Телефон
                            </label>
                            <PhoneInput control={control}/>
                        </div>
                        {
                            errors.phone && (
                                <div className="input__error">
                                    {errors.phone.message}
                                </div>
                            )
                        }
                    </div>
                </li>
                <li className="login__row">
                    <div className={`login__input input ${errors.login ? "_error" : ""}`}>
                        <div className="input__input-wrap">
                            <label className="input__label" htmlFor="login">
                                Логин (псевдоним)
                            </label>
                            <input className="input__input" id="login" {...register("login", loginField)} type="text"
                                   placeholder="pokoritelVseya"/>
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
                    <div className={`login__input input ${errors.password ? "_error" : ""}`}>
                        <div className="input__input-wrap">
                            <label className="input__label" htmlFor="password">
                                Секретный пароль
                            </label>
                            <input className="input__input" id="password" {...register("password", passwordField)}
                                   type="password" placeholder="*****"/>
                        </div>
                        {
                            errors.password && (
                                <div className="input__error">
                                    {errors.password.message}
                                </div>
                            )
                        }
                    </div>
                </li>
                <li className="login__row">
                    <div className={`login__input input ${errors.passwordSecond ? "_error" : ""}`}>
                        <div className="input__input-wrap">
                            <label className="input__label" htmlFor="password2">
                                Повторите пароль
                            </label>
                            <input className="input__input" id="password2" {...register("passwordSecond",
                                {validate: value => value === getValues("password") || 'Пароли не соответствуют'})}
                                   type="password" placeholder="*****"/>
                        </div>
                        {
                            errors.passwordSecond && (
                                <div className="input__error">
                                    {errors.passwordSecond.message}
                                </div>
                            )
                        }
                    </div>
                </li>
                <li className="login__row">
                    <div className={`login__input input ${errors.address ? "_error" : ""}`}>

                        <div className="input__input-wrap">

                            <label className="input__label" htmlFor="address">
                                Адрес
                            </label>
                            <AddressInput control={control}/>
                        </div>
                        {
                            errors.address && (
                                <div className="input__error">
                                    {errors.address.message}
                                </div>
                            )
                        }
                    </div>
                </li>
                <li className="login__row">
                    <div className={`login__input input ${errors.check ? "_error" : ""}`}>
                        <div className="input__input-wrap">
                            <input className="input__input _check" {...register("check", requiredField)} type="checkbox"
                                   id="check"/>
                            <label className="input__label _check" htmlFor="check">
                                Соглашаюсь на передачу данных космическим создателям
                            </label>
                        </div>
                        {
                            errors.check && (
                                <div className="input__error">
                                    {errors.check.message}
                                </div>
                            )
                        }
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

            <button className="login__btn btn" type={"submit"}>
                Регистрация
            </button>

            <div className="login__subtext">
                <span>Уже зарегистрированы?</span> <Link to={LOGIN_PATH}>Авторизируйтесь!</Link>
            </div>

        </form>
    )
};

export default RegistrationFormEmployers;


