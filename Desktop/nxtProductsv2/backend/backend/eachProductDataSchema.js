const mongoose = require("mongoose");

// Similar Product Schema
const similarProductSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  image_url: { type: String, required: true },
  title: { type: String, required: true },
  style: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  brand: { type: String, required: true },
  availability: { type: String, required: true },
  total_reviews: { type: Number, required: true },
  rating: { type: Number, required: true },
});

// Main Product Schema
const productSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  image_url: { type: String, required: true },
  title: { type: String, required: true },
  style: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  brand: { type: String, required: true },
  total_reviews: { type: Number, required: true },
  rating: { type: Number, required: true },
  availability: { type: String, required: true },
  similar_products: {
    type: [similarProductSchema],
    required: true,
  },
});

const eachProduct = mongoose.model("eachProductData", productSchema);

module.exports = eachProduct;
