const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const validateToken = require("../middleware/validateTokenHandler");

// publika routes (behöver inte logga in för att se produkter)
router.route("/").get(getProducts);
router.route("/:id").get(getProduct);

// privata routes (behöver vara inloggad admin för att skapa, uppdatera eller ta bort produkter)
router.route("/").post(validateToken, createProduct);
router.route("/:id").put(validateToken, updateProduct);
router.route("/:id").delete(validateToken, deleteProduct);

module.exports = router;
