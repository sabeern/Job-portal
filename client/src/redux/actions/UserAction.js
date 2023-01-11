import { actionTypes } from "../constants/actionTypes"
import {instance} from '../../apis/JobSolutionApi';

export const setUser = (user) => {
    return async function(dispatch, getState) {
        const token = localStorage.getItem('empToken');
        const headers = {'X-Custom-Header': `${token}`}
        const res = await instance.get('/user',{ headers: headers });
        dispatch({type:actionTypes.SET_USER, payload: res.data.user});
    }
}

export const setAdmin = (admin) => {
    return({
        type : actionTypes.SET_ADMIN,
        payload : admin
    })
}

export const removeUser = () => {
    return({
        type : actionTypes.REMOVE_USER
    })
}

export const fetchAllJobs = (jobs) => {
    return async function(dispatch, getState) {
        const token = localStorage.getItem('empToken');
        const headers = {'X-Custom-Header': `${token}`}
        const res = await instance.get('/jobs/allJobs', { headers: headers });
        console.log(res.data.allJobs);
        dispatch({type:actionTypes.FETSH_ALL_JOBS, payload: res.data.allJobs});
    }
}

export const fetchJobs = () => {
    return async function(dispatch, getState) {
        console.log('called');
        const token = localStorage.getItem('empToken');
        const headers = {'X-Custom-Header': `${token}`}
        const res = await instance.get('/jobs/employerJobs', { headers: headers });
        dispatch({type:actionTypes.FETCH_JOBS, payload: res.data.employerJobs});
    }
}

export const removeJobs = () => {
    return({
        type : actionTypes.REVOME_JOBS,
    })
}