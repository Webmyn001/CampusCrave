import { FiArrowLeft, FiMail, FiPhone, FiUser, FiStar, FiAlertCircle, FiCheckCircle, FiMessageSquare } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const ContactSeller = () => {
  const [seller] = useState({
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+234 812 345 6789",
    emergencyContact: "+234 809 876 5432",
    profilePic: "",
    status: "online",
    whatsapp:"+2348123456789",
    rating: 4.9,
    itemsSold: 42,
    memberSince: 2022
  });

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <Link to="/" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium">
            <FiArrowLeft className="w-5 h-5" />
            Back to listing
          </Link>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100"
        >
          {/* Profile Header */}
          <motion.div variants={itemVariants} className="flex flex-col items-center mb-8">
            <div className="relative mb-4">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mb-4 ring-4 ring-white shadow-lg flex items-center justify-center">
                <FiUser className="text-indigo-600 w-10 h-10" />
              </div>
              <div className="absolute bottom-2 right-0">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  seller.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                }`}>
                  <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <FiCheckCircle className="text-white w-4 h-4 relative" />
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-1">{seller.name}</h2>
            <div className="flex items-center gap-2 text-amber-500">
              <FiStar className="w-5 h-5" />
              <span className="font-medium">{seller.rating} ({seller.itemsSold} sales)</span>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={containerVariants} className="space-y-6 mb-8">
            {/* WhatsApp */}
            <motion.div variants={itemVariants} className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
              <div className="p-3 bg-green-600 text-white rounded-xl">
                <FiMessageSquare className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">WhatsApp</p>
                <a 
                  href={`https://wa.me/${seller.whatsapp.replace(/[^0-9]/g, '')}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-lg font-medium text-gray-900"
                >
                  {seller.whatsapp}
                </a>
              </div>
            </motion.div>

            {/* Phone */}
            <motion.div variants={itemVariants} className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <div className="p-3 bg-blue-600 text-white rounded-xl">
                <FiPhone className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Primary Phone</p>
                <a href={`tel:${seller.phone}`} className="text-lg font-medium text-gray-900">
                  {seller.phone}
                </a>
              </div>
            </motion.div>

            {/* Email */}
            <motion.div variants={itemVariants} className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl border border-purple-100">
              <div className="p-3 bg-purple-600 text-white rounded-xl">
                <FiMail className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Email Address</p>
                <a href={`mailto:${seller.email}`} className="text-lg font-medium text-gray-900">
                  {seller.email}
                </a>
              </div>
            </motion.div>

            {/* Emergency Contact */}
            <motion.div variants={itemVariants} className="flex items-center gap-4 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-100">
              <div className="p-3 bg-red-600 text-white rounded-xl">
                <FiAlertCircle className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Emergency Contact</p>
                <a href={`tel:${seller.emergencyContact}`} className="text-lg font-medium text-gray-900">
                  {seller.emergencyContact}
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Safety Tips */}
          <motion.div 
            variants={itemVariants}
            className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5 mb-8"
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
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 mt-3 gap-4"
        >
          <a
            href={`https://wa.me/${seller.whatsapp.replace(/[^0-9]/g, '')}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white  py-4 px-8 rounded-2xl font-semibold flex items-center justify-center gap-3 transition-colors shadow-lg"
          >
            <FiMessageSquare className="w-6 h-6" />
            WhatsApp Seller
          </a>
          <a
            href={`tel:${seller.phone}`}
            className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-2xl font-semibold flex items-center justify-center gap-3 transition-colors shadow-lg"
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