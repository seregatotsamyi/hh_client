import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {SubmitHandler, useForm} from "react-hook-form";
import {createVacancyFormType} from "../../type/type";
import {nameField, numberField} from "../../utils/validators/validators";
import {DatePicker} from 'antd';
import type {DatePickerProps, RangePickerProps} from 'antd/es/date-picker';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';



const CreateVacancy: React.FC = () => {

    const dispatch = useDispatch()

    const [dateStart, setDateStart] = useState<string | null>(null);
    const [dateEnd, setDateEnd] = useState<string | null>(null);

    const onSetError = () => {
        setError("start_date", {
            type: "manual",
            message: "Укажите дату",
        })
    }

    //Form
    const {
        register,
        control,
        handleSubmit,
        setError,
        formState: {errors},
        getValues,
        clearErrors
    } = useForm<createVacancyFormType>()

    useEffect(() => {
        if (dateStart !== null || dateEnd !== null || dateStart !== "" || dateEnd !== "") {
            clearErrors("start_date")
        }
    }, [dateStart])

    const onSubmit: SubmitHandler<createVacancyFormType> = (data) => {
        if (dateStart === null || dateEnd === null || dateStart === "" || dateEnd === "") {
            onSetError()
            return
        }
        data.start_date = dateStart
        data.end_date = dateEnd
        console.log(data)
    }


    //Data range
    const {RangePicker} = DatePicker;

    const disabledDate: RangePickerProps['disabledDate'] = (current) => {
        return current.subtract(-1, 'day') < dayjs().endOf('day')
    }

    const onChangeDate = (
        date: DatePickerProps['value'] | RangePickerProps['value'],
        dateString: [string, string]) => {
        setDateStart(dateString[0])
        setDateEnd(dateString[1])
    }


    return (
        <div className="create">

            <div className="create__title _h3">
                Разместить вакансию
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <ul className="profile__list-form">
                    <li className="profile__form-item">

                        <div className={`login__input input ${errors.name ? "_error" : ""}`}>
                            <div className="input__input-wrap">
                                <label className="input__label" htmlFor="name">
                                    Название
                                </label>
                                <input className="input__input" id="name" type="text" {...register("name", nameField)}/>
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
                    <li className="profile__form-item">
                        <div className="create__text">
                    <span>
                      Рассматриваемый возраст
                    </span>
                        </div>
                    </li>
                    <li className="profile__form-item">
                        <div className={`login__input input ${errors.age_lower ? "_error" : ""}`}>
                            <div className="input__input-wrap">
                                <label className="input__label" htmlFor="age_lower">
                                    От
                                </label>
                                <input className="input__input" {...register("age_lower", {
                                    min: {value: 18, message: "Минимальный возраст 18"},
                                    max: {value: 99, message: "Максимальный возраст 99)"},
                                    required: "Обязательно для заполнения"
                                })} id="age_lower"
                                       type="text"/>
                            </div>
                            {
                                errors.age_lower && (
                                    <div className="input__error">
                                        {errors.age_lower.message}
                                    </div>
                                )
                            }
                        </div>
                        <div className={`login__input input ${errors.age_upper ? "_error" : ""}`}>
                            <div className="input__input-wrap">
                                <label className="input__label" htmlFor="age_upper">
                                    До
                                </label>
                                <input className="input__input" id="age_upper" type="text"
                                       {...register("age_upper", {
                                           validate: () => {
                                               if (Number(getValues("age_lower")) > Number(getValues("age_upper"))) {
                                                   return 'Должно быть выше границы "от"'
                                               }
                                               if (Number(getValues("age_upper")) < 16 || Number(getValues("age_upper")) > 99) {
                                                   return 'От 18 до 99'
                                               }

                                           }
                                       })}/>
                            </div>
                            {
                                errors.age_upper && (
                                    <div className="input__error">
                                        {errors.age_upper.message}
                                    </div>
                                )
                            }
                        </div>
                    </li>
                    <li className="profile__form-item">
                        <div className="create__text">
                    <span>
                      Оплата
                    </span>
                        </div>
                    </li>
                    <li className="profile__form-item">
                        <div className={`login__input input ${errors.payment_lower ? "_error" : ""}`}>
                            <div className="input__input-wrap">
                                <label className="input__label" htmlFor="payment_lower">
                                    От
                                </label>
                                <input className="input__input" {...register("payment_lower", numberField)}
                                       id="payment_lower" type="text"/>
                            </div>
                            {
                                errors.payment_lower && (
                                    <div className="input__error">
                                        {errors.payment_lower.message}
                                    </div>
                                )
                            }
                        </div>
                        <div className={`login__input input ${errors.payment_upper ? "_error" : ""}`}>
                            <div className="input__input-wrap">
                                <label className="input__label" htmlFor="payment_upper">
                                    До
                                </label>
                                <input className="input__input" id="payment_upper" type="text"
                                       {...register("payment_upper", {
                                           validate: () => Number(getValues("payment_lower")) <= Number(getValues("payment_upper")) || 'Должно быть выше границы "от"'
                                       })}/>
                            </div>
                            {
                                errors.payment_upper && (
                                    <div className="input__error">
                                        {errors.payment_upper.message}
                                    </div>
                                )
                            }
                        </div>
                    </li>
                    <li className="profile__form-item">
                        <div className="create__text">
                    <span>
                      Дата размещения
                    </span>
                        </div>
                    </li>
                    <li className="profile__form-item">

                        <div className={"create__date"}>
                            <div className="create__date-wrap">
                                <RangePicker disabledDate={disabledDate} onChange={onChangeDate}/>
                            </div>

                            {
                                errors.start_date && (
                                    <div className="input__error">
                                        {errors.start_date.message}
                                    </div>
                                )

                            }
                        </div>


                    </li>
                    <li className="profile__form-item _radio">

                        <div className={`login__input input ${errors.registration_work_book ? "_error" : ""}`}>
                            <div className="input__input-wrap">
                                <input className="input__input _check" type="checkbox" placeholder=""
                                       id="registration_work_book" {...register("registration_work_book")}/>
                                <label className="input__label _check" htmlFor="registration_work_book">
                                    Наличие трудовой книжки
                                </label>
                            </div>
                            {
                                errors.registration_work_book && (
                                    <div className="input__error">
                                        {errors.registration_work_book.message}
                                    </div>
                                )
                            }

                        </div>


                    </li>
                    <li className="profile__form-item _radio">

                        <div className={`login__input input ${errors.availability_social_package ? "_error" : ""}`}>
                            <div className="input__input-wrap">
                                <input className="input__input _check" type="checkbox" placeholder=""
                                       id="availability_social_package" {...register("availability_social_package")}/>
                                <label className="input__label _check" htmlFor="availability_social_package">
                                    Наличие соц пакета
                                </label>
                            </div>
                            {
                                errors.availability_social_package && (
                                    <div className="input__error">
                                        {errors.availability_social_package.message}
                                    </div>
                                )
                            }

                        </div>


                    </li>
                    <li className="profile__form-item _radio">

                        <div className={`login__input input ${errors.communication_skills ? "_error" : ""}`}>
                            <div className="input__input-wrap">
                                <input className="input__input _check" type="checkbox" placeholder=""
                                       id="communication_skills" {...register("communication_skills")}/>
                                <label className="input__label _check" htmlFor="communication_skills">
                                    Каммуникабельность
                                </label>
                            </div>
                            {
                                errors.communication_skills && (
                                    <div className="input__error">
                                        {errors.communication_skills.message}
                                    </div>
                                )
                            }

                        </div>


                    </li>


                </ul>

                <button className="create__btn btn" type={"submit"}>
                    Разместить
                </button>
            </form>

        </div>
    )
};

export default CreateVacancy;