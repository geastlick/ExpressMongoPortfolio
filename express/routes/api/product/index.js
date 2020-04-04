const routes = require('express').Router({mergeParams: true});
const all=require('./all');

routes.all('/', all);

module.exports = routes;