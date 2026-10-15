const express = require("express");
const router = express.Router();
const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

// Imports the JWT protection middleware
const { protect } = require("../middleware/authMiddleware");

// Applys 'protect' middleware to ALL routes below this line
router.use(protect);

router.route("/").get(getAllCategories).post(createCategory);

router
  .route("/:id")
  .get(getCategoryById)
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = router;
