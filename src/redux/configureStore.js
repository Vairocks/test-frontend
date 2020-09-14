import { createStore, combineReducers,applyMiddleware } from 'redux';
import { Authentication} from './userLogin';
import{registration} from './userRegis';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {Users} from './userFetching';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            registration: registration, 
            authentication: Authentication,
            users: Users
        }),
        applyMiddleware(thunk,logger)
    );
    return store; 
}

