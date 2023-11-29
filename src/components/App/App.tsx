import {Outlet} from "react-router-dom";
import React from "react";
import {removeAuthData} from "../../store/authReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";


export const App = function App() {
    const dispatch = useDispatch()
    const isAuth = useSelector((state: RootState) => state.auth.isAuth)

    const unLogin = () => {
        dispatch(removeAuthData())
        localStorage.setItem('token', "")
    }

    return (<>

        Главная страница
        {
            isAuth &&   <button onClick={unLogin}>Выйти</button>
        }


        <Outlet/>

    </>);
}