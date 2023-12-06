import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {SetOptionsType} from "../type/type";
import {addressAPI} from "../api/api";




export interface InitialStateType {
    options: Array<object>
}

const initialState: InitialStateType = {
    options: []
}

export const inputReducer = createSlice({
    name: 'input',
    initialState,
    reducers:{
        setOptions: (state, action: PayloadAction<SetOptionsType>) => {
            state.options = action.payload.data
        },
    }
})


export const {setOptions} = inputReducer.actions


export const fetchOptions = (stroke:string) => async (dispatch: any) => {
    try {

        const response = await addressAPI.get(stroke)
        dispatch(setOptions(response))

    } catch (err: any) {
        const error = err.response.data.message
        console.log(error)
    }
}


export default inputReducer.reducer