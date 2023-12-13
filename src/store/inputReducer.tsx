import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {SetOptionsType} from "../type/type";
import {addressAPI, userAPI} from "../api/api";
import {loadingStatus} from "./appReducer";


export interface InitialStateType {
    optionsSettlements: Array<object>
    optionsStreet: Array<object>
    optionsGender: Array<object>
    optionsEducation: Array<object>
    optionsDuties: Array<object>
    optionsActivities: Array<object>
}

const initialState: InitialStateType = {
    optionsSettlements: [],
    optionsStreet: [],
    optionsGender: [],
    optionsEducation: [],
    optionsDuties: [],
    optionsActivities: []
}

export const inputReducer = createSlice({
    name: 'input',
    initialState,
    reducers:
        {
            setOptionsSettlements: (state, action: PayloadAction<SetOptionsType>) => {
                state.optionsSettlements = action.payload.data
            },
            setOptionsStreet: (state, action: PayloadAction<SetOptionsType>) => {
                state.optionsStreet = action.payload.data
            },
            setOptionsGender: (state, action: PayloadAction<SetOptionsType>) => {
                state.optionsGender = action.payload.data
            },
            setOptionsEducation: (state, action: PayloadAction<SetOptionsType>) => {
                state.optionsEducation = action.payload.data
            },
            setOptionsDuties: (state, action: PayloadAction<SetOptionsType>) => {
                state.optionsDuties = action.payload.data
            },
            setOptionsActivities: (state, action: PayloadAction<SetOptionsType>) => {
                state.optionsActivities = action.payload.data
            }
        }
})


export const {
    setOptionsSettlements,
    setOptionsStreet,
    setOptionsGender,
    setOptionsEducation,
    setOptionsDuties,
    setOptionsActivities
} = inputReducer.actions


export const fetchOptionsSettlements = (stroke: string) => async (dispatch: any) => {
    try {

        const response = await addressAPI.getSettlements(stroke)
        dispatch(setOptionsSettlements(response))

    } catch (err: any) {
        const error = err.response.data.message
        console.log(error)
    }
}

export const fetchOptionsStreet = (stroke: string) => async (dispatch: any) => {
    try {

        const response = await addressAPI.getStreet(stroke)
        dispatch(setOptionsStreet(response))

    } catch (err: any) {
        const error = err.response.data.message
        console.log(error)
    }
}

export const fetchOptionsGender = (id: number | null) => async (dispatch: any) => {
    try {
        let response;
        if (id) {
            response = await userAPI.getGender(id)
        } else {
            response = await userAPI.getGender()
        }

        dispatch(setOptionsGender(response))

    } catch (err: any) {
        const error = err.response.data.message
        console.log(error)
    }
}

export const fetchOptionsEducation = (id: number | null) => async (dispatch: any) => {
    try {
        let response;
        if (id) {
            response = await userAPI.getEducation(id)
        } else {
            response = await userAPI.getEducation()
        }

        dispatch(setOptionsEducation(response))

    } catch (err: any) {
        const error = err.response.data.message
        console.log(error)
    }
}

export const fetchOptionsDuties = (id: number | null) => async (dispatch: any) => {

    try {
        let response;
        if (id) {
            response = await userAPI.getDuties(id)
        } else {
            response = await userAPI.getDuties()
        }

        dispatch(setOptionsDuties(response))

    } catch (err: any) {
        const error = err.response.data.message
        console.log(error)
    }

}

export const fetchOptionsActivities = (id: number | null) => async (dispatch: any) => {

    try {
        let response;
        if (id) {
            response = await userAPI.getActivities(id)
        } else {
            response = await userAPI.getActivities()
        }

        dispatch(setOptionsActivities(response))

    } catch (err: any) {
        const error = err.response.data.message
        console.log(error)
    }

}

export default inputReducer.reducer