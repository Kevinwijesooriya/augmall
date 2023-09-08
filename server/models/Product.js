const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  image: String,
  x: {
    type: Number,
    default: 0,
    default: 0,
  },
  side: {
    type: String,
    default: "left",
  },
  y: {
    type: Number,
    default: 0,
    default: 0,
  },
  purchases: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["available", "out_of_stock"],
    default: "available",
  },
  sku: {
    type: String,
    unique: false,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categories",
  },
});


const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
