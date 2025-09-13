const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    amount: { type: Number, required: true },
    reference: { type: String, required: true },
    statusVip: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", PaymentSchema);
