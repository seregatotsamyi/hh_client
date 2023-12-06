import React, {useRef, useState} from 'react';
import {Link, Navigate} from "react-router-dom";
import {LOGIN_PATH, ROLE_EMP} from "../../utils/consts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {OptionType, RegistrationFormEmployerType} from "../../type/type";
import {registerEmp} from "../../store/authReducer";
import {
    emailFieldRequired,
    loginField,
    nameField, nameField2, numberField,
    passwordField,
    phoneField,
    requiredField
} from "../../utils/validators/validators";
import {Select, Spin} from 'antd';
import {fetchOptionsSettlements, fetchOptionsStreet} from "../../store/inputReducer";


const RegistrationFormEmployers = () => {

    const dispatch = useDispatch()

    const optionsSettlements = useSelector((state: RootState) => state.input.optionsSettlements)

    const optionsStreet = useSelector((state: RootState) => state.input.optionsStreet)

    const [fetching, setFetching] = useState(false);

    const fetchRef = useRef(0);


    const setOptionSettlements = (stroke: string) => {
        setFetching(true)
        fetchRef.current += 1;
        const fetchId = fetchRef.current;
        dispatch(fetchOptionsSettlements(stroke))
        setFetching(false)
    }

    const setOptionStreet = (stroke: string) => {
        setFetching(true)
        fetchRef.current += 1;
        const fetchId = fetchRef.current;
        dispatch(fetchOptionsStreet(stroke))
        setFetching(false)
    }


    const {register, control, handleSubmit, formState: {errors}, getValues} = useForm<RegistrationFormEmployerType>()

    const error = useSelector((state: RootState) => state.auth.error)

    const onSubmit: SubmitHandler<RegistrationFormEmployerType> = (data) => {
        data.role = ROLE_EMP
        // @ts-ignore
        data.settlements_id = data.settlements_id.value
        // @ts-ignore
        data.street_id = data.street_id.value
        console.log(data)
        dispatch(registerEmp(data))
    }

    const isSuccessRegistration = useSelector((state: RootState) => state.auth.isSuccessRegistration)

    if (isSuccessRegistration) {
        return <Navigate to={LOGIN_PATH}/>
    }


    const optionsSettlementsSet = optionsSettlements.map((e: any): OptionType => ({
        value: e.id,
        label: e.settlement,
    }))

    const optionsStreetSet = optionsStreet.map((e: any): OptionType => ({
        value: e.id,
        label: e.name,
    }))


    return (
        <form onSubmit={handleSubmit(onSubmit)}>


            <ul className="login__grid">
                <li className="login__row">
                    <div className={`login__input input ${errors.name ? "_error" : ""}`}>
                        <div className="input__input-wrap">
                            <label className="input__label" htmlFor="name">
                                Имя (название)
                            </label>
                            <input className="input__input" id="name" {...register("name", nameField)} type="text"
                                   placeholder='ОАО "Строитель"'/>
                        </div>
                        {
                            errors.name && (
                                <div className="input__error">
                                    {errors.name.message}
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
                            <input className="input__input" id="short_name" {...register("short_name", nameField2)}
                                   type="text"
                                   placeholder='ОАО "Строитель"'/>
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
                                   placeholder="example@exml.ru"/>
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
                            <input className="input__input" id="phone" {...register("phone", phoneField)} type="text"
                                   placeholder="+7 (000) 00-00-000"/>
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
                                Логин
                            </label>
                            <input className="input__input" id="login" {...register("login", loginField)} type="text"
                                   placeholder="user"/>
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
                                Пароль
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
                    <div className={`login__input input ${errors.settlements_id ? "_error" : ""}`}>

                        <div className="input__input-wrap">


                            <label className="input__label" htmlFor="settlements_id">
                                Город (населенный пункт, район)
                            </label>
                            <Controller
                                control={control}
                                name='settlements_id'
                                rules={{
                                    required: "Поле обязательно для заполнение",
                                }}
                                render={({field}) => (
                                    <>
                                        <Select {...field}
                                                showSearch
                                                className={"ant-custom"}
                                                labelInValue
                                                options={optionsSettlementsSet}

                                                filterOption={(input, option?) =>
                                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}


                                                filterSort={(optionA, optionB) =>
                                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                                }
                                                onSearch={(value: string) => {
                                                    setOptionSettlements(value)
                                                }}
                                                notFoundContent={fetching ? <Spin size="small"/> : null}
                                        />


                                    </>
                                )}
                            />
                        </div>
                        {
                            errors.settlements_id && (
                                <div className="input__error">
                                    {errors.settlements_id.message}
                                </div>
                            )
                        }
                    </div>
                </li>
                <li className="login__row">
                    <div className={`login__input input ${errors.street_id ? "_error" : ""}`}>
                        <div className="input__input-wrap">
                            <label className="input__label" htmlFor="street_id">
                                Улица (пр-т)
                            </label>
                            <Controller
                                control={control}
                                name='street_id'
                                rules={{
                                    required: "Поле обязательно для заполнение",
                                }}
                                render={({field}) => (
                                    <>
                                        <Select {...field}
                                                showSearch
                                                className={"ant-custom"}
                                                labelInValue
                                                options={optionsStreetSet}

                                                filterOption={(input, option?) =>
                                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}


                                                filterSort={(optionA, optionB) =>
                                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                                }
                                                onSearch={(value: string) => {
                                                    setOptionStreet(value)
                                                }}
                                                notFoundContent={fetching ? <Spin size="small"/> : null}
                                        />


                                    </>
                                )}
                            />
                        </div>
                        {
                            errors.street_id && (
                                <div className="input__error">
                                    {errors.street_id.message}
                                </div>
                            )
                        }
                    </div>
                </li>
                <li className="login__row">
                    <div className={`login__input input ${errors.number_house ? "_error" : ""}`}>
                        <div className="input__input-wrap">
                            <label className="input__label" htmlFor="number_house">
                                Номер дома
                            </label>
                            <input className="input__input" id="number_house" {...register("number_house", numberField)}
                                   type="text" placeholder="д. 9"/>
                        </div>
                        {
                            errors.number_house && (
                                <div className="input__error">
                                    {errors.number_house.message}
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
                                Согалшаюсь на обработку персональных данных
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


