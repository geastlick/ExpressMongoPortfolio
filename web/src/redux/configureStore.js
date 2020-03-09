import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { Customers } from './customers/customers.js';
import { Features } from './features.js';
import { Inventory } from './inventory/inventory.js';
import { Orders } from './orders/orders.js';
import { Products } from './products/products.js';
import { Users } from './users/users.js';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            customers: Customers,
            features: Features,
            inventory: Inventory,
            orders: Orders,
            products: Products,
            users: Users
        }),
        applyMiddleware(thunk)
    );

    return store;
};