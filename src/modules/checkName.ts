import axios from "axios"

export const checkName = async (): Promise<string> =>{
    return axios.get('../../api/user/me')
    .then((resp)=>(resp.data.username))
    .catch(()=>(""))
}