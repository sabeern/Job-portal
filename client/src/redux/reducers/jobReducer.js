import { actionTypes } from "../constants/actionTypes";

const initialState = {
    jobs:[]
}
export const jobReducer = (state = initialState , {type,payload}) => {
    switch(type) {
        case actionTypes.SET_JOBS : {
            return {user:payload};
        }
        default : 
            return state;
    }
}