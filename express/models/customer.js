const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
const Schema = mongoose.Schema;

const address = {
    line1: String,
    line2: String,
    city: String,
    State: String,
    zip: String
};

const phone = {
    phoneNumber: String,
    phoneType: {
        type: String,
        enum: ['cell','line','fax']
    }
};

const contact = new Schema({
    name: String,
    title: String,
    address: address,
    urls: [String],
    emails: [String],
    phones: [phone]
});

const customerSchema = new Schema({
  name: String,
  address: address,
  urls: [String],
  emails: [String],
  phones: [phone],
  contacts: [contact]
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;