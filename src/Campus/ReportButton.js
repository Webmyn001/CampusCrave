import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiAlertCircle, FiArrowRight } from 'react-icons/fi';

const ReportButton = ({ description }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative group"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        to="/report"
        state={{ initialDescription: description }}
        className="relative block rounded-lg p-0.5 overflow-hidden"
      >
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-orange-500 group-hover:from-red-600 group-hover:to-orange-600 transition-colors duration-300" />
        
        {/* Subtle Shine Effect */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -inset-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ["-100%", "200%"] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        {/* Content - Compact Layout */}
        <div className="relative bg-gradient-to-br from-red-600/90 to-orange-600/90 backdrop-blur-sm rounded-[9px] px-4 py-3">
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
                <FiAlertCircle className="w-5 h-5 flex-shrink-0 text-white" />
              </motion.div>
              
              <div>
                <h3 className="text-sm md:text-base font-bold text-white leading-tight">
                  Report Suspicious Activity
                </h3>
                <p className="text-white/90 text-xs mt-1 hidden sm:block max-w-xs">
                  {description || "Help protect others by reporting potential scams"}
                </p>
              </div>
            </div>
            
            <div className="flex items-center">
              <span className="text-white/80 text-xs font-medium mr-1 hidden sm:inline">
                Report
              </span>
              <motion.div
                className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center"
                animate={{ 
                  backgroundColor: ["rgba(255,255,255,0.2)", "rgba(255,255,255,0.3)"]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <FiArrowRight className="text-white w-3.5 h-3.5" />
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ReportButton;