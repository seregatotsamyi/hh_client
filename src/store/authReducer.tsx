import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {authAPI} from '../api/api'
import {
    loginFormType,
    RegistrationFormApplicantType, RegistrationFormEmployerType,
    SetAuthUserDataJWTType,
    SetAuthUserDataType,
    SetErrorType
} from "../type/type";
import {jwtDecode} from "jwt-decode";
import React from "react";


export interface InitialStateType {
    isAuth: boolean,
    login: string | null,
    userId: number | null,
    error: string | null
    role: string | null
    isSuccessRegistration: boolean
}

const initialState: InitialStateType = {
    isAuth: false,
    login: null,
    userId: null,
    error: null,
    role: null,
    isSuccessRegistration: false
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
        },

        setError: (state, action: PayloadAction<SetErrorType>) => {
            state.error = action.payload.error
        },

        unSetError: (state) => {
            state.error = null
        },

        isSuccessRegistration: (state) => {
            state.isSuccessRegistration = !state.isSuccessRegistration
        }
    },
})


export const {setAuthData, setError, unSetError, isSuccessRegistration, removeAuthData} = authReducer.actions


export const loginApl = (data: loginFormType) => async (dispatch: any) => {
    try {
        const response = await authAPI.loginApl(data.login, data.password, data.role)
        const jwt: SetAuthUserDataJWTType = jwtDecode(response.data.token)
        localStorage.setItem('token', response.data.token)
        dispatch(unSetError())

        let dataForReducer = {userId: jwt.id, login: jwt.login, role: jwt.role, isAuth: true}
        dispatch(setAuthData(dataForReducer))

    } catch (err: any) {
        const error = err.response
        dispatch(setError({error}))
    }
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
        const error = err.response
        dispatch(setError({error}))
    }
}


export const registerApl = (data: RegistrationFormApplicantType) => async (dispatch: any) => {
    try {
        const response = await authAPI.registerApl(data.firstName, data.secondName, data.surname, data.phone, data.login, data.password, data.email, data.role)
        localStorage.setItem('token', response.data.token)
        const jwt = jwtDecode(response.data.token)
        dispatch(unSetError())
        dispatch(isSuccessRegistration())

    } catch (err: any) {
        const error = err.response
        dispatch(setError({error}))
    }
}

export const registerEmp = (data: RegistrationFormEmployerType) => async (dispatch: any) => {
    try {
        const response = await authAPI.registerEmp(
            data.login,
            data.name,
            data.email,
            data.password,
            data.phone,
            data.settlements_id,
            data.street_id,
            data.number_house,
            data.role,
            data.short_name
        )
        localStorage.setItem('token', response.data.token)
        const jwt = jwtDecode(response.data.token)
        dispatch(unSetError())
        dispatch(isSuccessRegistration())

    } catch (err: any) {
        const error = err.response
        dispatch(setError({error}))
    }
}


export default authReducer.reducer