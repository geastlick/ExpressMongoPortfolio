const inventoryRouter = require('express').Router();
const bodyParser = require('body-parser');
const Inventory = require('../../../models/inventory');

inventoryRouter.use(bodyParser.json());

inventoryRouter.route('/')
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