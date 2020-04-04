const express = require('express');
const authenticate = require('../../authenticate');
const routes = express.Router({mergeParams: true});
const customer = require('./customer');
const inventory = require('./inventory');
const order = require('./order');
const product = require('./product');
const schedule = require('./schedule');

routes.use(authenticate.verifyUser);
routes.use('/customers', customer);
routes.use('/inventory', inventory);
routes.use('/orders', order);
routes.use('/products', product);
routes.use('/schedules', schedule);

module.exports = routes;