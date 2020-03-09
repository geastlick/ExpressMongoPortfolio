import * as ActionTypes from './ActionTypes';

export const inventoryLoading = () => ({
    type: ActionTypes.INVENTORY_LOADING
});

export const inventoryFailed = errMess => ({
    type: ActionTypes.INVENTORY_FAILED,
    payload: errMess
});

export const addInventory = inventory => ({
    type: ActionTypes.ADD_INVENTORY,
    payload: inventory
});

export const fetchInventory = () => dispatch => {
    dispatch(inventoryLoading());
    const token = localStorage.token;

    return fetch('/api/inventory', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`); error.response = response;
                throw error;
            }
        },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(inventory => dispatch(addInventory(inventory)))
        .catch(error => dispatch(inventoryFailed(error.message)));
};
