const customerRouter = require('express').Router({mergeParams: true});
const bodyParser = require('body-parser');
const Customer = require('../../../../models/customer');

customerRouter.use(bodyParser.json());

customerRouter.route('/')
.get((req, res, next) => {
    Customer.findById(req.params.customerId)
    .then(customers => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(customers.contacts);
    })
    .catch(err => next(err));
})
.post((req, res, next) => {
    Customer.contacts.create(req.body)
    .then(customer => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(customer);
    })
    .catch(err => next(err));
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /customers/:customerId/contacts');
})
.delete((req, res) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /customers/:customerId/contacts');
});

module.exports = customerRouter;