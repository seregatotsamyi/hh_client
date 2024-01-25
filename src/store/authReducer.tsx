import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {authAPI} from '../api/api'
import {
    loginFormType,
    RegistrationApplicantType,
    RegistrationEmployerType,
    SetAuthUserDataJWTType,
    SetAuthUserDataType,
    SetErrorType
} from "../type/type";
import {jwtDecode} from "jwt-decode";
import {loadingStatus} from "./appReducer";


export interface InitialStateType {
    isAuth: boolean,
    login: string | null,
    userId: number | null,
    error: string | null,
    role: string | null,
    inLogging: boolean,
    inRegistration: boolean
}

const initialState: InitialStateType = {
    isAuth: false,
    login: null,
    userId: null,
    error: null,
    role: null,
    inLogging: false,
    inRegistration: false
}

export const authReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        setAuthData: (state, action: PayloadAction<SetAuthUserDataType>) => {
            Object.assign(state, action.payload)
        },

        removeAuthData: (state) => {
            state.isAuth = false
            state.login = null
            state.userId = null
            state.role = null
            state.inLogging = false
            state.inRegistration = false
        },

        setError: (state, action: PayloadAction<SetErrorType>) => {
            state.error = action.payload.error
        },

        unSetError: (state) => {
            state.error = null
        },

        inLoggingSet: (state, action: PayloadAction<boolean>) => {
            state.inLogging = action.payload
        },

        inRegistrationSet: (state, action: PayloadAction<boolean>) => {
            state.inRegistration = action.payload
        }
    },
})


export const {setAuthData, setError, unSetError, removeAuthData, inLoggingSet, inRegistrationSet} = authReducer.actions


export const loginApl = (data: loginFormType) => async (dispatch: any) => {

    dispatch(loadingStatus(true))

    try {
        dispatch(inRegistrationSet(false))
        const response = await authAPI.loginApl(data.login, data.password, data.role)
        const jwt: SetAuthUserDataJWTType = jwtDecode(response.data.token)
        localStorage.setItem('token', response.data.token)
        dispatch(unSetError())
        let dataForReducer = {userId: jwt.id, login: jwt.login, role: jwt.role, isAuth: true}
        dispatch(setAuthData(dataForReducer))
        dispatch(inLoggingSet(true))
    } catch (err: any) {
        if (err.message === "Network Error") {
            dispatch(setError({error: "Network Error"}))
        } else {
            const error = err.response.data.message
            dispatch(setError({error}))
        }
    }

    dispatch(loadingStatus(false))
}

export const loginEmp = (data: loginFormType) => async (dispatch: any) => {
    try {
        const response = await authAPI.loginEmp(data.login, data.password, data.role)
        const jwt: SetAuthUserDataJWTType = jwtDecode(response.data.token)
        localStorage.setItem('token', response.data.token)
        dispatch(unSetError())

        let dataForReducer = {userId: jwt.id, login: jwt.login, role: jwt.role, isAuth: true}
        dispatch(setAuthData(dataForReducer))

    } catch (err: any) {
        if (err.message === "Network Error") {
            dispatch(setError({error: "Network Error"}))
        } else {
            const error = err.response.data.message
            dispatch(setError({error}))
        }

    }
}

export const registerApl = (data: RegistrationApplicantType) => async (dispatch: any) => {

    dispatch(loadingStatus(true))

    try {

        dispatch(inLoggingSet(false))

        await authAPI.registerApl(
            data.firstName,
            data.secondName,
            data.surname,
            data.phone,
            data.login,
            data.password,
            data.email,
            data.role,
            data.address)

        dispatch(unSetError())

        dispatch(inRegistrationSet(true))

    } catch (err: any) {

        dispatch(inRegistrationSet(false))

        if (err.message === "Network Error") {

            dispatch(setError({error: "Network Error"}))

        } else {

            const error = err.response.data.message
            dispatch(setError({error}))

        }
    }

    dispatch(loadingStatus(false))

}

export const registerEmp = (data: RegistrationEmployerType) => async (dispatch: any) => {

    dispatch(loadingStatus(true))

    try {

        await authAPI.registerEmp(
            data.login,
            data.name_company,
            data.email,
            data.password,
            data.phone,
            data.address,
            data.role,
            data.short_name,
        )

        dispatch(unSetError())

        dispatch(inRegistrationSet(true))

    } catch (err: any) {

        dispatch(inRegistrationSet(false))

        if (err.message === "Network Error") {

            dispatch(setError({error: "Network Error"}))

        } else {

            console.log(err)
            const error = err.response.data.message
            dispatch(setError({error}))

        }
    }

    dispatch(loadingStatus(false))
}


export default authReducer.reducer