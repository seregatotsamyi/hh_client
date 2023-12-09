import {ROLE_APL, ROLE_EMP} from "../utils/consts";

export type SetAuthUserDataType = {
    userId: number | null,
    login: string | null,
    role: string | null
}
export type SetAuthUserDataJWTType = {
    id: number,
    login: string,
    role: string
}

export type SetErrorType = {
    error: string
}

export type SetOptionsType = {
    data: Array<object>
}
export type OptionType = {
    value: number,
    label: string
}

export interface RegistrationFormApplicantType {
    firstName: string
    secondName: string
    surname: string
    phone: string
    login: string
    password: string
    passwordSecond: string
    email: string | null
    check: boolean,
    role: string
}

export interface RegistrationFormEmployerType {
    login: string
    name: string
    email: string
    password: string
    passwordSecond: string
    phone: string
    settlements_id: number
    street_id: number
    number_house: number
    check: boolean,
    role: string,
    short_name: string | null
}

export interface loginFormType {
    login: string
    password: string
    role: string
}
export type typeRoll = typeof ROLE_EMP | typeof ROLE_APL