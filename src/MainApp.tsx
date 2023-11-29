import React from 'react';
import {RouterProvider} from 'react-router-dom';
import './App.css';
import './css/style.min.css';


import router from "./routes";


const routers = router;

const MainApp = () => {
    return <RouterProvider router={routers} />
}

export default MainApp;
