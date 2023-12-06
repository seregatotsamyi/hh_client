import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {SetOptionsType} from "../type/type";
import {addressAPI} from "../api/api";


export interface InitialStateType {
    optionsSettlements: Array<object>
    optionsStreet: Array<object>
}

const initialState: InitialStateType = {
    optionsSettlements: [],
    optionsStreet: []
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
            }
        }
})


export const {setOptionsSettlements, setOptionsStreet} = inputReducer.actions


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


export default inputReducer.reducer