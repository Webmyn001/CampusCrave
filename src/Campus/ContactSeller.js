import { FiArrowLeft, FiMail, FiPhone, FiUser, FiAlertCircle,  FiMessageSquare,  FiPackage, FiMapPin, FiInfo } from 'react-icons/fi';
import { FaNairaSign } from "react-icons/fa6"
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const ContactSeller = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const service = location.state?.service;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 120 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header with back button */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-6 flex items-center"
        >
          
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Seller Profile */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 lg:col-span-2"
          >
            {/* Profile Header */}
            <motion.div variants={itemVariants} className="flex flex-col items-center mb-8">
              <div className="relative mb-4">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mb-4 ring-4 ring-white shadow-lg flex items-center justify-center">
                  <FiUser className="text-indigo-600 w-10 h-10" />
                </div>
                <div className="absolute bottom-2 right-0">
                  
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-1">{service.sellerInfo.name}</h2>
            </motion.div>

            {/* Contact Information */}
            <motion.div variants={containerVariants} className="space-y-4 mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Contact Information</h3>
              
              {/* WhatsApp */}
              <motion.div variants={itemVariants} className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 hover:shadow-md transition-shadow">
                <div className="p-3 bg-green-600 text-white rounded-xl">
                  <FiMessageSquare className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">WhatsApp</p>
                  <a 
                    href={`https://wa.me/${service.sellerInfo.phone.replace(/[^0-9]/g, '')}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[14px] font-medium text-gray-900 hover:text-green-600 transition-colors"
                  >
                    {service.sellerInfo.phone}
                  </a>
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div variants={itemVariants} className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 hover:shadow-md transition-shadow">
                <div className="p-3 bg-blue-600 text-white rounded-xl">
                  <FiPhone className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Primary Phone</p>
                  <a href={`tel:${service.sellerInfo.phone}`} className="text-[14px] font-medium text-gray-900 hover:text-blue-600 transition-colors">
                    {service.sellerInfo.phone}
                  </a>
                </div>
              </motion.div>

              {/* Email */}
              <motion.div variants={itemVariants} className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl border border-purple-100 hover:shadow-md transition-shadow">
                <div className="p-3 bg-purple-600 text-white rounded-xl">
                  <FiMail className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Email Address</p>
                  <a href={`mailto:${service.sellerInfo.email}`} className="text-[14px] font-medium text-gray-900 hover:text-purple-600 transition-colors break-all">
                    {service.sellerInfo.email}
                  </a>
                </div>
              </motion.div>

              {/* Emergency Contact */}
              <motion.div variants={itemVariants} className="flex items-center gap-4 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-100 hover:shadow-md transition-shadow">
                <div className="p-3 bg-red-600 text-white rounded-xl">
                  <FiAlertCircle className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Emergency Contact</p>
                  <a href={`tel:${service.sellerInfo.emergencyContact}`} className="text-[14px] font-medium text-gray-900 hover:text-red-600 transition-colors">
                    {service.sellerInfo.emergencyContact}
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column - Service Details & Safety Tips */}
          <div className="space-y-6">
            {/* Service Details Card */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2 flex items-center">
                <FiPackage className="mr-2 text-indigo-600" />
                Service Details
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <FiPackage className="text-indigo-500 mr-3 w-5 h-5" />
                  <div>
                    <p className="text-sm text-gray-500">Item</p>
                    <p className="font-medium text-gray-900">{service.title}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <FaNairaSign className="text-green-500 mr-3 w-5 h-5" />
                  <div>
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="font-medium text-gray-900">#{service.price}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <FiInfo className="text-blue-500 mr-3 w-5 h-5" />
                  <div>
                    <p className="text-sm text-gray-500">Condition</p>
                    <p className="font-medium text-gray-900">{service.condition}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <FiMapPin className="text-red-500 mr-3 w-5 h-5" />
                  <div>
                    <p className="text-sm text-gray-500">Preferred Meetup</p>
                    <p className="font-medium text-gray-900">{service.contactMethod}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Safety Tips */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5"
            >
              <div className="flex items-start gap-3">
                <div className="bg-amber-100 p-2 rounded-full mt-1">
                  <FiAlertCircle className="text-amber-600 w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Safety Tips</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Always meet in public campus locations</li>
                    <li>• Never send payments in advance without verification</li>
                    <li>• Check item condition before purchasing</li>
                    <li>• Report suspicious activity to Campus Security</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 mt-8 gap-4"
        >
          <a
            href={`https://wa.me/${service.sellerInfo.phone.replace(/[^0-9]/g, '')}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white py-4 px-8 rounded-2xl font-semibold flex items-center justify-center gap-3 transition-colors shadow-lg hover:shadow-xl"
          >
            <FiMessageSquare className="w-6 h-6" />
            WhatsApp Seller
          </a>
          <a
            href={`tel:${service.sellerInfo.phone}`}
            className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-2xl font-semibold flex items-center justify-center gap-3 transition-colors shadow-lg hover:shadow-xl"
          >
            <FiPhone className="w-6 h-6" />
            Call Seller
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactSeller;