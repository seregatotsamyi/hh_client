import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {vacancyAPI} from "../api/api";
import {createVacancyFormType, vacancyType} from '../type/type';
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
    isSuccessCreateVacancy: boolean,
    isCountVacancyUser: number | null
}

const initialState: InitialStateType = {
    currentVacancy: null,
    isSuccessCreateVacancy: false,
    isCountVacancyUser: null
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
        },
        setCountVacancyUser: (state, action: PayloadAction<number>) => {
            state.isCountVacancyUser = action.payload
        }

    }
})


export const {setVacancy, setIsSuccessCreateVacancy, setCountVacancyUser} = vacancyReducer.actions


export const createVacancy = (vacancy: createVacancyFormType) => async (dispatch: any) => {
    dispatch(loadingStatus(true))

    try {
        const response = await vacancyAPI.createVacancy(vacancy)

        let dataForDispatch: vacancyType = {
            id: response.data.id,
            emp_id: response.data.employer_id,
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

        const CountVacancy = await vacancyAPI.getCountVacancy(response.data.employer_id)
        console.log(CountVacancy.data, response.data.emp_id)
        dispatch(setCountVacancyUser(CountVacancy.data))


        dispatch(setIsSuccessCreateVacancy(true))

    } catch (err: any) {
        const error = err.response.data.message
        console.log(error)
    }
    dispatch(loadingStatus(false))
}

export const setCountVacancy = (id: number | null = null) => async (dispatch: any) => {
    dispatch(loadingStatus(true))

    try {
        const response = await vacancyAPI.getCountVacancy(id)

        dispatch(setCountVacancyUser(response.data))

    } catch (err: any) {
        const error = err.response.data.message
        console.log(error)
    }
    dispatch(loadingStatus(false))
}


export default vacancyReducer.reducer