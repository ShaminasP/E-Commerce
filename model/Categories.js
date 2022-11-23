const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: Array,
  },
});

const categoryModel = mongoose.model("categories", categorySchema);

module.exports = categoryModel;
