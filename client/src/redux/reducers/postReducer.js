import { actionTypes } from "../constants/actionTypes";

const initialState = {
    posts: []
}
export const postReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.SET_EMPLOYEE_POST: {
            return { posts: payload };
        }
        case actionTypes.REMOVE_POST: {
            return {};
        }
        default:
            return state;
    }
}