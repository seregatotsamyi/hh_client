import React, {useEffect, useState} from 'react';
import {RouterProvider} from 'react-router-dom';
import './css/style.min.css';
import router from "./routes";
import {RootState} from "./store/store";
import {initializeApp, setTypeApp} from "./store/appReducer";
import Loading from "./components/Loading/Loading";
import {useAppDispatch, useAppSelector} from './store/hooks';
import {typeAppDesktop, typeAppMobile} from "./utils/consts";

const routers = router;

const MainApp = () => {

    const dispatch = useAppDispatch()

    const [width, setWidth] = useState<number>(window.innerWidth);

    useEffect(() => {

        if (width < 769) {
            dispatch(setTypeApp(typeAppMobile))
        }
        dispatch(initializeApp())

    }, [dispatch])

    window.onresize = () => {
        setWidth(window.innerWidth)
        if (width < 769) {
            dispatch(setTypeApp(typeAppMobile))
        } else {
            dispatch(setTypeApp(typeAppDesktop))
        }
    };

    return <RouterProvider router={routers}/>
}

export default MainApp;
