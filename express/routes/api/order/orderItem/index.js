const routes = require('express').Router({mergeParams: true});
const all=require('./all');
const single=require('./single');

routes.all('/', all);
routes.all('/:orderItemId', single);

module.exports = routes;