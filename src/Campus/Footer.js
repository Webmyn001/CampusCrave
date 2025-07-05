import { motion } from 'framer-motion';
import { FiFacebook, FiTwitter, FiInstagram, FiMail, 
  FiMapPin, FiPhone, FiHeart } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300 pt-12 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10"
        >
          {/* Brand Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 w-9 h-9 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">C</span>
              </div>
              <h3 className="text-white text-xl font-bold">CampusCrave</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Secure campus marketplace for OAU students
            </p>
            <div className="flex space-x-3 mt-2">
              {[FiFacebook, FiTwitter, FiInstagram].map((Icon, idx) => (
                <motion.a
                  key={idx}
                  href="#"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full bg-gray-800 hover:bg-gradient-to-r from-indigo-600 to-purple-600 transition-all"
                >
                  <Icon className="w-4 h-4 text-white" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Essential Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="text-white text-lg font-semibold pb-2 border-b border-gray-700">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { text: 'About', to: '/about' },
                { text: 'Contact', to: '/contact' },
                { text: 'Legal', to: '/legal' },
                { text: 'Safety', to: '/safety' },
                { text: 'FAQ', to: '/faq' },
                { text: 'Report', to: '/report' }
              ].map((link) => (
                <motion.a
                  key={link.text}
                  href={link.to}
                  whileHover={{ x: 3 }}
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  {link.text}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-white text-lg font-semibold pb-2 border-b border-gray-700">
              Contact
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <FiMapPin className="text-indigo-400 w-4 h-4 mt-0.5 flex-shrink-0" />
                <p className="text-gray-400 text-sm">Block 2, Room 308, Fajuyi Hall, OAU</p>
              </div>
              <div className="flex items-center gap-2">
                <FiPhone className="text-indigo-400 w-4 h-4 flex-shrink-0" />
                <p className="text-gray-400 text-sm">+234 9164 028 709</p>
              </div>
              <div className="flex items-center gap-2">
                <FiMail className="text-indigo-400 w-4 h-4 flex-shrink-0" />
                <p className="text-gray-400 text-sm">bellomuhyideen0001@gmail.com</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 pt-6 text-center"
        >
          <div className="flex flex-col items-center gap-2 text-sm">
            <div className="flex items-center text-gray-500">
              <span>Made with</span>
              <FiHeart className="text-red-500 mx-1" />
              <span>for OAU</span>
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