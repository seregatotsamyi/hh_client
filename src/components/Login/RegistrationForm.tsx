import React, {useState} from 'react';
import { typeRoll } from '../../type/type';
import {LOGIN_PATH, PROFILE_PATH, ROLE_APL, ROLE_EMP} from '../../utils/consts';
import RegistrationFormApplicant from "./RegistrationFormApplicant";
import RegistrationFormEmployers from './RegistrationFormEmployers';
import {useAppSelector} from "../../store/hooks";
import {RootState} from "../../store/store";
import {Navigate} from "react-router-dom";

const RegistrationForm = () => {

    const [typeRegister, setTypeRegister] = useState<typeRoll>(ROLE_EMP);

    const editTypeRegister = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target as { value: typeRoll };
        setTypeRegister(value)
    }

    const isAuth = useAppSelector((state: RootState) => state.auth.isAuth)
    const inRegistration = useAppSelector((state: RootState) => state.auth.inRegistration)

    if (isAuth) {
        return <Navigate to={PROFILE_PATH}/>
    }

    if (inRegistration) {
        return  <Navigate to={LOGIN_PATH} />
    }


    return (
        <>
            <div className="login__title _h2">
                Регистриция
            </div>

            <div className="login__grid">
                <div className="login__row">
                    <div className="login__radio">
                        <div className="login__radio-text">
                            Зарегистрироваться как:
                        </div>
                        <div className="login__radio-inputs">
                            <div className="login__input input">
                                <input onInput={editTypeRegister} value={ROLE_EMP} className="input__input  _radio"
                                       type="radio" name="r" id="r-1" defaultChecked={true}/>
                                <label className="input__label btn btn_2 _radio" htmlFor="r-1">
                                    Даватель
                                </label>
                            </div>
                            <div className="login__input input">
                                <input onInput={editTypeRegister} value={ROLE_APL}
                                       className="input__input _radio" type="radio" name="r" id="r-2"/>
                                <label className="input__label _radio btn btn_2" htmlFor="r-2">
                                    Искатель
                                </label>
                            </div>
                        </div>


                    </div>

                </div>

                {typeRegister === "employers" ? <RegistrationFormEmployers/> : <RegistrationFormApplicant/>}
            </div>


        </>
    );
};

export default RegistrationForm;