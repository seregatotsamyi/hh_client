import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {ProfileEmpForm} from "../../type/type";
import {emailField, loginField, nameField2, phoneField} from "../../utils/validators/validators";
import { ROLE_EMP} from "../../utils/consts";
import {getUser, updateEmp} from "../../store/userReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {Link} from "react-router-dom";

const ProfileEmp: React.FC = () => {
    const dispatch = useDispatch()

    const id = useSelector((state: RootState) => state.auth.userId)
    const employer = useSelector((state: RootState) => state.user.employers)
    const error = useSelector((state: RootState) => state.user.response)

    useEffect(() => {

        if (id !== null && employer.login === null){
            dispatch(getUser({role: ROLE_EMP, id}))
        }

    }, [])

    const {register, handleSubmit, formState: {errors}} = useForm<ProfileEmpForm>({
        defaultValues: {
            login: employer.login,
            name: employer.name,
            email: employer.email,
            short_name: employer.short_name,
            phone: employer.phone
        },
    })

    const [editMode, setEditMode] = useState<boolean>(false);

    const onEditMode = () => {
        setEditMode(!editMode)
    }

    const onSubmit = (data: ProfileEmpForm) => {
        setEditMode(false)
        data.role = ROLE_EMP
        data.id = id
        dispatch(updateEmp(data))
    }

    return (
        <div className="profile__content">
            <form className="profile__date" onSubmit={handleSubmit(onSubmit)}>
                <ul className="profile__info">
                    <li className="profile__info-item">
                        <span>Наименование: </span>
                        <span>{employer.name || "Ошибка"}</span>
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
                        <span><Link to="#">14 </Link> </span>
                    </li>


                </ul>
                <ul className="profile__list-form">
                    <li className="profile__form-item">
                        <div className={`login__input input ${errors.name ? "_error" : ""}`}>
                            <div className="input__input-wrap">
                                <label className="input__label" htmlFor="name">
                                    Наименование
                                </label>
                                <input className="input__input" id="name" {...register("name", loginField)}
                                       type="text" disabled={!editMode}/>
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
                        <div className={`login__input input ${errors.login ? "_error" : ""}`}>
                            <div className="input__input-wrap">
                                <label className="input__label" htmlFor="login">
                                    Логин
                                </label>
                                <input className="input__input" id="login" {...register("login", loginField)}
                                       type="text" disabled={!editMode}/>
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
                    <li className="profile__form-item">
                        <div className={`login__input input ${errors.short_name ? "_error" : ""}`}>
                            <div className="input__input-wrap">
                                <label className="input__label" htmlFor="short_name">
                                    Короткое название
                                </label>
                                <input className="input__input" id="short_name" {...register("short_name", nameField2)}
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

                </ul>
                {
                    error !== null ?(
                        <div className={"response"}>
                            {error}
                        </div>
                    ) : ""
                }

                <button className={`profile__btn btn ${editMode ? "" : " _hide"}`}  type="submit">
                    Сохранить
                </button>
                <button className={`profile__btn btn ${editMode ? " _hide" : ""}`} onClick={onEditMode} type="button">
                    Редактировать
                </button>
            </form>
        </div>
    );
};

export default ProfileEmp;