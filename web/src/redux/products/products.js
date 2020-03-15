import * as ActionTypes from './ActionTypes';

export const Products = (state = {
        isLoading: true,
        errMess: null,
        products: []
    }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PRODUCTS:
            return {...state, isLoading: false, errMess: null, products: action.payload};
        case ActionTypes.PRODUCTS_LOADING:
            return {...state, isLoading: true, errMess: null, products: []};
        case ActionTypes.PRODUCTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
            case ActionTypes.ADD_PRODUCT:
                return {...state, isLoading: false, errMess: null, products: products.concat(action.payload)};
            case ActionTypes.DELETE_PRODUCT:
                return {...state, isLoading: false, errMess: null, products: products.filter(product => product.id != action.payload)};
            case ActionTypes.UPDATE_PRODUCT:
                return {...state, isLoading: false, errMess: null, products: products.filter(product => product.id != action.payload.id).concat(action.payload)};
            default:
                return state;
    }
};