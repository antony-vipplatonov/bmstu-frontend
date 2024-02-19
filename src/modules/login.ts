import axios from 'axios'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export interface res {
    status:string,
    error:string
}

export const login = async (username:string|null, password:string|null): Promise<res> =>{
    return axios.post('../../api/login', {
        username: username,
        password: password
      })
        .then((resp) => resp.data)
}