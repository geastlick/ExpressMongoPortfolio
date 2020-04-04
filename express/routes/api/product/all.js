const productRouter = require('express').Router();
const bodyParser = require('body-parser');
const Product = require('../../../models/product');

productRouter.use(bodyParser.json());

productRouter.route('/')
.get((req, res, next) => {
    Product.find()
    .then(products => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(products);
    })
    .catch(err => next(err));
});

module.exports = productRouter;