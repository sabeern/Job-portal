import {combineReducers} from 'redux';
import  {userReducer} from './userReducer';

export const reducers = combineReducers({
    allUsers : userReducer
});

