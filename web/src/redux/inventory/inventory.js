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
            case ActionTypes.ADD_ITEM:
                return {...state, isLoading: false, errMess: null, inventory: state.inventory.concat(action.payload)};
            case ActionTypes.DELETE_ITEM:
                return {...state, isLoading: false, errMess: null, inventory: state.inventory.filter(item => item.id !== action.payload)};
            case ActionTypes.UPDATE_ITEM:
                return {...state, isLoading: false, errMess: null, inventory: state.inventory.filter(item => item.id !== action.payload.id).concat(action.payload)};
            default:
                return state;
    }
};