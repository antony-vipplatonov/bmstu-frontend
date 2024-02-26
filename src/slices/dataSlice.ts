import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux";





const dataSlice = createSlice({
    name: "data",
    initialState: {
        isLogged:false,
        username:'',
        isModer:false,
        usernameSearchQuery:'',
        nameSearchQuery:'',
        nameSearchQueryModer:'',
        compaundDateToSearchQuery:"9999-12-01",
        compaundDateFromSearchQuery:"0001-01-01",
        compaundStatusSearchQuery:'Статус',
        
    },
    reducers: {
        setUsername(state, {payload}) {  
            state.username = payload
        },
        setDateTo(state, {payload}) {  
            state.compaundDateToSearchQuery = payload
        },
        setDateFrom(state, {payload}) {  
            state.compaundDateFromSearchQuery = payload
        },
        setStatus(state, {payload}) {  
            state.compaundStatusSearchQuery = payload
        },
        setNameSQ(state, {payload}) {  
            state.nameSearchQuery = payload
        },
        chLog(state, {payload}) {  
            state.isLogged = payload
        },
        delDateTo(state) {  
            state.compaundDateToSearchQuery = '9999-12-01'
        },
        delDateFrom(state) { 
            state.compaundDateFromSearchQuery = '0001-01-01'
        },
        delStatus(state) {  
            state.compaundStatusSearchQuery = 'Статус'
        },
        delNameSQ(state) {  
            state.nameSearchQuery = ''
        },
        chModer(state, {payload}) {  
            state.isModer = payload
        },
        setNameSQModer(state, {payload}) {  
            state.nameSearchQueryModer = payload
        },
        setUsernameSearchQuery(state, {payload}) {  
            state.usernameSearchQuery = payload
        },
    }
})

export const useIsLogged = () =>
    useSelector((state:any) => state.ourData.isLogged)

export const useIsModer = () =>
    useSelector((state:any) => state.ourData.isModer)

export const useNameSearchQuery = () =>
    useSelector((state:any) => state.ourData.nameSearchQuery)

export const useNameSearchQueryModer = () =>
    useSelector((state:any) => state.ourData.nameSearchQueryModer)

export const useCompaundDateToSearchQuery = () =>
    useSelector((state:any) => state.ourData.compaundDateToSearchQuery)

export const useCompaundDateFromSearchQuery = () =>
    useSelector((state:any) => state.ourData.compaundDateFromSearchQuery)

export const useCompaundStatusSearchQuery = () =>
    useSelector((state:any) => state.ourData.compaundStatusSearchQuery)

export const useUsername = () =>
    useSelector((state:any) => state.ourData.username)

export const useUsernameSearchQuery = () =>
    useSelector((state:any) => state.ourData.usernameSearchQuery)




export const {
    setDateTo: setDateToAction,
    setDateFrom: setDateFromAction,
    setStatus: setStatusAction,
    setNameSQ: setNameSQAction,
    chLog: chLogAction,
    delDateTo: delDateToAction,
    delDateFrom: delDateFromAction,
    delStatus: delStatusAction,
    delNameSQ: delNameSQAction,
    setUsername: setUsernameAction,
    chModer: chModerAction,
    setUsernameSearchQuery: setUsernameSQAction,
    setNameSQModer: setNameSQModerAction,
} = dataSlice.actions


export default dataSlice.reducer