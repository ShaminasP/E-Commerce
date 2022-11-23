const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productname: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
    required: true,
  },
  Image: {
    type: Array,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: Date.now,
  },
});

const productModel = mongoose.model("products", productSchema);

module.exports = productModel;
