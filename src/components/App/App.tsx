import {Outlet, useLocation} from "react-router-dom";
import React, {useEffect} from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {showMobMenu} from "../../store/appReducer";
import {RootState} from "../../store/store";
import Promo from "../Promo/Promo";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Loading from "../Loading/Loading";


export const App = function App() {

    const dispatch = useAppDispatch()
    const location = useLocation();

    const isAuth = useAppSelector((state: RootState) => state.auth.isAuth)
    const loading = useAppSelector((state: RootState) => state.app.loading)

    useEffect(() => {
        dispatch(showMobMenu(false))
    }, [location, dispatch]);

    return (<>

        {loading ? <Loading/> : ''}

        <Header/>

        <main className="main">

            {
                isAuth? "" : <Promo/>
            }

            <Outlet/>
        </main>

        <Footer/>

    </>);
}