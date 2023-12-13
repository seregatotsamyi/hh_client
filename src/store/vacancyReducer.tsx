import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {authAPI, vacancyAPI} from "../api/api";
import {setAuthData} from "./authReducer";
import {jwtDecode} from "jwt-decode";
import {createVacancyFormType, vacancyType} from '../type/type';
import {AxiosResponse} from 'axios';
import {loadingStatus} from "./appReducer";


export interface InitialStateType {
    currentVacancy: {
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
    } | null
    isSuccessCreateVacancy: boolean
}

const initialState: InitialStateType = {
    currentVacancy: null,
    isSuccessCreateVacancy: false
}

export const vacancyReducer = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setVacancy: (state, action: PayloadAction<vacancyType>) => {
            state.currentVacancy = action.payload
        },
        setIsSuccessCreateVacancy: (state, action: PayloadAction<boolean>) => {
            state.isSuccessCreateVacancy = action.payload
        }

    }
})


export const {setVacancy, setIsSuccessCreateVacancy} = vacancyReducer.actions


export const createVacancy = (vacancy: createVacancyFormType) => async (dispatch: any) => {
    dispatch(loadingStatus(true))
    try {

        const response = await vacancyAPI.createVacancy(vacancy)

        let dataForDispatch: vacancyType = {
            id: response.data.id,
            emp_id: response.data.emp_id,
            name: response.data.name,
            age_lower: response.data.age_lower,
            age_upper: response.data.age_upper,
            payment_lower: response.data.payment_lower,
            payment_upper: response.data.payment_upper,
            registration_work_book: response.data.registration_work_book,
            availability_social_package: response.data.availability_social_package,
            start_date: response.data.start_date,
            end_date: response.data.end_date,
            gender_id: response.data.gender_id,
            education_id: response.data.education_id
        }

        dispatch(setVacancy(dataForDispatch))
        dispatch(setIsSuccessCreateVacancy(true))

    } catch (err: any) {
        const error = err.response.data.message
        console.log(error)
    }
    dispatch(loadingStatus(false))

}


export default vacancyReducer.reducer