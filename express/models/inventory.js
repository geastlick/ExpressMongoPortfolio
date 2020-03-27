const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = require('./product');

const inventorySchema = new Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    status: [{
        location: String,
        quantity: Number
    }]
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;