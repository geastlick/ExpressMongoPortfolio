const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: String,
    cost: {
        type: Currency
    },
    hasSerial: {
        type: Boolean,
        default: false
    }
});


const Product = mongoose.model('Product', productSchema);

module.exports = Product;