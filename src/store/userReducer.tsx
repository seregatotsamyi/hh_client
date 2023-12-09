import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {authAPI} from '../api/api'
import {
    loginFormType,
    RegistrationFormApplicantType, RegistrationFormEmployerType,
    SetAuthUserDataJWTType,
    SetAuthUserDataType,
    SetErrorType
} from "../type/type";
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

export const userReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {

        setUserData: (state, action: PayloadAction<SetAuthUserDataType>) => {
            Object.assign(state, action.payload)
        },


    },
})


export const {setUserData} = userReducer.actions



export default userReducer.reducer