import * as ActionTypes from './ActionTypes';

export const Inventory = (state = {
        isLoading: true,
        errMess: null,
        inventory: []
    }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_INVENTORY:
            return {...state, isLoading: false, errMess: null, inventory: action.payload};
        case ActionTypes.INVENTORY_LOADING:
            return {...state, isLoading: true, errMess: null, inventory: []};
        case ActionTypes.INVENTORY_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        default:
            return state;
    }
};