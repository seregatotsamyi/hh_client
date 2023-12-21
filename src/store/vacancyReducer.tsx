import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {vacancyAPI} from "../api/api";
import {createVacancyFormType, vacancyType} from '../type/type';
import {loadingStatus} from "./appReducer";
import {setResponse} from "./userReducer";


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
    isCountVacancyUser: number | null
    pageSize: number
    currentPage: number
    vacancy: Array<object> | null
    totalVacancyCount: number | null
    vacancyItem: any,
    error: string | null
}

const initialState: InitialStateType = {
    currentVacancy: null,
    isSuccessCreateVacancy: false,
    isCountVacancyUser: null,
    pageSize: 10,
    currentPage: 1,
    vacancy: null,
    totalVacancyCount: null,
    vacancyItem: {},
    error: null
}

export const vacancyReducer = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setCurrentVacancy: (state, action: PayloadAction<vacancyType>) => {
            state.currentVacancy = action.payload
        },
        setIsSuccessCreateVacancy: (state, action: PayloadAction<boolean>) => {
            state.isSuccessCreateVacancy = action.payload
        },
        setCountVacancyUser: (state, action: PayloadAction<number>) => {
            state.isCountVacancyUser = action.payload
        },
        setPageSize: (state, action: PayloadAction<number>) => {
            state.pageSize = action.payload
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        },
        setVacancy: (state, action: PayloadAction<{ vacancy: Array<object>, totalVacancyCount: number }>) => {
            state.vacancy = action.payload.vacancy
            state.totalVacancyCount = action.payload.totalVacancyCount
        },
        setVacancyItem: (state, action: PayloadAction<Object>) => {
            state.vacancyItem = action.payload
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        },

    }
})


export const {
    setCurrentVacancy,
    setIsSuccessCreateVacancy,
    setCountVacancyUser,
    setPageSize,
    setCurrentPage,
    setVacancy,
    setVacancyItem,
    setError
} = vacancyReducer.actions


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

        dispatch(setCurrentVacancy(dataForDispatch))

        const CountVacancy = await vacancyAPI.getCountVacancy(response.data.employer_id)
        dispatch(setCountVacancyUser(CountVacancy.data))


        dispatch(setIsSuccessCreateVacancy(true))

    } catch (err: any) {
        if (err.message == "Network Error") {
            console.error("Network Error")
        } else {
            const error = err.response.data.message
            console.error(error)
        }
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

export const setVacancyAC = (page: number, pageSize: number, userId: number | null) => async (dispatch: any) => {
    dispatch(loadingStatus(true))

    try {
        const response = await vacancyAPI.getVacancy(page, pageSize, userId);
        let ObjForSet = {
            totalVacancyCount: response.data.totalCount,
            vacancy: [{}]
        }


        let ArrayVacancy: Array<object> = response.data.vacanceis.map((item: any) => {
            let newItem = {
                id: item.id,
                name: item.name,
                payment: [item.payment_lower, item.payment_upper],
                employer: item.employer.name,
                employerId: item.employer_id,
                address: item.employer.address.settlement,
                status: item.status
            }
            return newItem
        })


        ObjForSet.vacancy = ArrayVacancy

        dispatch(setPageSize(pageSize))
        dispatch(setCurrentPage(page))
        dispatch(setVacancy(ObjForSet))

    } catch (err: any) {
        if (err.message == "Network Error") {
            console.error("Network Error")
        } else {
            const error = err.response.data.message
            console.error(error)
        }
    }
    dispatch(loadingStatus(false))
}

export const setVacancyItemAC = (id: number) => async (dispatch: any) => {
    dispatch(loadingStatus(true))

    try {
        const response = await vacancyAPI.getItem(id);

        let ObjForSet = {
            id: response.data.id,
            name: response.data.name,
            payment: [response.data.payment_lower, response.data.payment_upper],
            employer: response.data.employer.name,
            employerId: response.data.employer_id,
            address: response.data.employer.address.settlement.settlement,
            gender: response.data.gender.name,
            education: response.data.education.education_value,
            age: [response.data.age_lower, response.data.age_upper],
            availability_social_package: response.data.availability_social_package,
            registration_work_book: response.data.registration_work_book,
            communication_skills: response.data.communication_skills,
            activities: response.data.activities,
            duties: response.data.duties,
            status: response.data.status,
            start_date: response.data.start_date,
            end_date: response.data.end_date
        }
        dispatch(setVacancyItem(ObjForSet))

    } catch (err: any) {
        if (err.message == "Network Error") {
            console.error("Network Error")
        } else {
            const error = err.response.data.message
            dispatch(setError(error))
        }
    }
    dispatch(loadingStatus(false))
}

export default vacancyReducer.reducer