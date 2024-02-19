import axios from 'axios'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";


export interface RegData {
    status: string
    username: string | null
    email: string | null
    phone: string | null
    password: string | null
    error:string
}

export const registr = async (username:string|null, email:string|null, phone:string|null, password:string|null): Promise<RegData> =>{
    return axios.post('../../api/user/', {
        username: username,
        email: email,
        password: password,
        phone: phone
      })
        .then((resp) => resp.data)
}