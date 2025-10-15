import React, { useEffect, useState } from "react";
import {
  FiCheck,
  FiZap,
  FiStar,
  FiRepeat,
  FiUser,
  FiTrendingUp,
  FiShield,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import axios from "axios";

const API_URL = "https://campus-plum.vercel.app/api";
const userId = localStorage.getItem("userId");
const userEmail = localStorage.getItem("userEmail");

const tiers = [
  {
    id: "starter",
    title: "Starter Tier",
    price: "Free Forever",
    features: [
      "Basic seller profile setup",
      "Unlimited listings",
      "Upload up to 2 images per listing",
      "Listings expire after 24 hours",
      "Standard visibility",
    ],
    bestFor: "Casual sellers",
    link: "/publish/starter",
    free: true,
    icon: FiUser,
    gradient: "from-gray-100 to-gray-200",
    color: "text-gray-600",
  },
  {
    id: "standard",
    title: "Standard Tier",
    price: "₦1,500/month",
    priceValue: 1500,
    currency: "NGN",
    features: [
      "Upload up to 3 images per listing",
      "Listings expire after 7 days (1 week)",
      "Priority visibility",
    ],
    bestFor: "Frequent sellers",
    link: "/publish/pro",
    icon: FiZap,
    gradient: "from-blue-50 to-indigo-100",
    color: "text-blue-600",
  },
  {
    id: "premium",
    title: "Premium Tier",
    price: "₦2,500/month",
    priceValue: 2500,
    currency: "NGN",
    features: [
      "Upload up to 4 images (first image must be a business/service flyer)",
      "Listings expire after 30 days (1 month)",
      "Best for business owners and service providers",
      "Business flyer displayed on homepage for visibility",
    ],
    bestFor: "Business owners and Service providers",
    link: "/publish/vip",
    icon: FiTrendingUp,
    gradient: "from-purple-50 to-pink-100",
    color: "text-purple-600",
  },
];

export default function PublishNewMarketPage() {
  const [subscriptionStatus, setSubscriptionStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const [hoveredTier, setHoveredTier] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchStatus = async () => {
      try {
        const res = await axios.get(`${API_URL}/status?id=${userId}`);
        if (mounted) {
          const data = {};
          res.data.activePlans?.forEach((plan) => {
            data[plan.plan] = plan.status;
          });
          localStorage.setItem("subscriptionStatus", JSON.stringify(data));
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

  const getFlutterwaveConfig = (tier) => ({
    public_key:
      process.env.REACT_APP_FLW_PUBLIC_KEY ||
      "FLWPUBK_TEST-ec84603d310ebb74874cb52aa4563352-X",
    tx_ref: `tx-${tier.id}-${Date.now()}`,
    amount: tier.priceValue,
    currency: tier.currency,
    payment_options: "card,ussd,banktransfer",
    customer: {
      email: `${userEmail}`,
      phonenumber: "+2348012345678",
      name: "User",
    },
    customizations: {
      title: `${tier.title} Subscription`,
      description: `Payment for ${tier.title}`,
    },
    callback: async (response) => {
      closePaymentModal();
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

        setSubscriptionStatus((prev) => ({
          ...prev,
          [tier.id]: "subscribed",
        }));
        alert(verifyRes.data.message || "Subscription successful");
      } catch (err) {
        console.error("Verification failed:", err.response?.data || err.message);
        alert("Payment verification failed");
      }
    },
    onClose: () => {},
  });

  const getStatusBadgeColor = (tier, tierStatus) => {
    if (loading) return "bg-gray-400 text-white";
    if (tierStatus === "subscribed")
      return "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg";
    if (tierStatus === "expired")
      return "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg";
    return "bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg";
  };

  const StatusBadge = ({ tier, tierStatus }) => (
    <div
      className={`absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${getStatusBadgeColor(
        tier,
        tierStatus
      )} shadow-lg`}
    >
      {loading
        ? "Checking..."
        : tierStatus === "subscribed"
        ? "✓ Active"
        : tierStatus === "expired"
        ? "⏰ Expired"
        : "Not Subscribed"}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-5 py-2 rounded-full border border-white/20 shadow-md mb-5">
            <FiShield className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-semibold text-gray-700">
              Choose Your Plan
            </span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-4">
            Boost Your Sales
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Maximize your selling potential with our flexible listing options
            designed for every type of seller
          </p>
        </div>

        <div className="grid gap-10 lg:gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {tiers.map((tier) => {
            const tierStatus = subscriptionStatus[tier.id];
            const IconComponent = tier.icon;

            return (
              <div
                key={tier.id}
                className={`relative group cursor-pointer transition-all duration-500 ${
                  hoveredTier === tier.id ? "scale-105" : "scale-100"
                }`}
                onMouseEnter={() => setHoveredTier(tier.id)}
                onMouseLeave={() => setHoveredTier(null)}
              >
                {!tier.free && (
                  <StatusBadge tier={tier} tierStatus={tierStatus} />
                )}

                <div
                  className={`h-full bg-gradient-to-br ${tier.gradient} rounded-2xl border border-white/50 shadow-lg overflow-hidden transition-all duration-300 group-hover:shadow-2xl`}
                >
                  <div className="p-6 text-center border-b border-white/30">
                    <div className="flex justify-center mb-3">
                      <div className="p-2 bg-white rounded-xl shadow-md">
                        <IconComponent
                          className={`w-6 h-6 ${tier.color}`}
                        />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {tier.title}
                    </h3>
                    <div className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent mb-2">
                      {tier.price}
                    </div>
                    <p className="text-xs text-gray-600 italic bg-white/50 px-3 py-1 rounded-full inline-block">
                      Perfect for {tier.bestFor}
                    </p>
                  </div>

                  <div className="p-6">
                    <ul className="space-y-3 mb-6">
                      {tier.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-start transition-transform duration-200 hover:translate-x-1"
                        >
                          <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-2 mt-0.5">
                            <FiCheck className="w-3 h-3 text-green-600" />
                          </div>
                          <span className="text-gray-700 text-sm font-medium">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto">
                      {tier.free ? (
                        <Link to={tier.link}>
                          <button className="w-full py-3 px-5 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                            <FiUser className="w-4 h-4" />
                            Get Started Free
                          </button>
                        </Link>
                      ) : tierStatus === "subscribed" ? (
                        <Link to={tier.link}>
                          <button className="w-full py-3 px-5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                            <FiZap className="w-4 h-4" />
                            Access Dashboard
                          </button>
                        </Link>
                      ) : (
                        <FlutterWaveButton
                          {...getFlutterwaveConfig(tier)}
                          className="w-full py-3 px-5 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                        >
                          <FiZap className="w-4 h-4" />
                          Subscribe Now
                        </FlutterWaveButton>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-white/20 shadow-lg">
              <FiRepeat className="w-10 h-10 text-green-600 mx-auto mb-1" />
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                30-Day Guarantee
              </h3>
              <p className="text-gray-600 text-sm">
                Not satisfied? Get a full refund within 30 days
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-white/20 shadow-lg">
              <FiStar className="w-10 h-10 text-yellow-600 mx-auto mb-1" />
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                Secure Payments
              </h3>
              <p className="text-gray-600 text-sm">
                Bank-level security with Flutterwave
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="text-gray-500 text-xs">
            Need help choosing?{" "}
            <span className="text-indigo-600 font-semibold cursor-pointer hover:underline">
              Contact our support team
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
