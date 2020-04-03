const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const address = new Schema({
    line1: String,
    line2: String,
    city: String,
    State: String,
    zip: String
});

const phone = new Schema({
    _id: ObjectId,
    phone: String,
    type: {
        type: String,
        enum: ['cell','home','work','fax']
    }
});

const contact = new Schema({
    _id: ObjectId,
    name: String,
    email: String,
    address: address,
    phone: [phone]
});

const orderItemAmounts = new Schema({
    _id: ObjectId,
    amount: Currency,
    description: String
})

const orderItem = new Schema({
    _id: ObjectId,
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

const order = new Schema({
    _id: ObjectId,
    number: String,
    items: [orderItem]
})

const customerSchema = new Schema({
  _id: ObjectId,
  name: String,
  address: address,
  phones: [phone],
  contacts: [contact],
  orders: [order]
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;