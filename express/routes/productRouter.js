const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');

const Product = require('../models/product');
const productRouter = express.Router();
productRouter.use(bodyParser.json());

productRouter.route('/')
.all(authenticate.verifyUser, (req, res, next) => {
    next();
})
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