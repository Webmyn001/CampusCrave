import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiAlertCircle, FiArrowRight } from 'react-icons/fi';

const ReportButton = ({ description }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative group max-w-md mx-auto md:max-w-lg"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        to="/report"
        state={{ initialDescription: description }}
        className="relative block rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-500 via-red-600 to-orange-500 group-hover:from-red-600 group-hover:via-red-700 group-hover:to-orange-600 transition-all duration-500" />
        
        {/* Subtle Shine Effect */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -inset-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: ["-100%", "200%"] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        {/* Content Container */}
        <div className="relative bg-gradient-to-br from-red-600/90 to-orange-600/90 backdrop-blur-sm px-4 py-3 md:px-6 md:py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <motion.div
                className="relative"
                animate={{ 
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 5
                }}
              >
                <div className="p-1.5 bg-white/10 rounded-full">
                  <FiAlertCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
              </motion.div>
              
              <div>
                <h3 className="text-sm md:text-base font-bold text-white leading-tight">
                  Report Suspicious Activity
                </h3>
                <p className="text-white/90 text-xs md:text-sm mt-1 max-w-xs">
                  {description || "Help protect others by reporting potential scams"}
                </p>
              </div>
            </div>
            
            <div className="flex items-center">
              <span className="text-white/90 text-xs font-medium mr-2 hidden xs:inline">
                Report
              </span>
              <motion.div
                className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiArrowRight className="text-white w-4 h-4 md:w-5 md:h-5" />
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ReportButton;