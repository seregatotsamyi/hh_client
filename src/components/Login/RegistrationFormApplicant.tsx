import React from 'react';
import {Link} from "react-router-dom";
import {LOGIN_PATH, ROLE_APL} from "../../utils/consts";
import {useForm, SubmitHandler} from "react-hook-form"
import {
    emailField,
    loginField,
    nameField,
    passwordField,
    requiredField
} from "../../utils/validators/validators";
import {RegistrationApplicantType, RegistrationFormApplicantType} from "../../type/type";
import {registerApl} from "../../store/authReducer";
import {RootState} from "../../store/store";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import PhoneInput from "../Input/PhoneInput";
import AddressInput from "../Input/AddressInput";


const RegistrationFormApplicant = () => {

    const dispatch = useAppDispatch()

    const error = useAppSelector((state: RootState) => state.auth.error)
    const currentAddress = useAppSelector((state: RootState) => state.input.currentAddress)

    const {register, control, handleSubmit, formState: {errors}, getValues} = useForm<RegistrationFormApplicantType>()

    const onSubmit: SubmitHandler<RegistrationFormApplicantType> = (data) => {

        let dataSend:RegistrationApplicantType = {
            ...data,
            role: data.role = ROLE_APL,
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

        dispatch(registerApl(dataSend))

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <ul className="login__grid">

                <li className="login__row">

                    <div className={`login__input input ${errors.firstName ? "_error" : ""}`}>
                        <div className="input__input-wrap">
                            <label className="input__label" htmlFor="name">
                                Имя
                            </label>
                            <input className="input__input" id="name" {...register("firstName", nameField)} type="text" placeholder="Иван"/>
                        </div>
                        {
                            errors.firstName && (
                                <div className="input__error">
                                    {errors.firstName.message}
                                </div>
                            )
                        }
                    </div>


                </li>
                <li className="login__row">

                    <div className={`login__input input ${errors.secondName ? "_error" : ""}`}>
                        <div className="input__input-wrap">
                            <label className="input__label" htmlFor="name2">
                                Фамилия
                            </label>
                            <input className="input__input" id="name2" {...register("secondName", nameField)} type="text"
                                   placeholder="Иванов"/>

                        </div>
                        {
                            errors.secondName && (
                                <div className="input__error">
                                    {errors.secondName.message}
                                </div>
                            )
                        }

                    </div>

                </li>
                <li className="login__row">

                    <div className={`login__input input ${errors.surname ? "_error" : ""}`}>
                        <div className="input__input-wrap">
                            <label className="input__label" htmlFor="name3">
                                Отчество
                            </label>
                            <input className="input__input" id="name3" {...register("surname", nameField)} type="text" placeholder="Иванович"/>
                        </div>
                        {
                            errors.surname && (
                                <div className="input__error">
                                    {errors.surname.message}
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

                    <div className={`login__input input ${errors.email ? "_error" : ""}`}>
                        <div className="input__input-wrap">
                            <label className="input__label" htmlFor="email">
                                Email
                            </label>
                            <input className="input__input"
                                   id="email" {...register("email", emailField)}
                                   type="email"
                                   autoComplete={"false"}
                            />
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

                    <div className={`login__input input ${errors.login ? "_error" : ""}`}>
                        <div className="input__input-wrap">
                            <label className="input__label" htmlFor="login">
                                Логин (псевдоним)
                            </label>
                            <input className="input__input" id="login" {...register("login", loginField)} type="text" placeholder="user"/>
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
                            <input className="input__input" id="password" {...register("password", passwordField)} type="password"
                                   placeholder="*****"/>
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
                            <input className="input__input"
                                   id="password2" {...register("passwordSecond", {validate: value => value === getValues("password") || 'Пароли не соответствуют'})}
                                   type="password"
                                   placeholder="*****"/>
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
                            <input className="input__input _check" {...register("check", requiredField)} type="checkbox" placeholder="" id="check"/>
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
                error &&(
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

export default RegistrationFormApplicant;