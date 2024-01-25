import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {userAPI, vacancyAPI} from '../api/api'
import {
    getUserType, ProfileAplForm, ProfileEmpForm
} from "../type/type";
import {loadingStatus} from "./appReducer";
import {ROLE_EMP} from "../utils/consts";
import {setCountVacancyUser} from "./vacancyReducer";


export interface InitialStateType {
    employers: {
        login: string | null
        name_company: string | null
        short_name: string | null
        email: string | null
        phone: undefined | null
        about: string | null
    }
    applicant: {
        login: string | null
        first_name: string | null
        second_name: string | null
        email: string | null
        phone: undefined | null
        surname: string | null
        about: string | null
    },
    response: string | null,
}

const initialState: InitialStateType = {
    employers: {
        login: null,
        name_company: null,
        email: null,
        short_name: null,
        phone: null,
        about: null
    },
    applicant: {
        login: null,
        first_name: null,
        second_name: null,
        email: null,
        phone: null,
        surname: null,
        about: null
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
        if (err.message === "Network Error") {
            console.error("Network Error")
        } else {
            const error = err.response.data.message
            console.error(error)
        }
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

        if (err.message === "Network Error") {
            console.error("Network Error")
        } else {
            const error = err.response.data.message
            dispatch(setResponse(error))
        }

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

        if (err.message === "Network Error") {
            console.error("Network Error")
        } else {
            const error = err.response.data.message
            dispatch(setResponse(error))
        }

    }

    dispatch(loadingStatus(false))
}

export default userReducer.reducer