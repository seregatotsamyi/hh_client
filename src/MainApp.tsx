import React, {useEffect} from 'react';
import {RouterProvider} from 'react-router-dom';
import './css/style.min.css';
import router from "./routes";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./store/store";
import {initializeApp, setWidth} from "./store/appReducer";
import Loading from "./components/Loading/Loading";


const routers = router;

const MainApp = () => {
    const dispatch = useDispatch()

    const loading = useSelector((state: RootState) => state.app.loading)

    useEffect(() => {
        dispatch(setWidth(window.innerWidth))
        dispatch(initializeApp())
        window.onresize = () => {
            dispatch(setWidth(window.innerWidth));
        };
    }, [])

    if(loading){
        return <Loading/>
    }


    return <RouterProvider router={routers}/>
}

export default MainApp;
