import { motion } from 'framer-motion';
import { 
  FiShoppingBag, FiShield, FiUsers, FiArrowRight, FiCheck, 
  FiTrendingUp, FiStar, FiAward 
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import AdvertisementBanner from './Advertisment';
import { useState } from 'react';

const LandingPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 12 } }
  };

  const featureCards = [
    { icon: <FiShoppingBag className="w-6 h-6 text-white" />, title: "Easy Buying & Selling", description: "List items in seconds, connect with buyers instantly", gradient: "from-blue-500 to-cyan-500" },
    { icon: <FiShield className="w-6 h-6 text-white" />, title: "Safe Transactions", description: "Verified student community with scam protection", gradient: "from-green-500 to-emerald-500" },
    { icon: <FiUsers className="w-6 h-6 text-white" />, title: "Campus Community", description: "Connect exclusively with OAU students", gradient: "from-purple-500 to-pink-500" }
  ];

  const stats = [
    { number: "2,500+", label: "Active Students", icon: FiUsers },
    { number: "98%", label: "Satisfaction Rate", icon: FiStar },
    { number: "24/7", label: "Campus Support", icon: FiAward }
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-100 flex flex-col items-center py-6 px-4 sm:px-6 lg:px-8 relative font-sans overflow-hidden">
      
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div className="absolute top-10 right-10 w-60 h-60 bg-blue-300 rounded-full mix-blend-multiply filter blur-2xl animate-float" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 0.1 }} transition={{ duration: 2, delay: 0.2 }}/>
        <motion.div className="absolute bottom-10 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl animate-float delay-1000" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 0.1 }} transition={{ duration: 2, delay: 0.4 }}/>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl w-full">
        
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-12">
          <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 shadow-md mb-6">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              🎓 Exclusive OAU Marketplace
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 leading-tight">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Campus</span>
            <span className="text-gray-800 font-light">Crave</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-lg sm:text-xl text-gray-700 font-light mb-4 max-w-3xl mx-auto leading-relaxed">
            The trusted <span className="bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent font-semibold">marketplace</span> for OAU students
          </motion.p>

          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Buy, sell, and trade safely with verified students on campus. Experience the easiest way to connect with your campus community.
          </motion.p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {featureCards.map((feature, index) => (
            <motion.div key={index} variants={itemVariants} whileHover={{ y: -5, scale: 1.02 }} className="group relative">
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-md hover:shadow-lg h-full">
                <div className={`inline-flex p-2 rounded-xl bg-gradient-to-r ${feature.gradient} mb-3 shadow-md`}>{feature.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-snug">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Advertisement */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }} className="mb-8">
          <AdvertisementBanner />
        </motion.div>

        {/* Stats Section */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.0 }} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div key={index} whileHover={{ scale: 1.03 }} className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-md">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-indigo-600 rounded-lg mb-2 mx-auto">
                  <IconComponent className="w-5 h-5 text-white" />
                </div>
                <div className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent mb-1">{stat.number}</div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

     {/* CTA Section */}
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.8, delay: 1.2 }}
  className="text-center bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl py-8 px-6 shadow-xl mb-6 relative overflow-hidden"
>
  {/* Background Pattern */}
  <div className="absolute inset-0 opacity-10">
    <div className="absolute -top-16 -right-16 w-32 h-32 bg-white rounded-full"></div>
    <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-white rounded-full"></div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/5 rounded-full"></div>
  </div>

  <div className="relative z-10 text-center">
    <motion.p
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5 }}
      className="text-blue-100 text-base sm:text-lg max-w-xl mx-auto mb-6"
    >
      Join thousands of OAU students buying and selling safely on campus
    </motion.p>

    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6 }}
      className="flex flex-col sm:flex-row justify-center gap-3"
    >
      <Link to="/signup" className="flex-1 sm:flex-none">
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(255, 255, 255, 0.2)" }}
          whileTap={{ scale: 0.95 }}
          className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-sm sm:text-base bg-white text-indigo-600 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
        >
          <span>Get Started Free</span>
          <FiArrowRight className="w-4 h-4" />
        </motion.button>
      </Link>

      <Link to="/marketplace" className="flex-1 sm:flex-none">
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
          whileTap={{ scale: 0.95 }}
          className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-sm sm:text-base border-2 border-white text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
        >
          <span>Explore Marketplace</span>
          <FiTrendingUp className="w-4 h-4" />
        </motion.button>
      </Link>
    </motion.div>
  </div>
</motion.div>

{/* Footer */}
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.6, delay: 1.8 }}
  className="text-center"
>
  <p className="text-gray-600 text-xs sm:text-sm">
    © 2025{" "}
    <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-semibold">
      Campus
    </span>
    <span className="text-gray-800 font-light">Crave</span>{" "}
    Marketplace • Connecting OAU students safely
  </p>
</motion.div>

      <style jsx>{`
        @keyframes float {
          0%,100%{ transform: translateY(0px) rotate(0deg); }
          33%{ transform: translateY(-8px) rotate(1deg); }
          66%{ transform: translateY(4px) rotate(-1deg); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default LandingPage;
