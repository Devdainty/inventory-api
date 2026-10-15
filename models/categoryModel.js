const mongoose = require("mongoose");

// Defines schema for Category
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a category name"],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Please add a category description"],
    },
  },
  {
    timestamps: true,
  },
);

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
