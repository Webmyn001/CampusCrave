import { motion } from 'framer-motion';
import { FiShoppingBag, FiShield, FiUsers, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      
      {/* Main content */}
      <div className="relative z-10 max-w-5xl w-full">
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center bg-white px-4 py-1.5 rounded-full border border-indigo-100 shadow-sm mb-6"
          >
            <span className="text-sm font-medium text-indigo-600">
              Campus Marketplace
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-4"
          >
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Campus
            </span>
            <span className="text-gray-800">Crave</span> Marketplace
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
          >
            The trusted marketplace for students to buy, sell, and trade safely on campus
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8 mb-12 md:mb-16">
          {[
            {
              icon: <FiShoppingBag className="w-8 h-8 md:w-10 md:h-10 text-indigo-600" />,
              title: "Easy Buying & Selling",
              description: "List items in seconds, connect with buyers instantly"
            },
            {
              icon: <FiShield className="w-8 h-8 md:w-10 md:h-10 text-indigo-600" />,
              title: "Secure Transactions",
              description: "Verified student accounts and secure payment options"
            },
            {
              icon: <FiUsers className="w-8 h-8 md:w-10 md:h-10 text-indigo-600" />,
              title: "Campus Community",
              description: "Connect with students from your university"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="bg-white rounded-xl md:rounded-2xl shadow-md md:shadow-lg p-4 md:p-6 border border-gray-100 hover:shadow-xl transition-all"
            >
              <div className="mb-3 md:mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1 md:mb-2">{feature.title}</h3>
              <p className="text-sm md:text-base text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Link to="/signup">
             <button className="inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-base md:text-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 mb-6">
              <span>Get Started</span>
              <FiArrowRight className="ml-2 md:ml-3 w-4 h-4 md:w-5 md:h-5" />
            </button>
            
            </Link>
           
          </motion.div>
        </div>
      </div>
      
   
    </div>
  );
};

export default LandingPage;