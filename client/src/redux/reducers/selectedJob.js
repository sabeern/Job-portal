import { actionTypes } from "../constants/actionTypes";

const initialState = {
    job: ''
}
export const selectedJobReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.SET_SELECTED_JOB: {
            return { job: payload };
        }
        default:
            return state;
    }
}