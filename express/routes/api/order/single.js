const customerRouter = require('express').Router();
const bodyParser = require('body-parser');
const Order = require('../../../models/order');

customerRouter.use(bodyParser.json());

customerRouter.route('/:orderId')
.get((req, res, next) => {
    Order.findById(req.params.orderId)
    .then(order => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(order);
    })
    .catch(err => next(err));
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /order/${req.params.orderId}`);
})
.put((req, res, next) => {
    Customer.findByIdAndUpdate(req.params.orderId, {
        $set: $req.body
    }, {new: true})
    .then(order => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(order);
    })
    .catch(err => next(err));
})
.delete((req, res, next) => {
    Customer.findByIdAndDelete(req.params.orderId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

module.exports = customerRouter;