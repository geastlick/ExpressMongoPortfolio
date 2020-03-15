import * as ActionTypes from './ActionTypes';

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

export const addProduct = product => ({
    type: ActionTypes.ADD_PRODUCT,
    payload: product
});

export const deleteProduct = productId => ({
    type: ActionTypes.DELETE_PRODUCT,
    payload: productId
});

export const updateProduct = product => ({
    type: ActionTypes.UPDATE_PRODUCT,
    payload: product
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
