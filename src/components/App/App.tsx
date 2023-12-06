import {Outlet} from "react-router-dom";
import React from "react";
import {removeAuthData} from "../../store/authReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {ROLE_APL, ROLE_EMP} from "../../utils/consts";


export const App = function App() {
    const dispatch = useDispatch()
    const isAuth = useSelector((state: RootState) => state.auth.isAuth)
    const role = useSelector((state: RootState) => state.auth.role)

    const unLogin = () => {
        dispatch(removeAuthData())
        localStorage.setItem('token', "")
    }

    return (<>

        Главная страница
        {
            role === ROLE_EMP && "Работодатель"
        }
        {
            role === ROLE_APL && "Соискатель"
        }
        {
            isAuth &&   <button onClick={unLogin}>Выйти</button>
        }


        <Outlet/>

    </>);
}