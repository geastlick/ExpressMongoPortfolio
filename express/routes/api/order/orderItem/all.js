const customerRouter = require('express').Router();
const bodyParser = require('body-parser');
const Order = require('../../../../models/order');

customerRouter.use(bodyParser.json());

customerRouter.route('/')
.get((req, res, next) => {
    Order.find()
    .then(orders => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(orders);
    })
    .catch(err => next(err));
})
.post((req, res, next) => {
    Order.create(req.body)
    .then(order => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(order);
    })
    .catch(err => next(err));
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /orders');
})
.delete((req, res) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /orders');
});

module.exports = customerRouter;