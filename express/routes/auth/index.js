const routes = require('express').Router({mergeParams: true});
const user = require('./user');
const login = require('./login');

routes.use('/user', user);
routes.use('/login', login);

module.exports = routes;