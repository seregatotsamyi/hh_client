import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {userAPI, vacancyAPI} from '../api/api'
import {
    getUserType, ProfileAplForm, ProfileEmpForm
} from "../type/type";
import {loadingStatus} from "./appReducer";
import {ROLE_EMP} from "../utils/consts";
import { setCountVacancyUser} from "./vacancyReducer";


export interface InitialStateType {
    employers: {
        login: string | null
        name: string | null
        short_name: string | null
        email: string | null
        phone: string | null
    }
    applicant: {
        login: string | null
        first_name: string | null
        second_name: string | null
        email: string | null
        phone: string | null
        surname: string | null
    },
    response: string | null,

}

const initialState: InitialStateType = {
    employers: {
        login: null,
        name: null,
        email: null,
        short_name: null,
        phone: null,
    },
    applicant: {
        login: null,
        first_name: null,
        second_name: null,
        email: null,
        phone: null,
        surname: null
    },
    response: null,

}

export const userReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {

        setEmployersData: (state, action: PayloadAction<ProfileEmpForm>) => {
            Object.assign(state.employers, action.payload)
        },
        setApplicantData: (state, action: PayloadAction<ProfileEmpForm>) => {
            Object.assign(state.applicant, action.payload)
        },
        setResponse: (state, action: PayloadAction<string>) => {
            state.response = action.payload
        },


    },
})


export const {setEmployersData, setApplicantData, setResponse} = userReducer.actions

export const getUser = (data: getUserType) => async (dispatch: any) => {

    dispatch(loadingStatus(true))

    try {
        const role = data.role

        if (role === ROLE_EMP) {
            const response = await userAPI.getEmp(data.id)
            dispatch(setEmployersData(response.data))
            const CountVacancy = await vacancyAPI.getCountVacancy(response.data.id)
            dispatch(setCountVacancyUser(CountVacancy.data))
        } else {
            const response = await userAPI.getApl(data.id)
            dispatch(setApplicantData(response.data))
        }


    } catch (err: any) {
        const error = err.response.data.message
        console.log(error)
    }

    dispatch(loadingStatus(false))
}

export const updateEmp = (data: ProfileEmpForm) => async (dispatch: any) => {

    dispatch(loadingStatus(true))
    try {
        const response = await userAPI.updateEmp(data)
        dispatch(setEmployersData(response.data))
        dispatch(setResponse("Успешно обновленено"))
    } catch (err: any) {
        const error = err.response.data.message
        dispatch(setResponse(error))
        console.log(error)
    }

    dispatch(loadingStatus(false))
}

export const updateApl = (data: ProfileAplForm) => async (dispatch: any) => {

    dispatch(loadingStatus(true))
    try {
        const response = await userAPI.updateApl(data)
        dispatch(setApplicantData(response.data))
        dispatch(setResponse("Успешно обновленено"))
    } catch (err: any) {
        const error = err.response.data.message
        dispatch(setResponse(error))
        console.log(error)
    }

    dispatch(loadingStatus(false))
}

export default userReducer.reducer