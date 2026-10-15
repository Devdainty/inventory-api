const express = require("express");
const router = express.Router();
const { getAllOrders } = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

// All order routes require authentication and vendor role
router.use(protect);
router.use(authorizeRoles("vendor"));

router.get("/", getAllOrders);

module.exports = router;
