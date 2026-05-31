const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrders,
  getOrder,
} = require("../controllers/orderController");
const validateToken = require("../middleware/validateTokenHandler");

// POST /api/orders (skapar en ny order, ingen inloggning krävs)
router.route("/").post(createOrder);

// GET /api/orders (hämtar alla orders, kräver inloggning)
router.route("/").get(validateToken, getOrders);

// GET /api/orders/:id (hämtar en specifik order, kräver inloggning)
router.route("/:id").get(validateToken, getOrder);

module.exports = router;
