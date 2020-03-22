const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');

const Customer = require('../models/customer');
const customerRouter = express.Router();
customerRouter.use(bodyParser.json());

customerRouter.route('/')
.all(authenticate.verifyUser, (req, res, next) => {
    next();
})
.get((req, res, next) => {
    Customer.find()
    .then(customers => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(customers);
    })
    .catch(err => next(err));
});

module.exports = customerRouter;