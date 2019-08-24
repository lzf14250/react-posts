import * as ActionTypes from './ActionTypes';

export const Users = (state = {
    isLoading: false,
    users: [],
    errMess: null
}, action) => {
    switch(action.type) {
        case ActionTypes.USERS_LOADING:
            return {
                ...state, 
                isLoading: true, 
                users: [], 
                errMess: null
            };

        case ActionTypes.ADD_USERS:
            return {...state, 
                isLoading: false, 
                users: action.payload, 
                errMess: null
            };
        
        case ActionTypes.USERS_FAILED:
            return {
                ...state, 
                isLoading: false, 
                users: [], 
                errMess: action.payload
            }
        
        default:
            return state;
    }
}