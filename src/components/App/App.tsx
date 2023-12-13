import {Outlet, useLocation} from "react-router-dom";
import React, {useEffect} from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {showMobMenu} from "../../store/appReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import Loading from "../Loading/Loading";


export const App = function App() {
    const dispatch = useDispatch()
    const location = useLocation();
    const loading = useSelector((state: RootState) => state.app.loading)


    useEffect(() => {
        dispatch(showMobMenu(false))
    }, [location]);

    return (<>

        {
            loading ?  <Loading/> : ""
        }

        <Header/>

        <main className="main">
            <Outlet/>
        </main>

        <Footer/>

    </>);
}