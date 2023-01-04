import { actionTypes } from "../constants/actionTypes"
export const setUser = (user) => {
        return({
            type : actionTypes.SET_USER,
            payload : user
        })
}

export const setAdmin = (admin) => {
    return({
        type : actionTypes.SET_ADMIN,
        payload : admin
    })
}