const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer.Orders.OrderItem'
    },
    productName: String,
    activity: String,
    requested: Date,
    status: String,
    location: String
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;