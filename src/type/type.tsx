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

export interface loginFormType {
    login: string
    password: string
    role: string
}