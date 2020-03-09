import * as ActionTypes from './ActionTypes';

export const Customers = (state = {
        isLoading: true,
        errMess: null,
        customers: []
    }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_CUSTOMERS:
            return {...state, isLoading: false, errMess: null, customers: action.payload};
        case ActionTypes.CUSTOMERS_LOADING:
            return {...state, isLoading: true, errMess: null, customers: []};
        case ActionTypes.CUSTOMERS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        default:
            return state;
    }
};