const customerRouter = require('express').Router({mergeParams: true});
const bodyParser = require('body-parser');
const Customer = require('../../../../models/customer');

customerRouter.use(bodyParser.json());

customerRouter.route('/:contactId')
.get((req, res, next) => {
    Customer.findById(req.params.customerId)
    .then(customer => {
        console.log(customer);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(customer.contacts.id(req.params.contactId));
    })
    .catch(err => next(err));
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /customer/${req.params.customerId}/contact/${req.params.contactId}`);
})
.put((req, res, next) => {
    Customer.findOneAndUpdate({"_id": req.params.customerId, "contact._id": req.params.contactId}, {
        $set: { "contact.$": $req.body }
    }, {new: true})
    .then(customer => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(customer);
    })
    .catch(err => next(err));
})
.delete((req, res, next) => {
    Customer.findOneAndDelete({"_id": req.params.customerId, "contact._id": req.params.contactId})
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

module.exports = customerRouter;