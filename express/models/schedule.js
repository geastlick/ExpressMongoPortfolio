const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Customer = require('./customer');

const scheduleSchema = new Schema({
    customerId: String,
    productName: String,
    activity: String,
    requested: Date,
    location: String
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;