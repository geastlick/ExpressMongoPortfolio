const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');

const Schedule = require('../models/schedule');
const scheduleRouter = express.Router();
scheduleRouter.use(bodyParser.json());

scheduleRouter.route('/')
.all(authenticate.verifyUser, (req, res, next) => {
    next();
})
.get((req, res, next) => {
    Schedule.find()
    .then(schedules => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(schedules);
    })
    .catch(err => next(err));
});

module.exports = scheduleRouter;