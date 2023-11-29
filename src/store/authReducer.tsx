import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { authAPI } from '../api/api'
import {SetAuthUserDataType} from "../type/type";


export interface InitialStateType {
    isAuth: boolean,
    login: string | null,
    userId: number | null
}

const initialState: InitialStateType = {
    isAuth: false,
    login: null,
    userId: null
}

export const authReducer = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false,
    },
    reducers: {
        setAuth: (state) => {
            console.log(state)
            state.isAuth = !state.isAuth
        },
        setAuthData: (state, action:PayloadAction<SetAuthUserDataType>) => {
            console.log(action)
        }
    },
})

export const { setAuth } = authReducer.actions

export const { setAuthData } = authReducer.actions

export const login = () => async (dispatch:any) => {
    try {
        // let response = await authAPI.me()
        // console.log("getAuthUserData", response)
        let id = 312
        let login = "fsdasdf"
        dispatch(setAuthData({id, login}))


    } catch (err: any) {
        if (err.status === 401) {
            console.log("error 401")
        }

    }
}


export default authReducer.reducer