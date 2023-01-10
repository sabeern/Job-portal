import {reducers} from './reducers/index';
import storage from 'redux-persist/lib/storage';
import { configureStore,applyMiddleware, compose } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import {
    persistReducer
} from 'redux-persist';
const composeEnhancers = window._REDUX_DEVTOOLS_EXTENTION_COMPOSE_ || compose;

//const Store = createStore(reducers,{},window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const persistConfig = {
    key: 'counter',
    storage,
};
const persistedReducer = persistReducer(persistConfig, reducers, composeEnhancers);
const Store = configureStore({
    reducer: persistedReducer,
    middleware: (composeEnhancers) =>
        composeEnhancers(applyMiddleware(thunk))
});
export default Store;