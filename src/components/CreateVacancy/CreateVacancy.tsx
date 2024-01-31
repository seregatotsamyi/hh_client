import React, {useEffect} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {createVacancyFormType} from "../../type/type";
import {nameField, numberField} from "../../utils/validators/validators";
import 'dayjs/locale/ru';
import {RootState} from "../../store/store";
import {
    fetchOptionsEducation,
    fetchOptionsGender, fetchOptionsSpecializations
} from "../../store/inputReducer";
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import GenderInput from "../Input/GenderInput";
import EducationInput from "../Input/EducationInput";
import SpecializationInput from '../Input/SpecializationInput';
import AboutInput from "../Input/AboutInput";
import SkillsInput from '../Input/SkilsInput';
import SchedulesInput from "../Input/ShedulesInput";


const CreateVacancy: React.FC = () => {

    const dispatch = useAppDispatch()

    const userId = useAppSelector((state: RootState) => state.auth.userId)
    const isSuccessCreateVacancy = useAppSelector((state: RootState) => state.vacancy.isSuccessCreateVacancy)

    //Form
    const {
        handleSubmit,
        register,
        control,
        formState: {errors},
        getValues
    } = useForm<createVacancyFormType>()

    useEffect(() => {
        dispatch(fetchOptionsGender(null))
        dispatch(fetchOptionsEducation(null))
        dispatch(fetchOptionsSpecializations(null))
    }, [])

    const onSubmit: SubmitHandler<createVacancyFormType> = (data) => {
        data.emp_id = userId
        //dispatch(createVacancy(data))
        console.log(data)
    }


    return (
        <div className="create">

            <div className="create__title _h3">
                Разместить вакансию
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <ul className="profile__list-form">
                    <li className="profile__form-item">
                        <div className="create__text">
                    <span>
                      Общая информация
                    </span>
                        </div>
                    </li>
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

                        <div className={`login__input input ${errors.about ? "_error" : ""}`}>
                            <div className="input__input-wrap">
                                <label className="input__label" htmlFor="name">
                                    Описание
                                </label>
                                <AboutInput control={control} required={true}/>
                            </div>

                            {
                                errors.about && (
                                    <div className="input__error">
                                        {errors.about.message}
                                    </div>
                                )
                            }
                        </div>
                    </li>
                    <li className="profile__form-item">

                        <div className={`login__input input ${errors.experience ? "_error" : ""}`}>
                            <div className="input__input-wrap">
                                <label className="input__label" htmlFor="name">
                                    Опыт
                                </label>
                                <AboutInput control={control} required={true} name={"experience"}/>
                            </div>

                            {
                                errors.experience && (
                                    <div className="input__error">
                                        {errors.experience.message}
                                    </div>
                                )
                            }
                        </div>
                    </li>
                    <li className="profile__form-item">
                        <div className={`login__input input ${errors.specialization_array ? "_error" : ""}`}>

                            <div className="input__input-wrap">

                                <label className="input__label" htmlFor="specialization_array">
                                    Специализация
                                </label>

                                <SpecializationInput control={control}/>

                            </div>
                            {
                                errors.specialization_array && (
                                    <div className="input__error">
                                        {errors.specialization_array.message}
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
                      Требование
                    </span>
                        </div>
                    </li>
                    <li className="profile__form-item">
                        <div className={`login__input input ${errors.gender_id ? "_error" : ""}`}>

                            <div className="input__input-wrap">

                                <label className="input__label" htmlFor="settlements_id">
                                    Пол
                                </label>

                                <GenderInput control={control}/>

                            </div>
                            {
                                errors.gender_id && (
                                    <div className="input__error">
                                        {errors.gender_id.message}
                                    </div>
                                )
                            }
                        </div>
                    </li>
                    <li className="profile__form-item">
                        <div className={`login__input input ${errors.education_id ? "_error" : ""}`}>

                            <div className="input__input-wrap">


                                <label className="input__label" htmlFor="settlements_id">
                                    Образование
                                </label>

                                <EducationInput control={control}/>

                            </div>
                            {
                                errors.education_id && (
                                    <div className="input__error">
                                        {errors.education_id.message}
                                    </div>
                                )
                            }
                        </div>
                    </li>
                    <li className="profile__form-item">
                        <div className={`login__input input ${errors.schedules ? "_error" : ""}`}>

                            <div className="input__input-wrap">

                                <label className="input__label" htmlFor="specialization_array">
                                    График*()
                                </label>

                                <SchedulesInput control={control}/>

                            </div>
                            {
                                errors.schedules && (
                                    <div className="input__error">
                                        {errors.schedules.message}
                                    </div>
                                )
                            }
                        </div>
                    </li>
                    <li className="profile__form-item">
                        <div className={`login__input input ${errors.skills ? "_error" : ""}`}>

                            <div className="input__input-wrap">

                                <label className="input__label" htmlFor="specialization_array">
                                    НавыкиГрафик*()
                                </label>

                                <SkillsInput control={control}/>

                            </div>
                            {
                                errors.skills && (
                                    <div className="input__error">
                                        {errors.skills.message}
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