import {Outlet, useLocation} from "react-router-dom";
import React, {useEffect} from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {showMobMenu} from "../../store/appReducer";
import {useDispatch} from "react-redux";


export const App = function App() {
    const dispatch = useDispatch()
    const location = useLocation();

    useEffect(() => {
        dispatch(showMobMenu(false))
    }, [location]);

    return (<>

        <Header/>

        <main className="main">
            <Outlet/>
        </main>

        <Footer/>

    </>);
}