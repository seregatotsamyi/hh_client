import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {ProfileEmpForm} from "../../type/type";
import {emailField, nameField2} from "../../utils/validators/validators";
import {PROFILE_LIST_VACANCY, ROLE_EMP} from "../../utils/consts";
import {getUser, updateEmp} from "../../store/userReducer";
import {RootState} from "../../store/store";
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import PhoneInput from "../Input/PhoneInput";
import AboutInput from "../Input/AboutInput";


const ProfileEmp: React.FC = () => {

    const dispatch = useAppDispatch()

    const id = useAppSelector((state: RootState) => state.auth.userId)
    const employer = useAppSelector((state: RootState) => state.user.employers)
    const error = useAppSelector((state: RootState) => state.user.response)
    const countVacancyUser = useAppSelector((state: RootState) => state.vacancy.isCountVacancyUser)

    const dataForForm = {
        email: employer.email,
        short_name: employer.short_name,
        phone: employer.phone,
        about: employer.about
    }

    const {register, handleSubmit, control, formState: {errors}, reset} = useForm<ProfileEmpForm>({
        defaultValues: dataForForm
    })

    useEffect(() => {
        reset(dataForForm)

        if (id !== null && employer.login === null) {
            dispatch(getUser({role: ROLE_EMP, id}))
        }

    }, [employer, error, dispatch])


    const [editMode, setEditMode] = useState<boolean>(false);

    const onEditMode = () => {
        setEditMode(!editMode)
    }

    const onSubmit = (data: ProfileEmpForm) => {
        setEditMode(false)
        data.id = id
        if (employer.email !== data.email ||
            employer.about !== data.about ||
            employer.short_name !== data.short_name ||
            employer.phone !== data.phone) {
            dispatch(updateEmp(data))
        }

    }

    return (
        <div className="profile__content">
            <form className="profile__date" onSubmit={handleSubmit(onSubmit)}>
                <ul className="profile__info">
                    <li className="profile__info-item _accent">
                        <span> Ваша планета: </span>
                        <span>{employer.name_company || "Ошибка"}</span>
                    </li>
                    {
                        employer.short_name !== null ? (
                            <li className="profile__info-item">
                                <span>Короткое название: </span>
                                <span>{employer.short_name}</span>
                            </li>
                        ) : ""
                    }
                    <li className="profile__info-item">
                        <span>Количество размещенных вакансий: </span>
                        <span><Link to={PROFILE_LIST_VACANCY}>{countVacancyUser ? countVacancyUser : "0"}</Link> </span>
                    </li>


                </ul>
                <ul className="profile__information">
                    <li className="profile__information-item">
                        <div className="profile__information-title">
                            Название:
                        </div>
                        <div className="profile__information-text">
                            {employer.name_company || "Ошибка"}
                        </div>
                    </li>
                    {
                        employer.short_name !== null ? (
                            <li className="profile__information-item">
                                <div className="profile__information-title">
                                    Короткое название
                                </div>
                                <div className="profile__information-text">
                                    {employer.short_name || "Ошибка"}
                                </div>
                            </li>
                        ) : ""
                    }
                    <li className="profile__information-item">
                        <div className="profile__information-title">
                            Логин:
                        </div>
                        <div className="profile__information-text">
                            {employer.login || "Ошибка"}
                        </div>
                    </li>


                </ul>
                <div className="profile__edit">
                    <ul className="profile__list-form">

                        <li className="profile__form-item">
                            <div className={`login__input input ${errors.email ? "_error" : ""}`}>
                                <div className="input__input-wrap">
                                    <label className="input__label" htmlFor="email">
                                        Email
                                    </label>
                                    <input className="input__input" id="email" {...register("email", emailField)}
                                           type="text" disabled={!editMode}/>
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
                        <li className="profile__form-item">
                            <div className={`login__input input ${errors.phone ? "_error" : ""}`}>
                                <div className="input__input-wrap">
                                    <label className="input__label" htmlFor="phone">
                                        Телефон
                                    </label>
                                    <PhoneInput control={control} disabled={!editMode}/>
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
                        <li className="profile__form-item">
                            <div className={`login__input input ${errors.short_name ? "_error" : ""}`}>
                                <div className="input__input-wrap">
                                    <label className="input__label" htmlFor="short_name">
                                        Короткое название
                                    </label>
                                    <input className="input__input"
                                           id="short_name" {...register("short_name", nameField2)}
                                           type="text" disabled={!editMode}/>
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
                        <li className="profile__form-item">
                            <div className={`login__input input ${errors.about ? "_error" : ""}`}>
                                <div className="input__input-wrap">
                                    <label className="input__label" htmlFor="short_name">
                                        О компании
                                    </label>
                                    <AboutInput control={control} disabled={!editMode}/>
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

                    </ul>
                    {
                        error !== null ? (
                            <div className={"response"}>
                                {error}
                            </div>
                        ) : ""
                    }

                    <button className={`profile__btn btn ${editMode ? "" : " _hide"}`} type="submit">
                        Сохранить
                    </button>
                    <button className={`profile__btn btn ${editMode ? " _hide" : ""}`} onClick={onEditMode}
                            type="button">
                        Редактировать
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileEmp;