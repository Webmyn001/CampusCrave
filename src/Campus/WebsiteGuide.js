import React from "react";
import { motion } from "framer-motion";
import { Users, ShoppingBag, ShieldAlert } from "lucide-react";

const steps = [
  {
    title: "For Sellers 🚀",
    icon: <Users className="w-8 h-8 text-emerald-600" />,
    description: [
      "Sign up and create your account in seconds.",
      "Log in anytime to manage your profile.",
      "Update your profile details to build trust.",
      "Start listing your products or services with ease!"
    ],
    color: "from-emerald-50 to-green-100 border-emerald-200"
  },
  {
    title: "For Buyers 🛒",
    icon: <ShoppingBag className="w-8 h-8 text-indigo-600" />,
    description: [
      "Click on ‘Start Trading’ to enter the marketplace.",
      "Browse through listings or use search to find exactly what you need.",
      "View details, compare options, and contact sellers directly.",
      "Shop smart, safe, and stress-free!"
    ],
    color: "from-indigo-50 to-blue-100 border-indigo-200"
  },
  {
    title: "Scam Report 🔒",
    icon: <ShieldAlert className="w-8 h-8 text-red-600" />,
    description: [
      "Click ‘Report’ from the navbar or footer.",
      "Choose the type of scam you want to report.",
      "Give full details of the issue (the more info, the better).",
      "Submit anonymously — your safety is our priority!"
    ],
    color: "from-red-50 to-rose-100 border-red-200"
  }
];

export default function WebsiteGuide() {
  return (
    <div className="min-h-screen flex flex-col font-raleway justify-center bg-gradient-to-br from-gray-50 to-white pt-12 pb-8 px-6 lg:px-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto text-center mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Welcome to <span className="text-emerald-600">Campus Market</span> 👋
        </h1>
        <p className="mt-3 text-gray-600 text-lg">
          Whether you’re selling, buying, or keeping our community safe,
          here’s your quick guide to getting started.
        </p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            viewport={{ once: true }}
            className={`p-6 rounded-2xl border shadow-sm bg-gradient-to-br ${step.color}`}
          >
            <div className="flex items-center gap-3 mb-4">
              {step.icon}
              <h2 className="text-xl font-semibold text-gray-800">{step.title}</h2>
            </div>
            <ul className="space-y-2 text-gray-700 text-sm md:text-base text-left">
              {step.description.map((line, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-emerald-600">✔</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
