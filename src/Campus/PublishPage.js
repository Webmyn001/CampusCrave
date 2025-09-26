import React, { useEffect, useState } from "react";
import { FiCheck, FiZap, FiStar, FiRepeat } from "react-icons/fi";
import { Link } from "react-router-dom";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Replace with real userId from auth
const userId = localStorage.getItem("userId");

const tiers = [
  {
    id: "starter",
    title: "Starter Tier",
    price: "Free Forever",
    features: [
      "Basic seller profile setup",
      "Unlimited listings",
      "Listings expire after 24 hours",
      "Standard visibility",
    ],
    bestFor: "Casual sellers",
    link: "/publish/starter",
    free: true,
  },
  {
    id: "standard",
    title: "Standard Tier",
    price: "₦1,500/month",
    priceValue: 1500,
    currency: "NGN",
    features: [
      "All Starter features",
      "Premium PRO badge",
      "Urgent sale tagging",
      "Listings expire after 48 hours",
      "Priority visibility",
    ],
    bestFor: "Frequent sellers",
    popular: true,
    link: "/publish/pro",
  },
  {
    id: "premium",
    title: "Premium Tier",
    price: "₦2,500/month",
    priceValue: 2500,
    currency: "NGN",
    features: [
      "All basic features",
      "Exclusive VIP badge",
      "Recurring listings",
      "Listings expire after 72 hours",
      "Featured placement",
      "Advanced analytics",
    ],
    bestFor: "Power sellers",
    link: "/publish/vip",
  },
];

export default function PublishNewMarketPage() {
  const [subscriptionStatus, setSubscriptionStatus] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch current subscription status
  useEffect(() => {
    let mounted = true;

    const fetchStatus = async () => {
      try {
        const res = await axios.get(`${API_URL}/status?id=${userId}`);
        if (mounted) {
          const data = {};
          res.data.activePlans?.forEach((plan) => {
            data[plan.plan] = plan.status; // backend already gives "subscribed" | "expired"
          });
          setSubscriptionStatus(data);
        }
      } catch (err) {
        console.error("Error fetching subscription status:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchStatus();
    return () => {
      mounted = false;
    };
  }, []);

  // Flutterwave config generator
  const getFlutterwaveConfig = (tier) => ({
    public_key:
      process.env.REACT_APP_FLW_PUBLIC_KEY ||
      "FLWPUBK_TEST-ec84603d310ebb74874cb52aa4563352-X",
    tx_ref: `tx-${tier.id}-${Date.now()}`,
    amount: tier.priceValue,
    currency: tier.currency,
    payment_options: "card,ussd,banktransfer",
    customer: {
      email: `${userId}@example.com`,
      phonenumber: "+2348012345678",
      name: "User",
    },
    customizations: {
      title: `${tier.title} Subscription`,
      description: `Payment for ${tier.title}`,
    },
    callback: async (response) => {
      closePaymentModal();
      console.log("Flutterwave response:", response);

      const transaction_id =
        response?.transaction_id ||
        response?.tx_ref ||
        response?.flwRef ||
        "";

      try {
        const verifyRes = await axios.post(`${API_URL}/verify-payment`, {
          transaction_id,
          plan: tier.id,
          userId,
        });

        setSubscriptionStatus((prev) => ({ ...prev, [tier.id]: "subscribed" }));
        alert(verifyRes.data.message || "Subscription successful");
      } catch (err) {
        console.error("Verification failed:", err.response?.data || err.message);
        alert("Payment verification failed");
      }
    },
    onClose: () => {},
  });

  // Handle free plan without Flutterwave
  // const handleFreePlan = async (tier) => {
  //   try {
  //     const res = await axios.post(`${API_URL}/verify-payment`, {
  //       transaction_id: "FREE_PLAN",
  //       plan: tier.id,
  //       userId,
  //     });

  //     setSubscriptionStatus((prev) => ({ ...prev, [tier.id]: "subscribed" }));
  //     alert(res.data.message || "Free plan activated");
  //   } catch (err) {
  //     console.error("Free plan error:", err.response?.data || err.message);
  //     alert("Failed to activate free plan");
  //   }
  // };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Selling Plan
          </h1>
          <p className="text-xl text-gray-600">
            Maximize your sales potential with our flexible listing options
          </p>
        </div>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
          {tiers.map((tier) => {
            const tierStatus = subscriptionStatus[tier.id];

            return (
              <div
                key={tier.id}
                className={`relative bg-white rounded-2xl shadow-lg transition-all hover:transform hover:-translate-y-2 ${
                  tier.popular ? "ring-2 ring-indigo-600" : ""
                }`}
              >
                {tier.popular && (
                  <div className="absolute top-0 right-0 bg-indigo-600 text-white px-4 py-1 rounded-tr-2xl rounded-bl-lg text-sm font-semibold">
                    Most Popular
                  </div>
                )}

                {!tier.free && (
                  <div
                    className={`absolute top-0 left-0 mt-2 ml-2 px-3 py-1 rounded-br-2xl rounded-tr-lg text-sm font-semibold ${
                      loading
                        ? "bg-gray-400 text-white"
                        : tierStatus === "subscribed"
                        ? "bg-green-500 text-white"
                        : tierStatus === "expired"
                        ? "bg-yellow-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {loading
                      ? "Checking..."
                      : tierStatus === "subscribed"
                      ? "Subscribed"
                      : tierStatus === "expired"
                      ? "Expired"
                      : "Not Subscribed"}
                  </div>
                )}

                <div className="p-8 flex flex-col h-full">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      {tier.title}
                    </h2>
                    <p className="text-3xl font-bold text-indigo-600 mb-6">
                      {tier.price}
                    </p>
                    <p className="text-sm text-gray-600 mb-6 italic">
                      Perfect for: {tier.bestFor}
                    </p>

                    <ul className="space-y-4">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <FiCheck className="w-5 h-5 text-indigo-600 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8">
                    {tier.free ? (
                      <Link to={tier.link}>
                      <button
                        className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors flex items-center justify-center"
                      >
                        Get Started{" "}
                        <FiZap className="ml-2 inline w-5 h-5" />
                      </button>
                      </Link>
                    ) : tierStatus === "subscribed" ? (
                      <Link
                        to={tier.link}
                        className="w-full block py-3 px-6 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors text-center"
                      >
                        Access Content <FiZap className="ml-2 inline w-5 h-5" />
                      </Link>
                    ) : (
                      <FlutterWaveButton
                        {...getFlutterwaveConfig(tier)}
                        className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors flex items-center justify-center"
                      >
                        Get Started <FiZap className="ml-2 w-5 h-5" />
                      </FlutterWaveButton>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center text-gray-600">
          <p className="mb-4">
            <FiRepeat className="inline mr-2 text-indigo-600" />
            30-day money-back guarantee
          </p>
          <p>
            <FiStar className="inline mr-2 text-indigo-600" />
            Secure payment processing
          </p>
        </div>
      </div>
    </div>
  );
}
