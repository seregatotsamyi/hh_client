import {Outlet} from "react-router-dom";
import React from "react";


export const App = function App() {
    return (<>

        Главная страница
        <Outlet/>

    </>);
}