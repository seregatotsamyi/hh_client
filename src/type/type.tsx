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

export type AddressType = {
    house: string | null
    region: string | null
    region_with_type: string | null
    street_with_type: string | null
    city: string | null
    index: string | null
    region_type: string | null
    country: string | null
}

export interface RegistrationApplicantType {
    firstName: string
    secondName: string
    surname: string
    phone: string
    login: string
    password: string
    email: string
    role: string,
    address: AddressType
}

export interface RegistrationFormApplicantType {
    firstName: string
    secondName: string
    surname: string
    phone: string
    login: string
    password: string
    passwordSecond: string
    email: string
    check: boolean
    role: string | typeof ROLE_APL,
    address: AddressType
}

export interface RegistrationFormEmployerType {
    login: string
    name_company: string
    email: string
    password: string
    passwordSecond: string
    phone: string
    address: AddressType
    check: boolean,
    role: string | typeof ROLE_EMP,
    short_name: string | null,
}

export interface RegistrationEmployerType {
    login: string
    name_company: string
    email: string
    password: string
    phone: string
    address: AddressType
    role: string | typeof ROLE_EMP,
    short_name: string | null,
}

export interface loginFormType {
    login: string
    password: string
    role: string
}

export type typeRoll = typeof ROLE_EMP | typeof ROLE_APL

export interface ProfileEmpForm {
    role: string
    email: string | null
    short_name: string | null
    phone: undefined | null
    about: string | null
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
    payment_lower: number
    payment_upper: number
    gender_id: number
    education_id: number
    specialization_array: Array<string>
    about: string
    experience: string
    schedules: Array<string>
    skills: Array<string>
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