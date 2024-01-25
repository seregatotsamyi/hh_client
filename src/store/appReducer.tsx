import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {authAPI} from "../api/api";
import {setAuthData} from "./authReducer";
import {SetAuthUserDataJWTType} from "../type/type";
import {jwtDecode} from "jwt-decode";
import {typeAppDesktop} from "../utils/consts";


export interface InitialStateType {
    loading: boolean,
    typeApp: string,
    showMobMenu: boolean
}

const initialState: InitialStateType = {
    loading: true,
    typeApp: typeAppDesktop,
    showMobMenu: false
}

export const appReducer = createSlice({
    name: 'app',
    initialState,
    reducers: {
        loadingStatus: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        setTypeApp: (state, action: PayloadAction<string>) => {
            state.typeApp = action.payload
        },
        showMobMenu: (state, action: PayloadAction<boolean>) => {
            state.showMobMenu = action.payload
        },
    }
})


export const {loadingStatus, setTypeApp, showMobMenu} = appReducer.actions


export const initializeApp = () => async (dispatch: any) => {

    dispatch(loadingStatus(true))

    try {

        const response = await authAPI.me()
        const jwt: SetAuthUserDataJWTType = jwtDecode(response.data.token)
        let dataForReducer = {userId: jwt.id, login: jwt.login, role: jwt.role, isAuth: true}
        dispatch(setAuthData(dataForReducer))

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


export default appReducer.reducer