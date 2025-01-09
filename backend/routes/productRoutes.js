const express = require("express");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { verifyToken, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);

// Admin-only routes
router.post("/", verifyToken, authorizeRoles("admin"), createProduct);
router.put("/:id", verifyToken, authorizeRoles("admin"), updateProduct);
router.delete("/:id", verifyToken, authorizeRoles("admin"), deleteProduct);

module.exports = router;