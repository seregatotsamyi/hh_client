import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {authAPI} from "../api/api";
import {setAuthData} from "./authReducer";
import {SetAuthUserDataJWTType} from "../type/type";
import {jwtDecode} from "jwt-decode";


export interface InitialStateType {
    loading: boolean,
    width: number,
    showMobMenu: boolean
}

const initialState: InitialStateType = {
    loading: true,
    width: 1380,
    showMobMenu: false
}

export const appReducer = createSlice({
    name: 'app',
    initialState,
    reducers: {
        loadingStatus: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        setWidth: (state, action: PayloadAction<number>) => {
            state.width = action.payload
        },
        showMobMenu: (state, action: PayloadAction<boolean>) => {
            state.showMobMenu = action.payload
        },
    }
})


export const {loadingStatus, setWidth, showMobMenu} = appReducer.actions


export const initializeApp = () => async (dispatch: any) => {

    try {
        const response = await authAPI.me()
        const jwt: SetAuthUserDataJWTType = jwtDecode(response.data.token)
        let dataForReducer = {userId: jwt.id, login: jwt.login, role: jwt.role, isAuth: true}
        dispatch(setAuthData(dataForReducer))

    } catch (err: any) {
        const error = err.response.data.message
        console.log(error)
    }

    dispatch(loadingStatus(false))
}


export default appReducer.reducer