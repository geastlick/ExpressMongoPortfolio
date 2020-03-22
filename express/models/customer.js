const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
const Schema = mongoose.Schema;

const address = new Schema({
    line1: String,
    line2: String,
    city: String,
    State: String,
    zip: String
});

const phone = new Schema({
    phone: String,
    type: {
        type: String,
        enum: ['cell','home','work','fax']
    }
});

const contact = new Schema({
    name: String,
    email: String,
    address: address,
    phone: [phone]
});

const orderItem = new Schema({
    lineItem: String,
    cost: {
        type: Currency
    },
    deliveryEstimate: Date,
    location: String,
    discounts: [{
        amount: Currency,
        description: String
    }],
    fees: [{
        amount: Currency,
        description: String
    }]
})
const order = new Schema({
    number: String,
    items: [orderItem]
})

const customerSchema = new Schema({
  name: String,
  address: address,
  phones: [phone],
  contacts: [contact],
  orders: [order]
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;