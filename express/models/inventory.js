const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = require('./product');

const statusSchema = new Schema({
    location: String,
    quantity: Number
});

const inventorySchema = new Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    status: [statusSchema]
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;