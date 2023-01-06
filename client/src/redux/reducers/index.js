import {combineReducers} from 'redux';
import  {userReducer} from './userReducer';
import { jobReducer } from './jobReducer';

export const reducers = combineReducers({
    allUsers : userReducer,
    allJobs : jobReducer
});

