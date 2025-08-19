import axios from 'axios';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend, FiMessageSquare, FiUser, FiHeart, FiCoffee, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        'https://campus-plum.vercel.app/api/contact/', formData
      );

      if (response.status === 201) {
        toast.success('🌟 Message sent successfully!', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error(`😢 Error: ${error.response?.data?.message || 'Something went wrong!'}`, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const staggerChildren = {
    visible: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 right-10 w-48 h-48 bg-indigo-100 rounded-full opacity-20 animate-blob"></div>
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-blue-100 rounded-full opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-purple-100 rounded-full opacity-20 animate-blob animation-delay-4000"></div>
      
      <div className="max-w-6xl mx-auto px-4 py-16 relative z-10">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg mb-6">
            <div className="p-3 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-full">
              <FiMail className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent mb-4">
            Contact Campus Crave
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're here to help and answer any questions you might have about buying or selling on campus
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 gap-12"
          variants={staggerChildren}
          initial="hidden"
          animate="visible"
        >
          {/* Contact Info */}
          <div className="space-y-8">
            <motion.div 
              variants={fadeIn}
              className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-indigo-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full">
                  <FiMapPin className="text-xl text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Campus Headquarters</h3>
                  <p className="text-gray-600">
                    Fajuyi Hall of Residence<br />
                    Block 2, Room 308<br />
                    Obafemi Awolowo University.
                  </p>
                  <div className="mt-3 text-sm text-indigo-600 font-medium">
                    Current operational base
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              variants={fadeIn}
              className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-indigo-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full">
                  <FiPhone className="text-xl text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Call / WhatsApp</h3>
                  <p className="text-gray-600 text-lg font-medium">
                    09164028709
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <motion.a 
                      href="tel:09164028709"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-md"
                    >
                      Call Now
                    </motion.a>
                    <motion.a 
                      href="https://wa.me/2349164028709"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors shadow-md"
                    >
                      WhatsApp
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              variants={fadeIn}
              className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-indigo-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full">
                  <FiMail className="text-xl text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Email Us</h3>
                  <p className="text-gray-600">
                    bellomuhyideen0001@gmail.com
                  </p>
                  <motion.a 
                    href="mailto:bellomuhyideen0001@gmail.com" 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-3 inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-md"
                  >
                    Send Email
                  </motion.a>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              variants={fadeIn}
              className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-2xl shadow-lg border border-amber-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full">
                  <FiUser className="text-xl text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Founder</h3>
                  <p className="text-gray-600">
                    Bello Muhyideen, Part 5<br />
                    Dept. of Soil Science & Land Resources Management<br/>
                    Obafemi Awolowo University, Ile-Ife, Osun State, Nigeria.
                  </p>
                  <div className="mt-4 flex gap-3">
                   
                    <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                      <FiLinkedin className="text-gray-700" />
                    </a>
                    <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                      <FiTwitter className="text-gray-700" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.form 
            onSubmit={handleSubmit} 
            variants={fadeIn}
            className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg space-y-6 border border-gray-100 hover:shadow-xl transition-all duration-300"
          >
            <div className="mb-2">
              <h2 className="text-2xl font-bold text-gray-800 mb-1">Send a Message</h2>
              <p className="text-gray-600">Have questions or feedback? We'd love to hear from you!</p>
            </div>
            
            <div>
              <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <FiUser className="text-gray-500" />
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Your name"
                required
                disabled={isSubmitting}
              />
            </div>
            
            <div>
              <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <FiMail className="text-gray-500" />
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="your.email@example.com"
                required
                disabled={isSubmitting}
              />
            </div>
            
            <div>
              <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <FiMessageSquare className="text-gray-500" />
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows="5"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Type your message here..."
                required
                disabled={isSubmitting}
              ></textarea>
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-3.5 px-4 rounded-lg font-semibold hover:from-indigo-700 hover:to-blue-600 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden shadow-lg"
            >
              {isSubmitting && (
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-blue-600"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <FiSend className="text-lg transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </span>
            </motion.button>
          </motion.form>
        </motion.div>
        
        {/* Campus Note */}
        <motion.div 
          variants={fadeIn}
          className="mt-16 text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <FiHeart className="text-indigo-600" />
            Campus Crave Support
          </div>
          <p className="text-gray-600">
            As a fellow student at Obafemi Awolowo University, I understand the challenges of campus commerce firsthand.
            Please allow up to 24 hours for responses during academic periods. For urgent matters, WhatsApp is the fastest way to reach me.
          </p>
          
          <div className="mt-8 flex items-center justify-center gap-4 text-gray-500">
            <div className="flex items-center gap-1">
              <FiCoffee className="text-amber-600" />
              <span className="text-sm">Crafted with care</span>
            </div>
            <span>•</span>
            <span className="text-sm">OAU Campus</span>
          </div>
        </motion.div>
      </div>
      
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default ContactPage;