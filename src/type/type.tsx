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
    check: boolean
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

export interface ProfileEmpForm {
    login: string | null
    role: string
    name: string | null
    email: string | null
    short_name: string | null
    phone: string | null
    id: number | null
}

export type getUserType = {
    role: string
    id: number
}

export interface ProfileAplForm {
    login: string | null
    role: string
    first_name: string | null
    email: string | null
    second_name: string | null
    phone: string | null
    surname: string | null
    id: number | null
}

export interface createVacancyFormType {
    name: string,
    emp_id: number | null,
    age_lower: number
    age_upper: number
    payment_lower: number
    payment_upper: number
    registration_work_book: boolean
    availability_social_package: boolean
    communication_skills: boolean
    start_date: string
    end_date: string
    gender_id: number
    education_id: number
    duties_array: Array<string>
    kind_activities_array: Array<string>
}

export type vacancyType = {
    id: number
    emp_id: number
    name: string
    age_lower: number
    age_upper: number
    payment_lower: number
    payment_upper: number
    registration_work_book: boolean
    availability_social_package: boolean
    start_date: string
    end_date: string
    gender_id: number
    education_id: number
}

export interface ReportOneType {
    post: string
    start_date: string
    end_date: string
}