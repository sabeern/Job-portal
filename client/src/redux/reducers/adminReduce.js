import { actionTypes } from "../constants/actionTypes";

const initialState = {
    admin: []
}
export const adminReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.SET_ADMIN: {
            return { user: payload };
        }
        case actionTypes.REMOVE_ADMIN: {
            return {};
        }
        default:
            return state;
    }
}