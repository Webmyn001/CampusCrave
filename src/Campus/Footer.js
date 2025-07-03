import { motion } from 'framer-motion';
import { FiFacebook, FiTwitter, FiInstagram, FiMail, FiArrowRight, 
  FiMapPin, FiPhone, FiMail as FiEmail, FiShield, FiHeart } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300 pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16"
        >
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-5"
          >
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 w-10 h-10 rounded-lg flex items-center justify-center">
                <FiShield className="text-white w-6 h-6" />
              </div>
              <h3 className="text-white text-xl font-bold">CampusCrave</h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Empowering students with secure campus experiences through verified transactions and community protection.
            </p>
            <div className="flex space-x-3">
              {[FiFacebook, FiTwitter, FiInstagram].map((Icon, idx) => (
                <motion.a
                  key={idx}
                  href="#"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2.5 rounded-full bg-gray-800 hover:bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300"
                >
                  <Icon className="w-5 h-5 text-white" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-5"
          >
            <h4 className="text-white text-lg font-semibold relative inline-block pb-2 after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-gradient-to-r after:from-indigo-500 after:to-purple-500">
              Quick Links
            </h4>
            {['Marketplace', 'Verification', 'Security', 'Resources', 'Campus Partners'].map((link) => (
              <motion.a
                key={link}
                href="#"
                whileHover={{ x: 5 }}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
              >
                <FiArrowRight className="text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span>{link}</span>
              </motion.a>
            ))}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-5"
          >
            <h4 className="text-white text-lg font-semibold relative inline-block pb-2 after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-gradient-to-r after:from-indigo-500 after:to-purple-500">
              Contact Us
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FiMapPin className="text-indigo-400 w-5 h-5 mt-1 flex-shrink-0" />
                <p className="text-gray-400">Fajuyi Hall, Block 2, Room 308<br />Obafemi Awolowo University</p>
              </div>
              <div className="flex items-center gap-3">
                <FiPhone className="text-indigo-400 w-5 h-5 flex-shrink-0" />
                <p className="text-gray-400">+234 914 028 709</p>
              </div>
              <div className="flex items-center gap-3">
                <FiEmail className="text-indigo-400 w-5 h-5 flex-shrink-0" />
                <p className="text-gray-400">bellomuhyideen0001@gmail.com</p>
              </div>
            </div>
          </motion.div>

          {/* Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-5"
          >
            <h4 className="text-white text-lg font-semibold relative inline-block pb-2 after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-gradient-to-r after:from-indigo-500 after:to-purple-500">
              Legal
            </h4>
            {['Privacy Policy', 'Terms of Use', 'Cookie Policy', 'Safety Guidelines', 'Community Standards'].map((link) => (
              <motion.a
                key={link}
                href="#"
                whileHover={{ x: 5 }}
                className="block text-gray-400 hover:text-white transition-colors"
              >
                {link}
              </motion.a>
            ))}
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-5"
          >
            <h4 className="text-white text-lg font-semibold relative inline-block pb-2 after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-gradient-to-r after:from-indigo-500 after:to-purple-500">
              Campus Updates
            </h4>
            <p className="text-gray-400">
              Subscribe to get exclusive campus deals and safety tips
            </p>
            <form className="space-y-3">
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-xl font-medium flex items-center justify-center gap-2 hover:from-indigo-700 hover:to-purple-700 transition-all"
              >
                Subscribe Now
                <FiArrowRight className="w-4 h-4" />
              </motion.button>
            </form>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 py-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <div className="flex items-center gap-1 text-gray-500">
              <span>Made with</span>
              <FiHeart className="text-red-500 mx-1" />
              <span>for OAU Students</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="hover:text-white transition-colors cursor-pointer">Help Center</span>
              <span className="hover:text-white transition-colors cursor-pointer">Campus Safety</span>
              <span className="hover:text-white transition-colors cursor-pointer">Report Issue</span>
            </div>
            <div className="text-gray-500">
              © {new Date().getFullYear()} CampusCrave. All rights reserved.
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;