import *  as ActionTypes from './ActionTypes';

export function registration(state = {registering: false, registered: false, errMess:null}, action) {
    switch (action.type) {
        case ActionTypes.REGISTER_REQUEST:
          return { registering: true, registered: false, errMess:null };
        case ActionTypes.REGISTER_SUCCESS:
          return {registering: false, registered: true, errMess:null};
        case ActionTypes.REGISTER_FAILURE:
          return {registering: false, registered: false, errMess:action.payload};
        default:
          return state
      }
  
}