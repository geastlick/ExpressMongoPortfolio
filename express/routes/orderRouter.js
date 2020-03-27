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
    Customer.aggregate([
        { "$unwind": "$orders" },
        { "$unwind": "$orders.items" },
        { "$project": {
            "_id": 0,
            "customerId": "$_id",
            "name": "$name",
            "order": "$orders"
        }}
    ])
    .then(orders => {
        console.log(orders);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(orders);
    })
    .catch(err => next(err));
});

module.exports = orderRouter;