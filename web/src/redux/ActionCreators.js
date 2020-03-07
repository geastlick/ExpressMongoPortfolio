import * as ActionTypes from './ActionTypes';

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

export const fetchProducts = () => dispatch => {
    dispatch(productsLoading());
    const token = localStorage.token;

    return fetch('/api/products', {
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
        .then(products => dispatch(addProducts(products)))
        .catch(error => dispatch(productsFailed(error.message)));
};

export const productsLoading = () => ({
    type: ActionTypes.PRODUCTS_LOADING
});

export const productsFailed = errMess => ({
    type: ActionTypes.PRODUCTS_FAILED,
    payload: errMess
});

export const addProducts = products => ({
    type: ActionTypes.ADD_PRODUCTS,
    payload: products
});

// Not exported -- only entry is via userLogin
const loginUser = userObj => ({
    type: ActionTypes.LOGIN_USER,
    payload: userObj
})
export const userLogin = (username, password) => dispatch => {

    const credentials = {
        username: username,
        password: password
    };

    return fetch('/auth/login', {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(data => {
            localStorage.setItem("token", data.access_token)
            dispatch(loginUser(data.user))
        })
        .catch(
            error => dispatch(loginFailed(error.message))
        );
};
export const loginFailed = errMess => ({
    type: ActionTypes.LOGIN_FAILED,
    payload: errMess
});

// Not exported -- only entry is via userLogout
const logoutUser = userObj => ({
    type: ActionTypes.LOGOUT_USER
})
export const userLogout = () => dispatch => {
    localStorage.removeItem("token")
    dispatch(logoutUser())
};

export const fetchProfile = () => {
    return dispatch => {
        const token = localStorage.token;
        if (token) {
            return fetch("/auth/user", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(resp => resp.json())
                .then(data => {
                    if (data.message) {
                        // An error will occur if the token is invalid.
                        // If this happens, you may want to remove the invalid token.
                        localStorage.removeItem("token")
                    } else {
                        dispatch(loginUser(data.user))
                    }
                })
        }
    }
}