import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
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


const CreateVacancy: React.FC = () => {

    const dispatch:any = useDispatch()

    const userId = useSelector((state: RootState) => state.auth.userId)
    const isSuccessCreateVacancy = useSelector((state: RootState) => state.vacancy.isSuccessCreateVacancy)
    const optionsGender = useSelector((state: RootState) => state.input.optionsGender)
    const optionsEducation = useSelector((state: RootState) => state.input.optionsEducation)
    const optionsGenderSet = optionsGender.map((e: any): OptionType => ({
        value: e.id,
        label: e.name,
    }))
    const optionsEducationSet = optionsEducation.map((e: any): OptionType => ({
        value: e.id,
        label: e.education_value,
    }))


    const [duties, setDuties] = useState<Array<object>>([]);
    const optionsDuties = useSelector((state: RootState) => state.input.optionsDuties)
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
    const optionsActivities = useSelector((state: RootState) => state.input.optionsActivities)
    const optionsActivitiesSet = optionsActivities.map((e: any): OptionType => ({
        value: e.id,
        label: e.name,
    }))
    const activitiesArray: Array<string> = []
    for (let i = 0; i < activities.length; i++) {
        //@ts-ignore
        activitiesArray.push(activities[i].value)
    }

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
        dispatch(fetchOptionsGender(null))
        dispatch(fetchOptionsEducation(null))
        dispatch(fetchOptionsDuties(null))
        dispatch(fetchOptionsActivities(null))
    }, [])

    useEffect(() => {
        if (dateStart !== null || dateEnd !== null || dateStart !== "" || dateEnd !== "") {
            clearErrors("start_date")
        }
        if (duties.length === 0) {
            clearErrors("duties_array")
        }
        if (activities.length === 0) {
            clearErrors("kind_activities_array")
        }

    }, [dateStart, duties, activities])

    const onSubmit: SubmitHandler<createVacancyFormType> = (data) => {
        if (dateStart === null || dateEnd === null || dateStart === "" || dateEnd === "") {
            onSetError()
            return
        }
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

        data.start_date = dateStart
        data.end_date = dateEnd
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


    //Data range
    const DataRangeProps = {
        setDateStart,
        setDateEnd
    }

    if (!userId) {
        return <Navigate to={LOGIN_PATH}/>
    }

    if (isSuccessCreateVacancy) {
        return <Navigate to={PROFILE_LIST_VACANCY}/>
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


                            <DateRange {...DataRangeProps}/>

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
                                    Коммуникабельность
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
                    <li className="profile__form-item">
                        <div className={`login__input input ${errors.duties_array ? "_error" : ""}`}>

                            <div className="input__input-wrap">


                                <label className="input__label" htmlFor="duties_array">
                                    Обязанности
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
                                errors.duties_array && (
                                    <div className="input__error">
                                        {errors.duties_array.message}
                                    </div>
                                )
                            }
                        </div>
                    </li>
                    <li className="profile__form-item">
                        <div className={`login__input input ${errors.kind_activities_array ? "_error" : ""}`}>

                            <div className="input__input-wrap">


                                <label className="input__label" htmlFor="kind_activities_array">
                                    Виды деятельности
                                </label>

                                <Select
                                    className={"ant-custom multiply"}
                                    labelInValue
                                    mode="multiple"

                                    onChange={handleChangeActivities}
                                    options={optionsActivitiesSet}
                                    filterOption={(input, option?) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                />


                            </div>
                            {
                                errors.kind_activities_array && (
                                    <div className="input__error">
                                        {errors.kind_activities_array.message}
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