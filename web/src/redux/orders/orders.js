import * as ActionTypes from './ActionTypes';

export const Orders = (state = {
        isLoading: true,
        errMess: null,
        orders: []
    }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_ORDERS:
            return {...state, isLoading: false, errMess: null, orders: action.payload};
        case ActionTypes.ORDERS_LOADING:
            return {...state, isLoading: true, errMess: null, orders: []};
        case ActionTypes.ORDERS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
            case ActionTypes.ADD_ORDER:
                return {...state, isLoading: false, errMess: null, orders: orders.concat(action.payload)};
            case ActionTypes.DELETE_ORDER:
                return {...state, isLoading: false, errMess: null, orders: orders.filter(order => order.id != action.payload)};
            case ActionTypes.UPDATE_ORDER:
                return {...state, isLoading: false, errMess: null, orders: orders.filter(order => order.id != action.payload.id).concat(action.payload)};
            default:
                return state;
    }
};