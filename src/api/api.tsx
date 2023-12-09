import axios from "axios";
import {loginFormType} from "../type/type";

export const authAPI = {
    me() {
        return instance.get(`api/applicant/auth`);
    },

    loginApl(login: string, password: string, role: string) {
        return instance.post('api/applicant/login', {
            login,
            password,
            role,
        })
    },

    loginEmp(login: string, password: string, role: string) {
        return instance.post('api/employer/login', {
            login,
            password,
            role
        })
    },

    registerApl(firstName: string, secondName: string, surname: string, phone: string, login: string, password: string, email: string | null, role: string) {

        return instance.post('api/applicant/registration', {
            login,
            first_name: firstName,
            second_name: secondName,
            surname, password,
            phone,
            email,
            role
        })
    },

    registerEmp(login: string, name: string, email: string, password: string, phone: string, settlements_id: number, street_id: number, number_house: number, role: string, short_name: string | null) {

        return instance.post('api/employer/registration', {
            login,
            name,
            email,
            password,
            phone,
            settlements_id,
            role,
            street_id,
            number_house,
            short_name
        })
    },

}

export const addressAPI = {
    getSettlements(stroke:string){
        return instance.get(`api/address/settlements/${stroke}`)
    },
    getStreet(stroke:string){
        return instance.get(`api/address/street/${stroke}`)
    }
}


const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

// @ts-ignore
const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

instance.interceptors.request.use(authInterceptor)



