const users=require('express').Router({mergeParams: true});
const all=require('./all');

users.post('/', all);

module.exports = users;