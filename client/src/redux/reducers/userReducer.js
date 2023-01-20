import { actionTypes } from "../constants/actionTypes";

const initialState = {
    user: []
}
export const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.SET_USER: {
            return { user: payload };
        }
        case actionTypes.REMOVE_USER: {
            return {};
        }
        default:
            return state;
    }
}