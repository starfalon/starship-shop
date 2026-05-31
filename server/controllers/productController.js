const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

//@desc Get all products
//@route GET /api/products
//@access public
const getProducts = asyncHandler(async (req, res) => {
  // hämtar alla produkter från databasen
  // om category-query finns filtreras produkterna t.ex. /api/products?category=Starfighters
  const filter = req.query.category ? { category: req.query.category } : {};
  const products = await Product.find(filter);
  res.status(200).json(products);
});

//@desc Get single product
//@route GET /api/products/:id
//@access public
const getProduct = asyncHandler(async (req, res) => {
  // hämtar en specifik produkt baserat på id i URL:en
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.status(200).json(product);
});

//@desc Create product
//@route POST /api/products
//@access private
const createProduct = asyncHandler(async (req, res) => {
  const { name, category, price, length, crew, image, description } = req.body;

  // validerar obligatoriska fält
  if (!name || !category || !price) {
    res.status(400);
    throw new Error("Please add name, category and price");
  }

  const product = await Product.create({
    name,
    category,
    price,
    length,
    crew,
    image,
    description,
  });

  res.status(201).json(product);
});

//@desc Update product
//@route PUT /api/products/:id
//@access private
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // uppdaterar produkten med nya värden
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
  );

  res.status(200).json(updatedProduct);
});

//@desc Delete product
//@route DELETE /api/products/:id
//@access private
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  await Product.deleteOne({ _id: req.params.id });
  res.status(200).json(product);
});

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
