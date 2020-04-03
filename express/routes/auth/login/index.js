const login=require('express').Router({mergeParams: true});
const all=require('./all');

login.post('/', all);

module.exports = login;