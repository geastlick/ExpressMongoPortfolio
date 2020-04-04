const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
const Schema = mongoose.Schema;

const orderItemAmounts = {
    amount: Currency,
    description: String
};

const orderItem = new Schema({
    lineItem: String,
    cost: {
        type: Currency
    },
    deliveryEstimate: Date,
    location: String,
    discounts: [orderItemAmounts],
    fees: [orderItemAmounts],
    rentalPeriod: {
        type: String,
        enum: ["monthly", "weekly", "daily", "date"]
    },
    rentalValue: String
});

const orderSchema = new Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    orderNumber: String,
    orderItems: [orderItem]
})

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;