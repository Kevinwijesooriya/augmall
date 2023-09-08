const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  parent_id: {
    type: Number,
    default:0
  },
  image: String
});

const Categories = mongoose.model('Categories', CategorySchema);
module.exports = Categories;
