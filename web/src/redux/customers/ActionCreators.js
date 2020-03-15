import * as ActionTypes from './ActionTypes';

// dispatch fetchCustomers(), addCustomer(customer), deleteCustomer(customerId), putCustomer(customer), patchCustomer(customer)

export const customersLoading = () => ({
    type: ActionTypes.CUSTOMERS_LOADING
});

export const customersFailed = errMess => ({
    type: ActionTypes.CUSTOMERS_FAILED,
    payload: errMess
});

export const addCustomers = customers => ({
    type: ActionTypes.ADD_CUSTOMERS,
    payload: customers
});

export const addCustomer = customer => ({
    type: ActionTypes.ADD_CUSTOMER,
    payload: customer
});

export const deleteCustomer = customerId => ({
    type: ActionTypes.DELETE_CUSTOMER,
    payload: customerId
});

export const updateCustomer = customer => ({
    type: ActionTypes.UPDATE_CUSTOMER,
    payload: customer
});

export const fetchCustomers = () => dispatch => {
    dispatch(customersLoading());
    const token = localStorage.token;

    return fetch('/api/customers', {
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
        .then(customers => dispatch(addCustomers(customers)))
        .catch(error => dispatch(customersFailed(error.message)));
};
