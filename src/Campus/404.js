import { Link } from 'react-router-dom';
import { FiArrowLeft, FiAlertTriangle, FiMail, FiHome, FiBook, FiCoffee } from 'react-icons/fi';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-800 to-purple-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-1/4 -left-24 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-400/5 rounded-full blur-2xl"></div>
      
      {/* Floating animated elements */}
      <motion.div 
        className="absolute top-1/4 left-1/4 text-5xl opacity-20"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 10, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <FiBook />
      </motion.div>
      
      <motion.div 
        className="absolute bottom-1/3 right-1/3 text-5xl opacity-20"
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -15, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <FiCoffee />
      </motion.div>
      
      <motion.div 
        className="absolute top-1/3 right-1/4 text-4xl opacity-15"
        animate={{ 
          y: [0, -15, 0],
          x: [0, 10, 0]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <FiMail />
      </motion.div>

      <div className="max-w-lg w-full text-center relative z-10">
        {/* Glass-morphism content card */}
        <motion.div 
          className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* 404 Display */}
          <div className="relative mb-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
              className="absolute -top-2 -right-2 w-14 h-14 bg-red-400/20 rounded-full flex items-center justify-center backdrop-blur-md"
            >
              <FiAlertTriangle className="text-red-300 text-xl" />
            </motion.div>
            
            <motion.h1 
              className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-100 drop-shadow-lg"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              404
            </motion.h1>
          </div>

          <motion.h2 
            className="text-2xl font-semibold text-white mb-4 tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Page Not Found
          </motion.h2>
          
          <motion.p 
            className="text-blue-100/80 mb-8 leading-relaxed text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Looks like you've wandered off campus! The page you're looking for doesn't exist or has been moved.
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Link
              to="/"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium
                         hover:from-blue-400 hover:to-indigo-500 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5"
            >
              <FiHome className="flex-shrink-0" />
              Go to Homepage
            </Link>
            
            <a
              href="mailto:support@campuscrave.com"
              className="flex items-center justify-center gap-2 px-6 py-3 text-white border border-white/20 rounded-xl font-medium
                         hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              <FiMail className="flex-shrink-0" />
              Report Issue
            </a>
          </motion.div>

          {/* Decorative elements */}
          <motion.div 
            className="mt-8 flex justify-center gap-4 opacity-60"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <motion.span 
              className="inline-block text-2xl"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              🏛️
            </motion.span>
            <motion.span 
              className="inline-block text-2xl"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
            >
              📚
            </motion.span>
            <motion.span 
              className="inline-block text-2xl"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, delay: 1 }}
            >
              🎓
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Back to previous page */}
        <motion.div 
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Link
            to="#"
            onClick={() => window.history.back()}
            className="inline-flex items-center text-sm text-blue-200 hover:text-white gap-1 transition-colors duration-300"
          >
            <FiArrowLeft className="flex-shrink-0" />
            Or go back to previous page
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;