import {combineReducers} from 'redux';
import  {userReducer} from './userReducer';
import { jobReducer } from './jobReducer';
import { postReducer } from './postReducer';
import { selectedJobReducer } from './selectedJob';

export const reducers = combineReducers({
    allUsers : userReducer,
    allJobs : jobReducer,
    allPosts : postReducer,
    selectedJob : selectedJobReducer
});

