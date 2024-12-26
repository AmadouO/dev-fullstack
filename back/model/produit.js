const mongoose = require('mongoose');
const { title } = require('process');

const produitSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
});

module.exports = mongoose.model('Produit', produitSchema);