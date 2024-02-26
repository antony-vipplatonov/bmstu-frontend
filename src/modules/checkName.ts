import axios from "axios"
import { userData } from "./applications"

export const checkName = async (): Promise<userData> =>{
    return axios.get('../../api/user/me')
    .then((resp)=>(resp.data))
    .catch(()=>(""))
}