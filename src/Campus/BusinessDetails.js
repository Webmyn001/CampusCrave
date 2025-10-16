import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiMail, FiUser, FiCalendar, FiMapPin, FiClock, FiPhone, FiCheckCircle, FiStar } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const BusinessDetails = () => {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const [day, month, year] = dateStr.split(' ')[0].split('/');
    const date = new Date(`${year}-${month}-${day}`);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const response = await axios.get(`https://campus-plum.vercel.app/api/vip-listings/${id}`);
        setBusiness(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to load business details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBusiness();
  }, [id]);

  if (loading) return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center"
    >
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-4"
        ></motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-700 text-lg font-medium"
        >
          Loading business details...
        </motion.p>
      </div>
    </motion.div>
  );
  
  if (error) return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20"
      >
        <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <FiStar className="w-8 h-8 text-red-600" />
        </div>
        <p className="text-red-500 text-xl font-semibold">{error}</p>
        <Link to="/" className="inline-block mt-4 bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105">
          Back to Home
        </Link>
      </motion.div>
    </motion.div>
  );
  
  if (!business) return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20"
      >
        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <FiUser className="w-8 h-8 text-gray-600" />
        </div>
        <p className="text-gray-700 text-xl font-semibold">Business not found</p>
        <Link to="/" className="inline-block mt-4 bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105">
          Browse Other Businesses
        </Link>
      </motion.div>
    </motion.div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-4 sm:py-8"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        
        {/* Business Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-white/20"
        >
          {/* Main Header Image */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                src={business.images?.[activeImage]?.url || 'https://picsum.photos/1200/600?commerce'}
                alt={business.businessName}
                className="w-full h-54 sm:h-64 md:h-80 lg:h-96 xl:h-[500px] object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://picsum.photos/1200/600?commerce'; }}
              />
            </AnimatePresence>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col justify-end p-4 sm:p-6 md:p-10">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2"
                  >
                    <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold drop-shadow-2xl break-words">
                      {business.businessName}
                    </h1>
                    {business.sellerInfo?.isUserVerified && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.7, type: "spring" }}
                        className="flex items-center gap-1 bg-green-500/20 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full border border-green-400/30 w-fit"
                      >
                        <FiCheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                        <span className="text-green-300 text-xs sm:text-sm font-medium">Verified</span>
                      </motion.div>
                    )}
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-white/90 text-xs sm:text-sm md:text-base drop-shadow"
                  >
                    <span className="flex items-center gap-1 bg-white/10 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full w-fit">
                      <FiCalendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      Since: {formatDate(business.sellerInfo?.formattedMemberSince)}
                    </span>
                    
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          {business.images && business.images.length > 1 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="py-6 sm:py-8 md:py-12 px-4 sm:px-6 md:px-12 border-b border-gray-100"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-2">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Gallery
                </h2>
                <span className="text-gray-500 text-sm sm:text-lg font-medium">
                  {business.images.length} photos
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                {business.images.map((img, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative group cursor-pointer rounded-xl sm:rounded-2xl overflow-hidden ${
                      index === activeImage ? 'ring-2 sm:ring-4 ring-indigo-500 ring-opacity-50' : ''
                    }`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img
                      src={img.url || 'https://picsum.photos/300/200'}
                      alt={`Business ${index + 1}`}
                      className="w-full h-24 sm:h-32 md:h-40 object-cover transition-all duration-300"
                      onError={(e) => { e.target.onerror = null; e.target.src = 'https://picsum.photos/300/200'; }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Business Info */}
          <div className="p-4 sm:p-6 md:p-12 space-y-8 sm:space-y-12">
            {/* About Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-4 sm:space-y-6"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                About the Business
              </h2>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed bg-gray-50/50 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl md:rounded-3xl border border-gray-100 text-justify">
                {business.fullDescription || 'No description available.'}
              </p>
            </motion.div>

            {/* Details Section - Stacked on mobile, grid on larger screens */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4 md:gap-6"
            >
              {/* Email */}
              <motion.div 
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl sm:rounded-2xl p-4 shadow-lg border border-indigo-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 sm:p-3 bg-indigo-100 rounded-lg sm:rounded-xl flex-shrink-0">
                    <FiMail className="text-indigo-600 w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-600 text-sm font-semibold mb-1">Email</p>
                    <p className="text-gray-800 font-bold text-sm sm:text-base break-all">
                      {business.businessEmail || 'N/A'}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Contact Method */}
              <motion.div 
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl sm:rounded-2xl p-4 shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 sm:p-3 bg-green-100 rounded-lg sm:rounded-xl flex-shrink-0">
                    <FiPhone className="text-green-600 w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-600 text-sm font-semibold mb-1">Contact Method</p>
                    <p className="text-gray-800 font-bold text-sm sm:text-base break-words">
                      {business.contactMethod || 'N/A'}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Working Hours */}
              <motion.div 
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl sm:rounded-2xl p-4 shadow-lg border border-amber-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 sm:p-3 bg-amber-100 rounded-lg sm:rounded-xl flex-shrink-0">
                    <FiClock className="text-amber-600 w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-600 text-sm font-semibold mb-1">Working Hours</p>
                    <p className="text-gray-800 font-bold text-sm sm:text-base break-words">
                      {business.workingHours || 'N/A'}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Business Address */}
              <motion.div 
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl sm:rounded-2xl p-4 shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 sm:p-3 bg-purple-100 rounded-lg sm:rounded-xl flex-shrink-0">
                    <FiMapPin className="text-purple-600 w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-600 text-sm font-semibold mb-1">Business Address</p>
                    <p className="text-gray-800 font-bold text-sm sm:text-base break-words">
                      {business.address || 'N/A'}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Business Owner */}
              <motion.div 
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl sm:rounded-2xl p-4 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 sm:p-3 bg-blue-100 rounded-lg sm:rounded-xl flex-shrink-0">
                    <FiUser className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-600 text-sm font-semibold mb-1">Business Owner</p>
                    <div className="flex items-center gap-2">
                      <p className="text-gray-800 font-bold text-sm sm:text-base break-words">
                        {business.sellerInfo?.name || 'N/A'}
                      </p>
                      {business.sellerInfo?.isUserVerified && (
                        <FiCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Additional Info Card */}
              <motion.div 
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl sm:rounded-2xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 sm:p-3 bg-gray-100 rounded-lg sm:rounded-xl flex-shrink-0">
                    <FiStar className="text-gray-600 w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-600 text-sm font-semibold mb-1">Business Status</p>
                    <p className="text-gray-800 font-bold text-sm sm:text-base">Active & Operating</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Buttons */}
            {business.id && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-4 pt-6 sm:pt-8 border-t border-gray-100"
              >
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex-1">
                  <Link
                    to="/contactseller"
                    state={{ service: business }}
                    className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl w-full text-center"
                  >
                    <FiMail className="w-5 h-5 sm:w-6 sm:h-6" />
                    Contact Business Owner
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Trust Badges Section - Only show if verified */}
        {business.sellerInfo?.isVerified && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 sm:mt-12 bg-gradient-to-br from-white to-gray-50 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 border border-white/20"
          >
            <div className="text-center max-w-2xl mx-auto">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
                className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6"
              >
                <FiCheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
              </motion.div>
              
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
                Verified Business
              </h3>
              
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
                This business has been thoroughly verified and authenticated by our team. 
                You can trust that you're dealing with a legitimate and reliable service provider.
              </p>

              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl border border-green-200"
              >
                <FiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-semibold text-sm sm:text-base">Trusted & Verified Partner</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default BusinessDetails;