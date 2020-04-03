const routes = require('express').Router();
const customer = require('./customer');
const inventory = require('./inventory');
const order = require('./order');
const product = require('./product');
const schedule = require('./schedule');

routes.use('/customer', customer);
routes.use('/inventory', inventory);
routes.use('/order', order);
routes.use('/product', product);
routes.use('/schedule', schedule);

module.exports = routes;