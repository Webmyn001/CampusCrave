import { motion } from 'framer-motion';

const LandingPage = () => {
  return (
    <div className="w-full bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-100 py-6 px-4 sm:px-6 lg:px-8 relative font-sans overflow-hidden">
      
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-10 right-10 w-60 h-60 bg-blue-300 rounded-full mix-blend-multiply filter blur-2xl animate-float" 
          initial={{ scale: 0, opacity: 0 }} 
          animate={{ scale: 1, opacity: 0.1 }} 
          transition={{ duration: 2, delay: 0.2 }}
        />
        <motion.div 
          className="absolute bottom-10 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl animate-float delay-1000" 
          initial={{ scale: 0, opacity: 0 }} 
          animate={{ scale: 1, opacity: 0.1 }} 
          transition={{ duration: 2, delay: 0.4 }}
        />
      </div>

      {/* Header Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* Logo and Caption */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }} 
          className="text-center"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.3 }} 
            className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-2 leading-tight"
          >
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Campus</span>
            <span className="text-gray-800 font-light">Crave</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.4 }} 
            className="text-lg sm:text-xl text-gray-700 font-light max-w-3xl mx-auto"
          >
            The trusted marketplace for OAU students
          </motion.p>
        </motion.div>
      </div>

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