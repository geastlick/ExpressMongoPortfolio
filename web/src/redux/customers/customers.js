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
        case ActionTypes.ADD_CUSTOMER:
            return {...state, isLoading: false, errMess: null, customers: customers.concat(action.payload)};
        case ActionTypes.DELETE_CUSTOMER:
            return {...state, isLoading: false, errMess: null, customers: customers.filter(customer => customer.id != action.payload)};
        case ActionTypes.UPDATE_CUSTOMER:
            return {...state, isLoading: false, errMess: null, customers: customers.filter(customer => customer.id != action.payload.id).concat(action.payload)};
        default:
            return state;
    }
};