import { actionTypes } from "../constants/actionTypes"
import {instance} from '../../apis/JobSolutionApi';

export const setUser = (user) => {
    return async function(dispatch, getState) {
        const res = await instance.get('/user');
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

export const setJobs = (jobs) => {
    return({
        type : actionTypes.SET_JOBS,
        payload : jobs
    })
}

export const fetchJobs = () => {
    return async function(dispatch, getState) {
        const res = await instance.get('/jobs/employerJobs');
        dispatch({type:actionTypes.FETCH_JOBS, payload: res.data.employerJobs});
    }
}

export const removeJobs = () => {
    return({
        type : actionTypes.REVOME_JOBS,
    })
}