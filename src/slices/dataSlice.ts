import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux";
import Cookies from 'js-cookie';





const dataSlice = createSlice({
    name: "data",
    initialState: {
        isLogged:Cookies.get("session_id")?true:false,
        username:'',
        nameSearchQuery:'',
        votingDateToSearchQuery:"9999-12-01",
        votingDateFromSearchQuery:"0001-01-01",
        votingStatusSearchQuery:'Статус',
        
    },
    reducers: {
        setUsername(state, {payload}) {  
            state.username = payload
        },
        setDateTo(state, {payload}) {  
            state.votingDateToSearchQuery = payload
        },
        setDateFrom(state, {payload}) {  
            state.votingDateFromSearchQuery = payload
        },
        setStatus(state, {payload}) {  
            state.votingStatusSearchQuery = payload
        },
        setNameSQ(state, {payload}) {  
            state.nameSearchQuery = payload
        },
        chLog(state) {  
            state.isLogged = !state.isLogged
        },
        delDateTo(state) {  
            state.votingDateToSearchQuery = '9999-12-01'
        },
        delDateFrom(state) { 
            state.votingDateFromSearchQuery = '0001-01-01'
        },
        delStatus(state) {  
            state.votingStatusSearchQuery = 'Статус'
        },
        delNameSQ(state) {  
            state.nameSearchQuery = ''
        },
    }
})

export const useIsLogged = () =>
    useSelector((state:any) => state.ourData.isLogged)

export const useNameSearchQuery = () =>
    useSelector((state:any) => state.ourData.nameSearchQuery)

export const useVotingDateToSearchQuery = () =>
    useSelector((state:any) => state.ourData.votingDateToSearchQuery)

export const useVotingDateFromSearchQuery = () =>
    useSelector((state:any) => state.ourData.votingDateFromSearchQuery)

export const useVotingStatusSearchQuery = () =>
    useSelector((state:any) => state.ourData.votingStatusSearchQuery)

export const useUsername = () =>
    useSelector((state:any) => state.ourData.username)




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
} = dataSlice.actions


export default dataSlice.reducer