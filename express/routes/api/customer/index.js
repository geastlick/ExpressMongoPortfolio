const routes = require('express').Router({mergeParams: true});

const all=require('./all');
const single=require('./single');

const contact=require('./contact');

routes.all('/', all);
routes.all('/:customerId', single);

routes.all('/:customerId/contacts', contact);

module.exports = routes;