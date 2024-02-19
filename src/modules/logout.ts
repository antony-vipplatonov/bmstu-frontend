import axios from 'axios'

export interface res {
    status:string,
    error:string
}

export const logout = async (): Promise<res> =>{
    return axios.get('../../api/logout')
        .then((resp) => resp.data)
}