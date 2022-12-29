import { actionTypes } from "../constants/actionTypes";

const initialState = {
    product:[{
        id:1,
        title:'Home alone',
        category:'movie'
    }]
}
export const productReducer = (state = initialState , {type,payload}) => {
    switch(type) {
        case actionTypes.SET_PRODUCT : {
            return state;
        }
        default : 
            return state;
    }
}