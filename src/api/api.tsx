import axios from "axios";
import { ProfileAplForm, ProfileEmpForm} from "../type/type";
import {ROLE_APL, ROLE_EMP} from "../utils/consts";

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

    registerApl(firstName: string, secondName: string, surname: string, phone: string, login: string, password: string, email: string | null, role: string|typeof ROLE_APL, address:object) {

        return instance.post('api/applicant/registration', {
            login,
            first_name: firstName,
            second_name: secondName,
            surname, password,
            phone,
            email,
            role,
            address
        })
    },

    registerEmp(login: string, name_company: string, email: string, password: string, phone: string,  address:object, role: string|typeof ROLE_EMP, short_name: string | null) {

        return instance.post('api/employer/registration', {
            login,
            name_company,
            email,
            password,
            phone,
            role,
            address,
            short_name
        })
    },

}

export const addressAPI = {
    getAddresses(stroke: string) {
        return axios.post(`http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address`, {
                query: stroke
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization' : 'Token 0fe171a29fd492d223677eb07a6c4dcfc38b4bcd'
                }
            }
        )
    },
}
export const vacancyAPI = {
    createVacancy(data: any) {
        return instance.post('api/vacancy/create', {...data})
    },
    getCountVacancy(id: number | null | string = null) {
        if (!id) {
            id = ''
        }
        return instance.get(`api/vacancy/count/${id}`)
    },
    getVacancy(page: number = 1, count: number = 10, id: number | null = null) {
        if (id) {
            return instance.get(`api/vacancy/?page=${page}&count=${count}&id=${id}`)
        }
        return instance.get(`api/vacancy/?page=${page}&count=${count}`)
    },
    getItem(id: number) {
        return instance.get(`api/vacancy/item/${id}`)
    },
    deleteItem(id: number) {
        return instance.get(`api/vacancy/delete/${id}`)
    },
    getPosts(stroke: string) {
        return instance.get(`api/vacancy/post/${stroke}`)
    }
}


export const userAPI = {
    getApl(id: number) {
        return instance.get(`api/applicant/${id}`)
    },
    getEmp(id: number) {
        return instance.get(`api/employer/${id}`)
    },

    updateEmp(data: ProfileEmpForm) {
        return instance.post('api/employer/update', {
            id: data.id,
            email: data.email,
            phone: data.phone,
            short_name: data.short_name,
            about: data.about
        })
    },

    updateApl(data: ProfileAplForm) {
        return instance.post('api/applicant/update', {
            id: data.id,
            email: data.email,
            login: data.login,
            first_name: data.first_name,
            phone: data.phone,
            second_name: data.second_name,
            surname: data.surname
        })
    },

    getGender(id: number | null = null) {
        if (id) {
            return instance.get(`api/gender/${id}`)
        } else {
            return instance.get(`api/gender`)
        }

    },
    getEducation(id: number | null = null) {
        if (id) {
            return instance.get(`api/education/${id}`)
        } else {
            return instance.get(`api/education`)
        }

    },
    getSpecializations(id: number | null = null) {
        if (id) {
            return instance.get(`api/specializations/${id}`)
        } else {
            return instance.get(`api/specializations`)
        }
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



