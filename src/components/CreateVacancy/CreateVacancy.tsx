import React, {useEffect, useState} from 'react';
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {createVacancyFormType, OptionType} from "../../type/type";
import {nameField, numberField} from "../../utils/validators/validators";
import {Select} from 'antd';
import 'dayjs/locale/ru';
import {RootState} from "../../store/store";
import {LOGIN_PATH, PROFILE_LIST_VACANCY} from "../../utils/consts";
import {Navigate} from "react-router-dom";
import {
    fetchOptionsActivities,
    fetchOptionsDuties,
    fetchOptionsEducation,
    fetchOptionsGender
} from "../../store/inputReducer";
import DateRange from "../Input/DateRange";
import {createVacancy} from "../../store/vacancyReducer";
import {useAppDispatch, useAppSelector} from '../../store/hooks';


const CreateVacancy: React.FC = () => {

    const dispatch = useAppDispatch()

    const userId = useAppSelector((state: RootState) => state.auth.userId)
    const isSuccessCreateVacancy = useAppSelector((state: RootState) => state.vacancy.isSuccessCreateVacancy)
    const optionsGender = useAppSelector((state: RootState) => state.input.optionsGender)
    const optionsEducation = useAppSelector((state: RootState) => state.input.optionsEducation)

    const optionsGenderSet = optionsGender.map((e: any): OptionType => ({
        value: e.id,
        label: e.name,
    }))
    const optionsEducationSet = optionsEducation.map((e: any): OptionType => ({
        value: e.id,
        label: e.education_value,
    }))


    const [duties, setDuties] = useState<Array<object>>([]);
    const optionsDuties = useAppSelector((state: RootState) => state.input.optionsDuties)
    const optionsDutiesSet = optionsDuties.map((e: any): OptionType => ({
        value: e.id,
        label: e.duties_volume,
    }))
    const dutiesArray: Array<string> = []
    for (let i = 0; i < duties.length; i++) {
        //@ts-ignore
        dutiesArray.push(duties[i].value)
    }

    const [activities, setActivities] = useState<Array<object>>([]);
    const optionsActivities = useAppSelector((state: RootState) => state.input.optionsActivities)
    const optionsActivitiesSet = optionsActivities.map((e: any): OptionType => ({
        value: e.id,
        label: e.name,
    }))
    const activitiesArray: Array<string> = []
    for (let i = 0; i < activities.length; i++) {
        //@ts-ignore
        activitiesArray.push(activities[i].value)
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
        dispatch(fetchOptionsGender(null))
        dispatch(fetchOptionsEducation(null))
        dispatch(fetchOptionsDuties(null))
        dispatch(fetchOptionsActivities(null))
    }, [])

    useEffect(() => {
        if (duties.length === 0) {
            clearErrors("duties_array")
        }
        if (activities.length === 0) {
            clearErrors("kind_activities_array")
        }

    }, [duties, activities])

    const onSubmit: SubmitHandler<createVacancyFormType> = (data) => {

        if (duties.length === 0) {
            setError("duties_array", {
                type: "manual",
                message: "Укажите хотя бы одну обязанность",
            })
            return
        }
        if (activities.length === 0) {
            setError("kind_activities_array", {
                type: "manual",
                message: "Укажите хотя бы одну деятельность",
            })
            return
        }


        // @ts-ignore
        data.gender_id = data.gender_id.value
        // @ts-ignore
        data.education_id = data.education_id.value
        data.emp_id = userId
        data.duties_array = dutiesArray
        data.kind_activities_array = activitiesArray
        dispatch(createVacancy(data))
        console.log(data)
    }


    //Multiply option

    const handleChange = (value: object[]) => {
        if (value.length > 0) {
            clearErrors("duties_array")
            setDuties(value)
        }
    }

    const handleChangeActivities = (value: object[]) => {
        if (value.length > 0) {
            clearErrors("kind_activities_array")
            setActivities(value)
        }
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
                        <div className={`login__input input ${errors.specialization_array ? "_error" : ""}`}>

                            <div className="input__input-wrap">


                                <label className="input__label" htmlFor="specialization_array">
                                    Специализация
                                </label>

                                <Select
                                    className={"ant-custom multiply"}
                                    labelInValue
                                    mode="multiple"

                                    onChange={handleChange}
                                    options={optionsDutiesSet}
                                    filterOption={(input, option?) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                />


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
                                <Controller
                                    control={control}
                                    name='gender_id'
                                    rules={{
                                        required: "Поле обязательно для заполнение",
                                    }}
                                    render={({field}) => (
                                        <>
                                            <Select {...field}
                                                    className={"ant-custom"}
                                                    labelInValue
                                                    options={optionsGenderSet}

                                            />


                                        </>
                                    )}
                                />
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
                                <Controller
                                    control={control}
                                    name='education_id'
                                    rules={{
                                        required: "Поле обязательно для заполнение",
                                    }}
                                    render={({field}) => (
                                        <>
                                            <Select {...field}
                                                    className={"ant-custom"}
                                                    labelInValue
                                                    options={optionsEducationSet}
                                            />


                                        </>
                                    )}
                                />
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



                </ul>

                <button className="create__btn btn" type={"submit"}>
                    Разместить
                </button>
            </form>

        </div>
    )
};

export default CreateVacancy;