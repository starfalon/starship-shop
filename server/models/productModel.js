const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a product name"],
    },
    // kategori
    category: {
      type: String,
      required: [true, "Please add a category"],
      enum: [
        "Starfighters",
        "Capital Ships",
        "Shuttles & Corvettes",
        "Freighters",
      ],
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
    },
    // skeppetlängd
    length: {
      type: String,
    },
    // besättning
    crew: {
      type: String,
    },
    // URL till produktbild
    image: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", productSchema);
