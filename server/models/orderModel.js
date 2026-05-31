const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    // kopplar ordern till en användare (om inloggad)
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    // array av beställda produkter med quantity
    items: [
      {
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    // totalpris
    total: {
      type: Number,
      required: [true, "Please add a total price"],
    },
    // kunduppgifter
    firstName: {
      type: String,
      required: [true, "Please add a first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please add a last name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
    },
    phone: {
      type: String,
      required: [true, "Please add a phone number"],
    },
    // betalningsmetod med enum för card eller swish
    paymentMethod: {
      type: String,
      required: [true, "Please add a payment method"],
      enum: ["card", "swish"],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", orderSchema);
