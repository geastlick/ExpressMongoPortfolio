const users=require('express').Router({mergeParams: true});
const all=require('./all');

users.all('/', all);

module.exports = users;