const scheduleRouter = require('express').Router();
const bodyParser = require('body-parser');
const Schedule = require('../../../models/schedule');

scheduleRouter.use(bodyParser.json());

scheduleRouter.route('/')
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