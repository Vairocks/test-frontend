import * as ActionTypes from './ActionTypes';
let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggingIn: false,loggedIn: true, user: user, errMess: null } : {loggingIn: false,loggedIn: false, user: null};

export function Authentication(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
      alert(JSON.stringify(action.payload));
      return {
        loggingIn: true,
        loggedIn: false,
        user: action.payload,
        errMess: null
      };
    case ActionTypes.LOGIN_SUCCESS:
      alert(JSON.stringify(action.payload));
      return {
        loggingIn: false,
        loggedIn: true,
        username: action.payload,
        errMess: null
      };
      
    case ActionTypes.LOGIN_FAILURE:
      alert(JSON.stringify(action.payload));  
    return {
        loggingIn: false,
        loggedIn: false,
        user: null,
        errMess:action.payload
      };
    case ActionTypes.LOGOUT:
      return {
        loggingIn: false,
        loggedIn: false,
        user: null,
        errMess:null
    };  
    default:
      return state
  }
}