const Product = require("../models/productModel");

// GET ALL PRODUCTS (Read All)
const getAllProducts = async (req, res) => {
  try {
    // Fetchs all products from MongoDB
    const products = await Product.find();

    // Sends success response back to the client
    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// GET SINGLE PRODUCT (Read Single)
const getProductById = async (req, res) => {
  try {
    // Finds a product by matching its unique ID from the URL parameters
    const product = await Product.findById(req.params.id);

    // For a product that doesn't exist
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found with this ID",
      });
    }

    // Sends the product data back
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    // For an ID format which is invalid.
    res.status(404).json({
      success: false,
      message: "Product not found (Invalid ID format)",
    });
  }
};

// CREATE PRODUCT (Create)
const createProduct = async (req, res) => {
  try {
    // Extracts fields sent from the client's request body
    const { name, price, category, quantity } = req.body;

    // Basic validation check
    if (!name || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, price, and category",
      });
    }

    // Creates and save the new product in MongoDB
    const newProduct = await Product.create({
      name,
      price,
      category,
      quantity,
    });

    res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// UPDATE PRODUCT (Update)
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    // For a product not found
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found to update",
      });
    }

    // Sends back the updated product
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// DELETE PRODUCT (Delete)
const deleteProduct = async (req, res) => {
  try {
    // Finds product by ID and remove it from the database
    const product = await Product.findByIdAndDelete(req.params.id);

    // For a product that does not exist
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found to delete",
      });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Exports all controller functions so routes can use them
module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
