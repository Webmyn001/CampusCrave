import React, { useEffect, useState } from "react";
import { FiCheck, FiZap, FiStar, FiRepeat, FiUser, FiTrendingUp, FiShield } from "react-icons/fi";
import { Link } from "react-router-dom";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import axios from "axios";

const API_URL = "https://campus-plum.vercel.app/api";
const userId = localStorage.getItem("userId");
const userEmail = localStorage.getItem("userEmail")
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
    icon: FiUser,
    gradient: "from-gray-100 to-gray-200",
    color: "text-gray-600"
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
    icon: FiZap,
    gradient: "from-blue-50 to-indigo-100",
    color: "text-blue-600"
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
    icon: FiTrendingUp,
    gradient: "from-purple-50 to-pink-100",
    color: "text-purple-600"
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


  //i will later customize this flutterwave payment page
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

  const getStatusBadgeColor = (tier, tierStatus) => {
    if (loading) return "bg-gray-400 text-white";
    if (tierStatus === "subscribed") return "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg";
    if (tierStatus === "expired") return "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg";
    return "bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg";
  };

  const StatusBadge = ({ tier, tierStatus }) => (
    <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${getStatusBadgeColor(tier, tierStatus)} shadow-lg`}>
      {loading ? "Checking..." : tierStatus === "subscribed" ? "✓ Active" : tierStatus === "expired" ? "⏰ Expired" : "Not Subscribed"}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-200 rounded-full blur-3xl opacity-10 animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 shadow-lg mb-6">
            <FiShield className="w-5 h-5 text-indigo-600" />
            <span className="text-sm font-semibold text-gray-700">Choose Your Plan</span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6">
            Boost Your Sales
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Maximize your selling potential with our flexible listing options designed for every type of seller
          </p>
        </div>

        {/* Pricing Tiers */}
        <div className="grid gap-8 lg:gap-12 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {tiers.map((tier) => {
            const tierStatus = subscriptionStatus[tier.id];
            const IconComponent = tier.icon;

            return (
              <div
                key={tier.id}
                className={`relative group cursor-pointer transition-all duration-500 ${
                  hoveredTier === tier.id ? 'scale-105' : 'scale-100'
                }`}
                onMouseEnter={() => setHoveredTier(tier.id)}
                onMouseLeave={() => setHoveredTier(null)}
              >
                {/* Status Badge */}
                {!tier.free && <StatusBadge tier={tier} tierStatus={tierStatus} />}

                {/* Popular Badge */}
                {tier.popular && (
                  <div className="absolute -top-4 right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
                    🔥 Most Popular
                  </div>
                )}

                {/* Main Card */}
                <div className={`h-full bg-gradient-to-br ${tier.gradient} rounded-3xl border border-white/50 shadow-xl overflow-hidden transition-all duration-300 group-hover:shadow-2xl`}>
                  
                  {/* Card Header */}
                  <div className="p-8 text-center border-b border-white/30">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-white rounded-2xl shadow-lg">
                        <IconComponent className={`w-8 h-8 ${tier.color}`} />
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.title}</h3>
                    <div className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent mb-3">
                      {tier.price}
                    </div>
                    <p className="text-sm text-gray-600 italic bg-white/50 px-3 py-1 rounded-full inline-block">
                      Perfect for {tier.bestFor}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="p-8">
                    <ul className="space-y-4 mb-8">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start transition-transform duration-200 hover:translate-x-1">
                          <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                            <FiCheck className="w-3 h-3 text-green-600" />
                          </div>
                          <span className="text-gray-700 font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Action Button */}
                    <div className="mt-auto">
                      {tier.free ? (
                        <Link to={tier.link}>
                          <button className="w-full py-4 px-6 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                            <FiUser className="w-5 h-5" />
                            Get Started Free
                          </button>
                        </Link>
                      ) : tierStatus === "subscribed" ? (
                        <Link to={tier.link}>
                          <button className="w-full py-4 px-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                            <FiZap className="w-5 h-5" />
                            Access Dashboard
                          </button>
                        </Link>
                      ) : (
                        <FlutterWaveButton
                          {...getFlutterwaveConfig(tier)}
                          className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                        >
                          <FiZap className="w-5 h-5" />
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

        {/* Footer Features */}
        <div className="mt-20 text-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-lg">
              <FiRepeat className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">30-Day Guarantee</h3>
              <p className="text-gray-600">Not satisfied? Get a full refund within 30 days</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-lg">
              <FiStar className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Payments</h3>
              <p className="text-gray-600">Bank-level security with Flutterwave</p>
            </div>
          </div>
        </div>

        {/* Support Text */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Need help choosing? <span className="text-indigo-600 font-semibold cursor-pointer hover:underline">Contact our support team</span>
          </p>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}