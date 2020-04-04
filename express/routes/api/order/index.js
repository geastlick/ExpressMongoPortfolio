const routes = require('express').Router({mergeParams: true});
const all=require('./all');
const single=require('./single');

const orderItems=require('./orderItem');

routes.all('/', all);
routes.all('/:orderId', single);

routes.all('/orderItems', orderItems)

module.exports = routes;