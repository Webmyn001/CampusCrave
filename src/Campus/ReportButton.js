import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiAlertCircle, FiAlertTriangle, FiShield } from 'react-icons/fi';

const ReportButton = ({ description }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="relative group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Link
        to="/report"
        state={{ initialDescription: description }}
        className="relative block rounded-xl p-0.5 overflow-hidden"
      >
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-orange-500 opacity-90 group-hover:from-red-600 group-hover:to-orange-600 transition-all duration-500" />
        
        {/* Animated Shine Effect */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -inset-full bg-gradient-to-r from-transparent via-white/40 to-transparent"
            animate={{ x: ["-100%", "200%"] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        {/* Animated Pulse Effect */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full rounded-xl"
          animate={{ 
            boxShadow: [
              "0 0 0 0 rgba(239, 68, 68, 0.4)",
              "0 0 0 15px rgba(239, 68, 68, 0)",
              "0 0 0 0 rgba(239, 68, 68, 0)"
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 4
          }}
        />
        
        {/* Content */}
        <div className="relative bg-gradient-to-br from-red-600/90 to-orange-600/90 backdrop-blur-sm rounded-[11px] px-6 py-5">
          <div className="flex items-start gap-4">
            <motion.div
              animate={{ 
                rotate: [0, 5, 0, -5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatDelay: 3
              }}
              className="relative"
            >
              <div className="absolute -inset-2 bg-white/20 rounded-full animate-ping opacity-70" />
              <FiAlertCircle className="w-8 h-8 flex-shrink-0 text-white relative z-10" />
            </motion.div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-bold text-white">Report Suspicious Activity</h3>
                <FiShield className="text-white/80" />
              </div>
              
              <p className="text-white/90 mt-2 max-w-md text-[15px]">
                {description || "Help protect others by reporting potential scams and suspicious activity"}
              </p>
              
              <div className="mt-4 flex items-center">
                <span className="text-white/80 text-sm font-medium">Take action now</span>
                <motion.div
                  className="ml-2 flex"
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity
                  }}
                >
                  <div className="w-2 h-2 bg-white rounded-full mr-1" />
                  <div className="w-2 h-2 bg-white rounded-full mr-1" />
                  <div className="w-2 h-2 bg-white rounded-full" />
                </motion.div>
              </div>
            </div>
            
            <div className="self-center">
              <motion.div
                className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
                animate={{ 
                  scale: [1, 1.1, 1],
                  backgroundColor: ["rgba(255,255,255,0.2)", "rgba(255,255,255,0.3)", "rgba(255,255,255,0.2)"]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity
                }}
              >
                <FiAlertTriangle className="text-white w-5 h-5" />
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ReportButton;