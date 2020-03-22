const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');

const Customer = require('../models/customer');
const orderRouter = express.Router();
orderRouter.use(bodyParser.json());

orderRouter.route('/')
.all(authenticate.verifyUser, (req, res, next) => {
    next();
})
.get((req, res, next) => {
    Customer.find({},{orders:1})
    .then(orders => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(orders);
    })
    .catch(err => next(err));
});

module.exports = orderRouter;