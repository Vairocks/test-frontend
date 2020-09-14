import { authHeader } from '../helpers/header_mgm';
import * as ActionTypes from './ActionTypes';
import {baseUrl } from '../shared/baseUrl';
//a function to create action object
import {userService} from '../services/authservices'


export const login = (username, password) => {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(username));
                    alert(user);
                    //console.log(user);
                   // history.push('/');
                   
                },
                error => {
                    alert(error.toString());
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(user) { return { type: ActionTypes.LOGIN_REQUEST, payload: user } }
    function success(username) { return { type: ActionTypes.LOGIN_SUCCESS, payload: username } }
    function failure(error) { return { type: ActionTypes.LOGIN_FAILURE, payload: error } }
}

export const logout = () =>
 {  alert("Logout from action creator");
    userService.logout();
    return { type: ActionTypes.LOGOUT };
}

export function register(user) {
    alert(JSON.stringify(user));
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => { 
                    dispatch(success());    
                },
                error => {
                    alert(error.toString());
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(user) { return { type: ActionTypes.REGISTER_REQUEST,  payload: user } }
    function success(user) { return { type: ActionTypes.REGISTER_SUCCESS,  payload: user } }
    function failure(error) { return { type: ActionTypes.REGISTER_FAILURE,  payload: error } }
}

export const fetchUsers = () => (dispatch) => {
    dispatch(usersLoading(true));
    
    const requestOptions = {
    method: 'GET',// method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', 
    headers: {'Content-Type': 'application/json'// 'Content-Type': 'application/x-www-form-urlencoded',
    },
};

    return fetch(baseUrl + 'users/senduser',requestOptions)
        .then(response => {
            if (response.ok) {
               return response;
        }
        else {
            var error = new Error('Error' + response.status+' : '+response.statusText);
            error.response = response; 
            throw error;
        }
    },
    error =>{
        var errmess = new Error(error.message);
        throw errmess;
        })  
        .then(response => response.json())
        .then(users => dispatch(addUsers(users)))
        .catch(error => dispatch(usersFailed(error.message)));
    }

export const usersLoading = () => ({
    type: ActionTypes.USERS_LOADING
    });

export const usersFailed = (errmess) => ({
    type: ActionTypes.USERS_FAILED,
    payload: errmess
    });

export const addUsers = (users) => ({
    type: ActionTypes.ADD_USERS,
    payload: users   
    });