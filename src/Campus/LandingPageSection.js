import { motion } from 'framer-motion';
import { 
  FiShoppingBag, FiShield, FiUsers, FiArrowRight, FiCheck, 
  FiTrendingUp, FiStar, FiZap, FiAward 
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import AdvertisementBanner from './Advertisment';

const LandingPage = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const featureCards = [
    {
      icon: <FiShoppingBag className="w-8 h-8 text-white" />,
      title: "Easy Buying & Selling",
      description: "List items in seconds, connect with buyers instantly",
      gradient: "from-blue-500 to-cyan-500",
      delay: 0.1
    },
    {
      icon: <FiShield className="w-8 h-8 text-white" />,
      title: "Safe Transactions",
      description: "Verified student community with scam protection",
      gradient: "from-green-500 to-emerald-500",
      delay: 0.2
    },
    {
      icon: <FiUsers className="w-8 h-8 text-white" />,
      title: "Campus Community",
      description: "Connect exclusively with OAU students",
      gradient: "from-purple-500 to-pink-500",
      delay: 0.3
    },
    
  ];

  const stats = [
    { number: "2,500+", label: "Active Students", icon: FiUsers },
    { number: "98%", label: "Satisfaction Rate", icon: FiStar },
    { number: "24/7", label: "Campus Support", icon: FiAward }
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-100 flex flex-col items-center justify-center py-8 px-4 sm:px-6 lg:px-8 overflow-hidden relative font-sans">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 2, delay: 0.2 }}
          className="absolute top-10 right-10 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-float"
        />
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 2, delay: 0.4 }}
          className="absolute bottom-10 left-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-float delay-1000"
        />
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.05 }}
          transition={{ duration: 2, delay: 0.6 }}
          className="absolute top-1/3 left-1/3 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl animate-float delay-2000"
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl w-full">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="text-center mb-16 lg:mb-20"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 shadow-lg mb-8"
          >
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              🎓 Exclusive OAU Marketplace
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Campus
            </span>
            <span className="text-gray-800 font-light">Crave</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl sm:text-3xl lg:text-4xl text-gray-700 font-light mb-6 max-w-4xl mx-auto leading-relaxed"
          >
            The trusted{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent font-semibold">
              marketplace
            </span>{" "}
            for OAU students
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto font-normal leading-relaxed"
          >
            Buy, sell, and trade safely with verified students on campus. 
            Experience the easiest way to connect with your campus community.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 lg:mb-20"
        >
          {featureCards.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                scale: 1.02,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="group relative"
            >
              {/* Background Glow */}
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-3xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
              
              {/* Feature Card */}
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-4 shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Advertisement Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-12 lg:mb-16"
        >
          <AdvertisementBanner />
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12 lg:mb-16"
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-600  rounded-xl mb-3 mx-auto">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
         className="text-center bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl py-12 px-8 shadow-2xl mb-8 relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-white rounded-full"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full"></div>
          </div>

          <div className="relative z-10 text-center">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="text-3xl lg:text-4xl font-bold text-white mb-4"
            >
              Ready to join the campus revolution?
            </motion.h3>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="text-blue-100 text-lg lg:text-xl max-w-2xl mx-auto mb-8"
            >
              Join thousands of OAU students buying and selling safely on campus
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Link to="/signup" className="flex-1 sm:flex-none">
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(255, 255, 255, 0.2)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-lg bg-white text-indigo-600 shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <span>Get Started Free</span>
                  <FiArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              
              <Link to="/marketplace" className="flex-1 sm:flex-none">
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "rgba(255, 255, 255, 0.15)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-lg border-2 border-white text-white shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <span>Explore Marketplace</span>
                  <FiTrendingUp className="w-5 h-5" />
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
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            {['Verified Students Only', 'Secure Transactions', '24/7 Support', 'Campus-Wide'].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 shadow-sm"
              >
                <FiCheck className="text-green-500 w-4 h-4" />
                <span className="text-sm font-medium text-gray-700">{item}</span>
              </motion.div>
            ))}
          </div>
          
          <p className="text-gray-600 text-sm">
            © 2025{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-semibold">
              Campus
            </span>
            <span className="text-gray-800 font-light">Crave</span>{" "}
            Marketplace • Connecting OAU students safely
          </p>
        </motion.div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(5px) rotate(-1deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .rounded-4xl {
          border-radius: 2.5rem;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
