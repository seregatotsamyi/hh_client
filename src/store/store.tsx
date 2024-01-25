import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import appReducer from "./appReducer";
import authReducer from "./authReducer";
import inputReducer from "./inputReducer";
import userReducer from "./userReducer";
import vacancyReducer from "./vacancyReducer";


const middleware = getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: true
});

export const store = configureStore({
    reducer: {
        auth : authReducer,
        app : appReducer,
        input: inputReducer,
        user: userReducer,
        vacancy: vacancyReducer,
    },
    middleware,

    devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store;