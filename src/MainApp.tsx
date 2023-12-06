import React, {useEffect} from 'react';
import {RouterProvider} from 'react-router-dom';
import './App.css';
import './css/style.min.css';
import router from "./routes";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./store/store";
import {initializeApp, loadingStatus} from "./store/appReducer";


const routers = router;

const MainApp = () => {
    const dispatch = useDispatch()

    const loading = useSelector((state: RootState) => state.app.loading)

    useEffect(() => {
        dispatch(initializeApp())
        dispatch(loadingStatus(false))
    }, [])


    if (loading){
        return <>Загрузка</>
    }
    return <RouterProvider router={routers}/>
}

export default MainApp;
