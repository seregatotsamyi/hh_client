import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AddressType, SetOptionsType} from "../type/type";
import {addressAPI, userAPI} from "../api/api";


export interface InitialStateType {
    optionsAddress: Array<object>
    optionsGender: Array<object>
    optionsSpecializations: Array<object>

    optionsEducation: Array<object>
    optionsActivities: Array<object>

    currentAddress: AddressType
}

const initialState: InitialStateType = {
    optionsAddress: [],
    currentAddress: {
        house: null,
        region: null,
        region_with_type: null,
        street_with_type: null,
        city: null,
        index: null,
        region_type: null,
        country: null
    },
    optionsSpecializations: [],

    optionsGender: [],
    optionsEducation: [],
    optionsActivities: [],
}

export const inputReducer = createSlice({
    name: 'input',
    initialState,
    reducers:
        {
            setOptionsAddress: (state, action: PayloadAction<any>) => {
                state.optionsAddress = action.payload
            },
            setOptionsGender: (state, action: PayloadAction<SetOptionsType>) => {
                state.optionsGender = action.payload.data
            },
            setOptionsEducation: (state, action: PayloadAction<SetOptionsType>) => {
                state.optionsEducation = action.payload.data
            },
            setOptionsSpecializations: (state, action: PayloadAction<SetOptionsType>) => {
                state.optionsSpecializations = action.payload.data
            },
            setOptionsActivities: (state, action: PayloadAction<SetOptionsType>) => {
                state.optionsActivities = action.payload.data
            },
            setCurrentAddress: (state, action: PayloadAction<AddressType>) => {
                state.currentAddress = action.payload
            }
        }
})


export const {
    setOptionsAddress,
    setOptionsGender,
    setOptionsEducation,
    setOptionsSpecializations,
    setOptionsActivities,
    setCurrentAddress
} = inputReducer.actions


export const fetchOptionsAddress = (stroke: string) => async (dispatch:any) => {

    try {

        const response = await addressAPI.getAddresses(stroke)

        let responseData = response.data.suggestions.map((item: any) => {
            return ({
                value: item.value,
                index: item.data.postal_code,
                region: item.data.region,
                country: item.data.country,
                region_with_type: item.data.region_with_type,
                region_type: item.data.region_type,
                city: item.data.city,
                street_with_type: item.data.street_with_type,
                house: item.data.house
            })
        })
        dispatch(setOptionsAddress(responseData))

    } catch (err: any) {
        if (err.message === "Network Error") {
            console.error("Network Error")
        } else {
            const error = err.response.data.message
            console.error(error)
        }
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
        if (err.message === "Network Error") {
            console.error("Network Error")
        } else {
            const error = err.response.data.message
            console.error(error)
        }
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
        if (err.message === "Network Error") {
            console.error("Network Error")
        } else {
            const error = err.response.data.message
            console.error(error)
        }
    }
}

export const fetchOptionsSpecializations = (id: number | null) => async (dispatch: any) => {

    try {
        let response;
        if (id) {
            response = await userAPI.getSpecializations(id)
        } else {
            response = await userAPI.getSpecializations()
        }

        dispatch(setOptionsSpecializations(response))

    } catch (err: any) {
        if (err.message === "Network Error") {
            console.error("Network Error")
        } else {
            const error = err.response.data.message
            console.error(error)
        }
    }

}


export default inputReducer.reducer