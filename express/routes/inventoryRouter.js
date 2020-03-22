const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');

const Inventory = require('../models/inventory');
const inventoryRouter = express.Router();
inventoryRouter.use(bodyParser.json());

inventoryRouter.route('/')
.all(authenticate.verifyUser, (req, res, next) => {
    next();
})
.get((req, res, next) => {
    Inventory.find()
    .then(inventory => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(inventory);
    })
    .catch(err => next(err));
});

module.exports = inventoryRouter;