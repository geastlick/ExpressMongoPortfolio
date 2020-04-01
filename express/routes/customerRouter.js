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
})
.post((req, res, next) => {
    Customer.create(req.body)
    .then(customer => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(customer);
    })
    .catch(err => next(err));
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /customers');
})
.delete((req, res) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /customers');
});

customerRouter.route('/:customerId')
.all(authenticate.verifyUser, (req, res, next) => {
    next();
})
.get((req, res, next) => {
    Customer.findById(req.params.customerId)
    .then(customer => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(customer);
    })
    .catch(err => next(err));
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /customer/${req.params.customerId}`);
})
.put((req, res, next) => {
    Customer.findByIdAndUpdate(req.params.customerId, {
        $set: $req.body
    }, {new: true})
    .then(customer => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(customer);
    })
    .catch(err => next(err));
})
.delete((req, res, next) => {
    Customer.findByIdAndDelete(req.params.customerId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

customerRouter.route('/:customerId/phones')
.all(authenticate.verifyUser, (req, res, next) => { next(); });

customerRouter.route('/:customerId/phones/:phoneId')
.all(authenticate.verifyUser, (req, res, next) => { next(); });

customerRouter.route('/:customerId/contacts')
.all(authenticate.verifyUser, (req, res, next) => { next(); });

customerRouter.route('/:customerId/contacts/:contactId')
.all(authenticate.verifyUser, (req, res, next) => { next(); });

customerRouter.route('/:customerId/contacts/:contactId/phones')
.all(authenticate.verifyUser, (req, res, next) => { next(); });

customerRouter.route('/:customerId/contacts/:contactId/phones/:phoneId')
.all(authenticate.verifyUser, (req, res, next) => { next(); });

customerRouter.route('/:customerId/orders')
.all(authenticate.verifyUser, (req, res, next) => { next(); });

customerRouter.route('/:customerId/orders/:orderId')
.all(authenticate.verifyUser, (req, res, next) => { next(); });

customerRouter.route('/:customerId/orders/:orderId/items')
.all(authenticate.verifyUser, (req, res, next) => { next(); });

customerRouter.route('/:customerId/orders/:orderId/items/:itemId')
.all(authenticate.verifyUser, (req, res, next) => { next(); });


customerRouter.route('/:customerId/orders/:orderId/items/:itemId/discounts')
.all(authenticate.verifyUser, (req, res, next) => { next(); });

customerRouter.route('/:customerId/orders/:orderId/items/:itemId/discounts/:discountId')
.all(authenticate.verifyUser, (req, res, next) => { next(); });

customerRouter.route('/:customerId/orders/:orderId/items/:itemId/fees')
.all(authenticate.verifyUser, (req, res, next) => { next(); });

customerRouter.route('/:customerId/orders/:orderId/items/:itemId/fees/:feeId')
.all(authenticate.verifyUser, (req, res, next) => { next(); });

module.exports = customerRouter;