import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {getUser, updateApl} from "../../store/userReducer";
import {ROLE_APL} from "../../utils/consts";
import {useForm} from "react-hook-form";
import {ProfileAplForm} from "../../type/type";
import {emailField, loginField, nameField2, phoneField} from "../../utils/validators/validators";

const ProfileApl: React.FC = () => {
    const dispatch:any = useDispatch()

    const id = useSelector((state: RootState) => state.auth.userId)
    const applicant = useSelector((state: RootState) => state.user.applicant)
    const error = useSelector((state: RootState) => state.user.response)

    useEffect(() => {

        if (id !== null && applicant.login === null) {
            dispatch(getUser({role: ROLE_APL, id}))
        }

    }, [])

    const {register, handleSubmit, formState: {errors}} = useForm<ProfileAplForm>({
        defaultValues: {
            login: applicant.login,
            first_name: applicant.first_name,
            email: applicant.email,
            second_name: applicant.second_name,
            phone: applicant.phone,
            surname: applicant.surname
        },
    })

    const [editMode, setEditMode] = useState<boolean>(false);

    const onEditMode = () => {
        setEditMode(!editMode)
    }

    const onSubmit = (data: ProfileAplForm) => {
        setEditMode(false)
        data.role = ROLE_APL
        data.id = id
        dispatch(updateApl(data))
    }

    return (

        <form className="profile__date" onSubmit={handleSubmit(onSubmit)}>
            <ul className="profile__info">
                <li className="profile__info-item">
                    <span>Имя: </span>
                    <span>{applicant.first_name || "Ошибка"}</span>
                </li>
                <li className="profile__info-item">
                    <span>Фамилия: </span>
                    <span>{applicant.second_name || "Ошибка"}</span>
                </li>
                <li className="profile__info-item">
                    <span>Отчество: </span>
                    <span>{applicant.surname || "Ошибка"}</span>
                </li>
                {
                    applicant.email !== null ? (
                        <li className="profile__info-item">
                            <span>Email: </span>
                            <span>{applicant.email}</span>
                        </li>
                    ) : ""
                }

            </ul>
            <ul className="profile__list-form">
                <li className="profile__form-item">
                    <div className={`login__input input ${errors.first_name ? "_error" : ""}`}>
                        <div className="input__input-wrap">
                            <label className="input__label" htmlFor="first_name">
                                Имя
                            </label>
                            <input className="input__input" id="first_name" {...register("first_name", nameField2)}
                                   type="text" disabled={!editMode}/>
                        </div>
                        {
                            errors.first_name && (
                                <div className="input__error">
                                    {errors.first_name.message}
                                </div>
                            )
                        }
                    </div>
                </li>
                <li className="profile__form-item">
                    <div className={`login__input input ${errors.second_name ? "_error" : ""}`}>
                        <div className="input__input-wrap">
                            <label className="input__label" htmlFor="second_name">
                                Фамилия
                            </label>
                            <input className="input__input" id="second_name" {...register("second_name", nameField2)}
                                   type="text" disabled={!editMode}/>
                        </div>
                        {
                            errors.second_name && (
                                <div className="input__error">
                                    {errors.second_name.message}
                                </div>
                            )
                        }
                    </div>
                </li>
                <li className="profile__form-item">
                    <div className={`login__input input ${errors.surname ? "_error" : ""}`}>
                        <div className="input__input-wrap">
                            <label className="input__label" htmlFor="surname">
                                Отчество
                            </label>
                            <input className="input__input" id="surname" {...register("surname", nameField2)}
                                   type="text" disabled={!editMode}/>
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
                <li className="profile__form-item">
                    <div className={`login__input input ${errors.login ? "_error" : ""}`}>
                        <div className="input__input-wrap">
                            <label className="input__label" htmlFor="login">
                                Логин
                            </label>
                            <input className="input__input" id="login" {...register("login", loginField)}
                                   type="text" disabled={true}/>
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
                            <input className="input__input" id="phone" {...register("phone", phoneField)}
                                   type="text" disabled={!editMode}/>
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
            <button className={`profile__btn btn ${editMode ? " _hide" : ""}`} onClick={onEditMode} type="button">
                Редактировать
            </button>
        </form>

    );
};

export default ProfileApl;