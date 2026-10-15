const mongoose = require("mongoose");

// Defines how a product looks in our database
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a product name"],
    },
    price: {
      type: Number,
      required: [true, "Please add a product price"],
    },
    category: {
      type: String,
      required: [true, "Please add a product category"],
    },
    quantity: {
      type: Number,
      required: [true, "Please add product quantity"],
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

// Creates and export the model
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
