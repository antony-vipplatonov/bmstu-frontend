import axios from "axios"

export interface userData {
    id: number
    username: string
    email: string | null
    phone: string | null
    password: string
    is_staff: boolean
}

export interface appl {
    id: number
    name: string | null
    admiralname: string | null
    country: string | null
    victory: string | null
    creatorname: string | null
    moderatorname: string | null
    status: string
    datacreate: string | null
    dataform: string | null
    dataend: string | null
    battledate: string | null
}

export interface Ship {
    id: number
    name: string
    weapon: string
    armoring: string
    year: number
    displacement: number
    length: number
    speed: number
    status: string
    image_src: string
    captain: string
    losses: number
}

export interface applShip {
    Application: appl
    Ships: Ship[]
}

export interface appls {
    id: number
    name: string | null
    admiralname: string | null
    country: string | null
    victory: string | null
    creatorname: string | null
    moderatorname: string | null
    status: string | null
    datacreate: string | null
    dataform: string | null
    dataend: string | null
    battledate: string | null
    UncalcShips: number | null
}

export const applications = async (status='', dateFrom: string, dateTo: string): Promise<appls[]> =>{
    if (status=='Статус'){
        status = '';
    }
    return axios.get(`../../api/applications/?status=${status}&dateFrom=${dateFrom}&dateTo=${dateTo}`)
        .then((response) => response.data)
}

export const application = async (id: string | undefined): Promise<applShip> =>{
    return axios.get(`../../api/applications/${id}/`)
        .then((response) => response.data)
}
