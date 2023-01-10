import { actionTypes } from "../constants/actionTypes";

const initialState = {
    jobs:[]
}
export const jobReducer = (state = initialState , {type,payload}) => {
    switch(type) {
        case actionTypes.SET_JOBS : {
            return {jobs:payload};
        }
        case actionTypes.FETCH_JOBS : {
            return {jobs:payload};
        }
        case actionTypes.REVOME_JOBS : {
            return {};
        }
        default : 
            return state;
    }
}