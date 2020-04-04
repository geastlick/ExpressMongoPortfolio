const customerRouter = require('express').Router();
const bodyParser = require('body-parser');
const Customer = require('../../../models/customer');

customerRouter.use(bodyParser.json());

customerRouter.route('/')
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
    res.end('DELETE operation not supported on /customers');
});

module.exports = customerRouter;