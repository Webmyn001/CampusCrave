import { Link } from 'react-router-dom';
import { FiArrowLeft, FiAlertTriangle, FiMail, FiHome } from 'react-icons/fi';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute top-1/4 -left-24 w-72 h-72 bg-indigo-100 rounded-full opacity-10 blur-2xl"></div>
      <div className="absolute bottom-1/4 -right-24 w-72 h-72 bg-blue-100 rounded-full opacity-10 blur-2xl"></div>
      
      {/* Floating campus icons */}
      <motion.div 
        className="absolute top-20 left-10 text-4xl opacity-5"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        📚
      </motion.div>
      <motion.div 
        className="absolute bottom-20 right-10 text-4xl opacity-5"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      >
        🚲
      </motion.div>

      <div className="max-w-lg w-full text-center relative z-10">
        {/* Content Card */}
        <motion.div 
          className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-indigo-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* 404 Display */}
          <div className="relative mb-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute -top-4 -right-4 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center"
            >
              <FiAlertTriangle className="text-red-500 text-2xl animate-pulse" />
            </motion.div>
            
            <motion.h1 
              className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              404
            </motion.h1>
          </div>

          <motion.h2 
            className="text-2xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Page Not Found
          </motion.h2>
          
          <motion.p 
            className="text-gray-600 mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Looks like you've wandered off campus! The page you're looking for doesn't exist or has been moved.
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Link
              to="/"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg font-medium
                         hover:from-indigo-700 hover:to-blue-600 transition-all shadow-md hover:shadow-lg"
            >
              <FiHome className="flex-shrink-0" />
              Go to Homepage
            </Link>
            
            <a
              href="mailto:support@campuscrave.com"
              className="flex items-center justify-center gap-2 px-6 py-3 text-indigo-600 border border-indigo-200 rounded-lg font-medium
                         hover:bg-indigo-50 transition-colors"
            >
              <FiMail className="flex-shrink-0" />
              Report Issue
            </a>
          </motion.div>

          {/* Campus illustration */}
          <motion.div 
            className="mt-8 flex justify-center gap-4 opacity-80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <span className="inline-block text-3xl">🏛️</span>
            <span className="inline-block text-3xl">📦</span>
            <span className="inline-block text-3xl">📱</span>
          </motion.div>
        </motion.div>

        {/* Back to previous page */}
        <motion.div 
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Link
            to="#"
            onClick={() => window.history.back()}
            className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-800 gap-1"
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