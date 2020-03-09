import * as ActionTypes from './ActionTypes';

// Redux Reducer
export const Users = (state = { currentUser: {} }, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN_USER:
            return { ...state, currentUser: action.payload, errMess: "" };
        case ActionTypes.LOGOUT_USER:
            return { ...state, currentUser: {}, errMess: "" };
        case ActionTypes.LOGIN_FAILED:
            return { ...state, currentUser: {}, errMess: action.payload };
        default:
            return state;
    }
};