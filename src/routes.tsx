import {
    createBrowserRouter,
} from "react-router-dom";
import {
    CREATE_VACANCY_PATH,
    ERROR_PATH,
    LOGIN_PATH,
    MAIN_PATH,
    PROFILE_PATH,
    REGISTRATION_PATH
} from "./utils/consts";
import Login from "./components/Login/Login";
import CreateVacancy from "./components/CreateVacancy/CreateVacancy";
import {App} from "./components/App/App";
import Profile from "./components/Profile/Profile";
import Error from "./components/Error/Error";
import ProfileSettings from "./components/Profile/ProfileSettings";


const router = createBrowserRouter([
    {
        path: MAIN_PATH,
        element: <App/>,
        errorElement: <Error/>,

        children: [
            {
                path: PROFILE_PATH,
                element: <Profile/>,

                children: [
                    {
                        path: "",
                        element: <ProfileSettings/>
                    },
                    {
                        path: CREATE_VACANCY_PATH,
                        element: <CreateVacancy/>
                    }]
            },
        ],

    },

    {
        path: LOGIN_PATH,
        element: <Login/>
    },
    {
        path: REGISTRATION_PATH,
        element: <Login/>
    },
    {
        path: ERROR_PATH,
        element: <Error/>
    },

])


export default router