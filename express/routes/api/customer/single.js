const customerRouter = require('express').Router();
const bodyParser = require('body-parser');
const Customer = require('../../../models/customer');

customerRouter.use(bodyParser.json());

customerRouter.route('/:customerId')
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

module.exports = customerRouter;