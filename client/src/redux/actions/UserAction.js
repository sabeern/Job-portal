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
    if(!jobs) {
        return async function(dispatch, getState) {
            const token = localStorage.getItem('empToken');
            const headers = {'X-Custom-Header': `${token}`}
            const res = await instance.get('/jobs/allJobs', { headers: headers });
            dispatch({type:actionTypes.FETSH_ALL_JOBS, payload: res.data.allJobs});
        }
    }else {
        console.log('else')
        return({
            type : actionTypes.FETSH_ALL_JOBS,
            payload : jobs
        })
    }
}

export const fetchJobs = () => {
    return async function(dispatch, getState) {
        const token = localStorage.getItem('empToken');
        const headers = {'X-Custom-Header': `${token}`}
        const res = await instance.get('/jobs/employerJobs', { headers: headers });
        dispatch({type:actionTypes.FETCH_JOBS, payload: res.data.employerJobs});
    }
}

export const setEmployeePosts = () => {
    return async function(dispatch, getState) {
        const token = localStorage.getItem('empToken');
        const headers = {'X-Custom-Header': `${token}`};
        const res = await instance.get('/post/employeePosts', { headers: headers });
        dispatch({type:actionTypes.SET_EMPLOYEE_POST, payload: res.data.employeePosts});
    }
}

export const setSelectedJob = (job) => {
    return({
        type : actionTypes.SET_SELECTED_JOB,
        payload : job
    })
}

export const removeJobs = () => {
    return({
        type : actionTypes.REVOME_JOBS,
    })
}

export const removePosts = () => {
    return({
        type : actionTypes.REMOVE_POST,
    })
}