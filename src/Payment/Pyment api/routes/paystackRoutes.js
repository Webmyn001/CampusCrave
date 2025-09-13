const express = require("express");
const axios = require("axios");
const Payment = require("../models/Payment");

const router = express.Router();

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

// 1️⃣ Initialize Payment
router.post("/initialize", async (req, res) => {
  try {
    const { email, amount } = req.body;

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      { email, amount: amount * 100 },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Payment initialization failed" });
  }
});

// 2️⃣ Verify Payment
router.get("/verify/:reference", async (req, res) => {
  try {
    const { reference } = req.params;

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    if (response.data.status !== true) {
      return res.status(400).json({ error: "Paystack verification failed", details: response.data });
    }

    const data = response.data.data;

    // Save payment to DB
    const payment = await Payment.create({
      email: data.customer.email,
      amount: data.amount / 100,
      reference: data.reference,
      statusVip: data.status,
    });

    res.json({ success: true, payment });
  } catch (err) {
    console.error("Paystack Verify Error:", err.response?.data || err.message);
    res.status(500).json({ 
      error: "Payment verification failed",
      details: err.response?.data || err.message
    });
  }
});


module.exports = router;
