import { motion } from 'framer-motion';
import { FiShoppingBag, FiShield, FiUsers, FiArrowRight, FiHeart, FiCheck } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans">
      {/* Decorative elements */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute top-10 right-10 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl"
      />
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="absolute bottom-10 left-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl"
      />
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.2 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute top-1/3 left-1/4 w-56 h-56 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl"
      />
      
      {/* Main content */}
      <div className="relative z-10 max-w-6xl w-full">
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
            className="inline-flex items-center justify-center bg-white px-5 py-2 rounded-full border border-indigo-100 shadow-sm mb-8"
          >
            <span className="text-base font-medium text-indigo-600 tracking-wider">
              Campus Marketplace
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 100 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Campus
            </span>
            <span className="text-gray-800 font-light">Crave</span>
            <br />
            <span className="text-3xl md:text-4xl font-normal text-gray-600 tracking-wide mt-4 block">
              The trusted marketplace for students
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mt-8 font-light tracking-wide"
          >
            Buy, sell, and trade safely with fellow students on campus
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: <FiShoppingBag className="w-10 h-10 text-white" />,
              title: "Easy Buying & Selling",
              description: "List items in seconds, connect with buyers instantly"
            },
            {
              icon: <FiShield className="w-10 h-10 text-white" />,
              title: "Safe Transactions",
              description: "Built-in scam reporting with quick response"
            },
            {
              icon: <FiUsers className="w-10 h-10 text-white" />,
              title: "Campus Community",
              description: "Connect exclusively with students from your university"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.3 + index * 0.1,
                type: "spring",
                stiffness: 120
              }}
              whileHover={{ 
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 transition-all"
            >
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center mr-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
              </div>
              <p className="text-gray-600 text-lg pl-2 border-l-4 border-indigo-200">{feature.description}</p>
            </motion.div>
          ))}
        </div>
        

        
        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="text-center bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl py-10 px-6 shadow-2xl mb-4"
        >
          <h3 className="text-3xl font-bold text-white mb-4">Ready to join the campus marketplace?</h3>
          <p className="text-indigo-100 text-xl max-w-2xl mx-auto mb-4">
            Join thousands of students buying and selling safely on campus
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-lg bg-white text-indigo-600 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span>Get Started Today</span>
                <FiArrowRight className="ml-3 w-5 h-5" />
              </motion.button>
            </Link>
            
          </div>
        </motion.div>
        
        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.4 }}
          className="text-center text-gray-600 mt-12"
        >
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            {[ '24/7 Support', 'Campus Only'].map((item, i) => (
              <div key={i} className="flex items-center">
                <FiCheck className="text-green-500 mr-2" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <p className="text-sm">© 2025 CampusCrave Marketplace. Connecting students across campuses.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;