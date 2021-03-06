const routes = require('express').Router({mergeParams: true});
const auth = require('./auth');
const api = require('./api');

routes.use('/auth', auth);
routes.use('/api', api);

module.exports = routes;