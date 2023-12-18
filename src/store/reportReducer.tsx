import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {authAPI, reportApi} from '../api/api'
import {
    loginFormType,
    RegistrationFormApplicantType, RegistrationFormEmployerType,
    SetAuthUserDataJWTType,
    SetAuthUserDataType,
    SetErrorType, SetOptionsType
} from "../type/type";
import {jwtDecode} from "jwt-decode";
import React from "react";


export interface InitialStateType {
    reportOne: Array<object>
    reportTwo: { name: string | null, count: number | null }
    reportThree: Array<object>
    flag: boolean
}

const initialState: InitialStateType = {
    reportOne: [],
    reportTwo: {name: null, count: null},
    flag: false,
    reportThree: []
}

export const reportReducer = createSlice({
    name: 'report',
    initialState,
    reducers: {
        changeFlag: (state) => {
            state.flag = !state.flag
        },
        setVacancyReportOne: (state, action: PayloadAction<Array<object>>) => {
            state.reportOne = action.payload
        },
        setVacancyReportThree: (state, action: PayloadAction<Array<object>>) => {
            state.reportThree = action.payload
        },
        setReportTwo: (state, action: PayloadAction<{ name: string | null, count: number | null }>) => {
            state.reportTwo = action.payload
        }
    },
})


export const {setVacancyReportOne, changeFlag, setReportTwo, setVacancyReportThree} = reportReducer.actions


export const reportOneAC = (post: string, date_start: string, date_end: string) => async (dispatch: any) => {
    try {
        const response: any = await reportApi.reportOne(post, date_start, date_end)

        dispatch(setVacancyReportOne(response.data))
        dispatch(changeFlag())

    } catch (err: any) {
        const error = err.response

    }
}

export const reportThreeAC = (date_start: string, date_end: string) => async (dispatch: any) => {
    try {
        const response: any = await reportApi.reportThree(date_start, date_end)

        dispatch(setVacancyReportThree(response.data))
        dispatch(changeFlag())

    } catch (err: any) {
        const error = err.response

    }
}

export const reportTwoAC = (date_start: string, date_end: string) => async (dispatch: any) => {
    try {
        const response: any = await reportApi.reportTwo(date_start, date_end)
        if (response.data.length === 0){
            dispatch(setReportTwo({name: null, count: null}))
        } else {
            dispatch(setReportTwo(response.data[0]))
        }

        dispatch(changeFlag())

    } catch (err: any) {
        const error = err.response

    }
}


export default reportReducer.reducer