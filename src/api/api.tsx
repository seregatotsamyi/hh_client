import axios from "axios";

export const authAPI = {
    me() {
        return instance.get(`api/applicant/auth`);
    },

    loginApl(login: string, password: string, role: string) {
        return instance.post('api/applicant/login', {
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

    // logout() {
    //     return instance.post(`auth/jwt/logout`);
    // }
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
