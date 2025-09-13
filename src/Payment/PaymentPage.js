import React, { useState } from "react";
import axios from "axios";
import { PaystackButton } from "react-paystack";

export default function PaymentPage() {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");

  const publicKey = "pk_test_3ab72648c3e10445b6ab8e28f8b6f8fcc46d725c";

  const componentProps = {
    email,
    amount: Number(amount) * 100,
    publicKey,
    text: "Pay Now",
    onSuccess: async (response) => {
      console.log("Payment successful!", response);
      // Verify transaction on the backend
      try {
        console.log(response.reference)
        const verifyRes = await axios.get(
          `http://localhost:5000/api/paystack/verify/${response.reference}`
        );
        console.log("Verification result:", verifyRes.data);
        alert("Payment verified successfully!");
      } catch (error) {
        console.error("Verification error", error);
        alert("Could not verify payment.");
      }
    },
    onClose: () => alert("Payment closed"),
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Pay with Paystack</h1>

      <input
        type="email"
        placeholder="Enter email"
        className="border p-2 rounded mb-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="number"
        placeholder="Enter amount"
        className="border p-2 rounded mb-4"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <PaystackButton
        className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-500"
        {...componentProps}
      />
    </div>
  );
}
