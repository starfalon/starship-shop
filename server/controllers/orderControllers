const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");

//@desc Create order
//@route POST /api/orders
//@access public
const createOrder = asyncHandler(async (req, res) => {
  const { items, total, firstName, lastName, email, phone, paymentMethod } =
    req.body;

  // validerar obligatoriska fält
  if (
    !items ||
    !total ||
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !paymentMethod
  ) {
    res.status(400);
    throw new Error("Please fill all required fields");
  }

  // skapar ordern i databasen
  const order = await Order.create({
    // kopplar ordern till användaren om inloggad
    user_id: req.user ? req.user.id : null,
    items,
    total,
    firstName,
    lastName,
    email,
    phone,
    paymentMethod,
  });

  res.status(201).json(order);
});

//@desc Get all orders
//@route GET /api/orders
//@access private
const getOrders = asyncHandler(async (req, res) => {
  // Hämtar alla orders (används av admin)
  const orders = await Order.find();
  res.status(200).json(orders);
});

//@desc Get single order
//@route GET /api/orders/:id
//@access private
const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }
  res.status(200).json(order);
});

module.exports = { createOrder, getOrders, getOrder };
