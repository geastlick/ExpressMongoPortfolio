import * as ActionTypes from './ActionTypes';

export const ordersLoading = () => ({
    type: ActionTypes.ORDERS_LOADING
});

export const ordersFailed = errMess => ({
    type: ActionTypes.ORDERS_FAILED,
    payload: errMess
});

export const addOrders = orders => ({
    type: ActionTypes.ADD_ORDERS,
    payload: orders
});

export const fetchOrders = () => dispatch => {
    dispatch(ordersLoading());
    const token = localStorage.token;

    return fetch('/api/orders', {
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
        .then(orders => dispatch(addOrders(orders)))
        .catch(error => dispatch(ordersFailed(error.message)));
};
