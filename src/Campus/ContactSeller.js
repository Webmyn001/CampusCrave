import { useEffect, useState } from "react";
import {
  FiArrowLeft,
  FiMail,
  FiPhone,
  FiUser,
  FiAlertCircle,
  FiMessageSquare,
  FiPackage,
  FiMapPin,
  FiInfo,
  FiCheckCircle,
  FiStar,
  FiShield,
  FiClock
} from "react-icons/fi";
import { FaNairaSign } from "react-icons/fa6";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const ContactSeller = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const [service, setService] = useState(location.state?.service || null);
  const [loading, setLoading] = useState(!service);
  const [error, setError] = useState(null);
  const [hoveredField, setHoveredField] = useState(null);

  // Helper function for truncation
  const truncateText = (text, maxLength = 25) => {
    if (!text || text === 'N/A') return 'N/A';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Fetch service if not passed via location.state
  useEffect(() => {
    const fetchService = async () => {
      if (!service && id) {
        try {
          setLoading(true);
          const res = await axios.get(
            `https://campus-plum.vercel.app/api/vip-listings/${id}`
          );
          console.log(service)
          setService(res.data);
        } catch (err) {
          console.error(err);
          setError("Failed to load service details.");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchService();
  }, [id, service]);

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-700 font-medium">Loading seller details...</p>
        </div>
      </div>
    );
    
  if (error)
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-lg p-8 max-w-md mx-4">
          <FiAlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-red-500 text-lg font-semibold">{error}</p>
          <button 
            onClick={() => navigate(-1)}
            className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
    
  if (!service)
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <p className="text-center text-gray-700 text-lg bg-white rounded-2xl shadow-lg p-8">Service not found.</p>
      </div>
    );

  // Safe values
  const phone = service?.sellerInfo?.phone || "";
  const cleanPhone = phone ? phone.replace(/[^0-9]/g, "") : "";
  const email = service?.sellerInfo?.email || "N/A";
  
  // Check if user is verified (you'll need to adjust this based on your actual data structure)
  const isVerified = service?.sellerInfo?.verified || service?.verified || false;

  // Avatar initials fallback
  const initials =
    service?.sellerInfo?.name
      ?.split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase() || "NA";

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 120 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header with Back Button */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group mb-6"
          >
            <div className="p-2 bg-white rounded-xl shadow-sm group-hover:shadow-md transition-shadow">
              <FiArrowLeft className="w-5 h-5" />
            </div>
            <span className="font-medium">Back to Listing</span>
          </button>

          <div className="text-center mb-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Contact Seller
            </h1>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              Get in touch with the seller to discuss this item. All contact information is verified for your safety.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Seller Profile */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 xl:col-span-2"
          >
            {/* Profile Header */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center text-center mb-8 relative"
            >
              <div className="relative mb-6">
                {service?.profilePhoto?.url ? (
                  <div className="relative">
                    <img
                      src={service.profilePhoto.url}
                      alt={service?.sellerInfo?.name || "Seller"}
                      className="w-32 h-32 rounded-full object-cover ring-4 ring-white shadow-2xl"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/150?text=Avatar";
                      }}
                    />
                    {isVerified && (
                      <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-2 rounded-full shadow-lg border-2 border-white">
                        <FiCheckCircle className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="relative">
                    <div className="w-32 h-32 flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-3xl font-bold ring-4 ring-white shadow-2xl">
                      {initials}
                    </div>
                    {isVerified && (
                      <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-2 rounded-full shadow-lg border-2 border-white">
                        <FiCheckCircle className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-3">
                  <h2 className="text-3xl font-bold text-gray-900">
                    {service?.sellerInfo?.name || "Unknown Seller"}
                  </h2>
                  {isVerified && (
                    <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      <FiCheckCircle className="w-4 h-4" />
                      Verified
                    </span>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              variants={containerVariants}
              className="space-y-6 mb-8"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200 flex items-center gap-2">
                <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                  <FiUser className="w-5 h-5" />
                </div>
                Contact Information
              </h3>

              {/* WhatsApp */}
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-4 sm:gap-5 p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="p-4 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl shadow-lg group-hover:scale-110 transition-transform flex-shrink-0">
                  <FiMessageSquare className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-500 mb-1">WhatsApp</p>
                  {cleanPhone ? (
                    <div className="relative">
                      <a
                        href={`https://wa.me/${cleanPhone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-sm sm:text-lg font-semibold text-gray-900 hover:text-green-600 transition-colors flex items-center gap-2 ${
                          service?.sellerInfo?.phone && service.sellerInfo.phone.length > 20 ? 'truncate' : ''
                        }`}
                        onMouseEnter={() => setHoveredField('whatsapp')}
                        onMouseLeave={() => setHoveredField(null)}
                      >
                        {truncateText(service?.sellerInfo?.phone, 20)}
                        <span className="text-[10px] sm:text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full flex-shrink-0">Recommended</span>
                      </a>
                      {hoveredField === 'whatsapp' && service?.sellerInfo?.phone && service.sellerInfo.phone.length > 20 && (
                        <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-10 whitespace-nowrap">
                          {service.sellerInfo.phone}
                          <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <span className="text-gray-500">N/A</span>
                  )}
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-4 sm:gap-5 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl shadow-lg group-hover:scale-110 transition-transform flex-shrink-0">
                  <FiPhone className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-500 mb-1">Primary Phone</p>
                  {phone ? (
                    <div className="relative">
                      <a
                        href={`tel:${phone}`}
                        className={`text-sm sm:text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors ${
                          phone.length > 20 ? 'truncate' : ''
                        }`}
                        onMouseEnter={() => setHoveredField('phone')}
                        onMouseLeave={() => setHoveredField(null)}
                      >
                        {truncateText(phone, 20)}
                      </a>
                      {hoveredField === 'phone' && phone && phone.length > 20 && (
                        <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-10 whitespace-nowrap">
                          {phone}
                          <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <span className="text-gray-500">N/A</span>
                  )}
                </div>
              </motion.div>

              {/* Email */}
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-4 sm:gap-5 p-5 bg-gradient-to-r from-purple-50 to-violet-50 rounded-2xl border border-purple-100 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl shadow-lg group-hover:scale-110 transition-transform flex-shrink-0">
                  <FiMail className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-500 mb-1">Email Address</p>
                  {email !== "N/A" ? (
                    <div className="relative">
                      <a
                        href={`mailto:${email}`}
                        className={`text-sm sm:text-lg font-semibold text-gray-900 hover:text-purple-600 transition-colors ${
                          email.length > 25 ? 'truncate' : ''
                        }`}
                        onMouseEnter={() => setHoveredField('email')}
                        onMouseLeave={() => setHoveredField(null)}
                      >
                        {truncateText(email, 25)}
                      </a>
                      {hoveredField === 'email' && email && email.length > 25 && (
                        <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-10 whitespace-nowrap">
                          {email}
                          <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <span className="text-gray-500">N/A</span>
                  )}
                </div>
              </motion.div>

              {/* Hostel Address */}
              {service?.sellerInfo?.hostel && (
                <motion.div
                  variants={itemVariants}
                  className="flex items-center gap-4 sm:gap-5 p-5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-100 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
                >
                  <div className="p-4 bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-2xl shadow-lg group-hover:scale-110 transition-transform flex-shrink-0">
                    <FiMapPin className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-500 mb-1">Hostel Address</p>
                    <div className="relative">
                      <p
                        className={`text-sm sm:text-lg font-semibold text-gray-900 ${
                          service.sellerInfo.hostel.length > 25 ? 'truncate' : ''
                        }`}
                        onMouseEnter={() => setHoveredField('hostel')}
                        onMouseLeave={() => setHoveredField(null)}
                      >
                        {truncateText(service.sellerInfo.hostel, 25)}
                      </p>
                      {hoveredField === 'hostel' && service.sellerInfo.hostel && service.sellerInfo.hostel.length > 25 && (
                        <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-10 max-w-xs break-words whitespace-normal">
                          {service.sellerInfo.hostel}
                          <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>

          {/* Right Column - Service Details & Safety Tips */}
          <div className="space-y-6">
            {/* Conditional Service/Goods Details Card */}
            {service?.businessName ? (
              // Service Details Card
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-100"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-5 pb-3 border-b border-gray-200 flex items-center gap-2">
                  <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                    <FiPackage className="w-5 h-5" />
                  </div>
                  Service Details
                </h3>

                <div className="space-y-5">
                  {/* Business Name */}
                  <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                    <FiUser className="text-green-600 mt-1 w-6 h-6 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-500">Business Name</p>
                      <div className="relative">
                        <p
                          className={`font-bold text-gray-900 text-[14px] sm:text-[15px] ${
                            service.businessName.length > 25 ? 'truncate' : ''
                          }`}
                          onMouseEnter={() => setHoveredField('businessName')}
                          onMouseLeave={() => setHoveredField(null)}
                        >
                          {truncateText(service.businessName, 25)}
                        </p>
                        {hoveredField === 'businessName' && service.businessName && service.businessName.length > 25 && (
                          <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-10 whitespace-nowrap">
                            {service.businessName}
                            <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Business Email */}
                  <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                    <FiMail className="text-green-600 mt-1 w-6 h-6 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-500">Business Email</p>
                      <div className="relative">
                        <p
                          className={`font-bold text-gray-900 text-[14px] sm:text-[15px] ${
                            service.businessEmail && service.businessEmail.length > 25 ? 'truncate' : ''
                          }`}
                          onMouseEnter={() => setHoveredField('businessEmail')}
                          onMouseLeave={() => setHoveredField(null)}
                        >
                          {truncateText(service.businessEmail, 25)}
                        </p>
                        {hoveredField === 'businessEmail' && service.businessEmail && service.businessEmail.length > 25 && (
                          <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-10 whitespace-nowrap">
                            {service.businessEmail}
                            <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Business Address */}
                  <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                    <FiMapPin className="text-green-600 mt-1 w-6 h-6 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-500">Business Address</p>
                      <div className="relative">
                        <p
                          className={`font-bold text-gray-900 text-[14px] sm:text-[15px] ${
                            service.address && service.address.length > 25 ? 'truncate' : ''
                          }`}
                          onMouseEnter={() => setHoveredField('businessAddress')}
                          onMouseLeave={() => setHoveredField(null)}
                        >
                          {truncateText(service.address, 25)}
                        </p>
                        {hoveredField === 'businessAddress' && service.address && service.address.length > 25 && (
                          <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-10 max-w-xs break-words whitespace-normal">
                            {service.address}
                            <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                    <FiClock className="text-green-600 mt-1 w-6 h-6 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-500">Working Hours</p>
                      <div className="relative">
                        <p
                          className={`font-bold text-gray-900 text-[14px] sm:text-[15px] ${
                            service.workingHours && service.workingHours.length > 25 ? 'truncate' : ''
                          }`}
                          onMouseEnter={() => setHoveredField('workingHours')}
                          onMouseLeave={() => setHoveredField(null)}
                        >
                          {truncateText(service.workingHours, 25)}
                        </p>
                        {hoveredField === 'workingHours' && service.workingHours && service.workingHours.length > 25 && (
                          <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-10 whitespace-nowrap">
                            {service.workingHours}
                            <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              // Goods Details Card
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-100"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-5 pb-3 border-b border-gray-200 flex items-center gap-2">
                  <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                    <FiPackage className="w-5 h-5" />
                  </div>
                  Goods Details
                </h3>

                <div className="space-y-5">
                  {/* Item Title */}
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <FiPackage className="text-indigo-600 mt-1 w-6 h-6 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-500">Item</p>
                      <div className="relative">
                        <p
                          className={`font-bold text-gray-900 text-lg ${
                            service?.title && service.title.length > 25 ? 'truncate' : ''
                          }`}
                          onMouseEnter={() => setHoveredField('itemTitle')}
                          onMouseLeave={() => setHoveredField(null)}
                        >
                          {truncateText(service?.title, 25)}
                        </p>
                        {hoveredField === 'itemTitle' && service?.title && service.title.length > 25 && (
                          <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-10 whitespace-nowrap">
                            {service.title}
                            <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <FaNairaSign className="text-green-600 mt-1 w-6 h-6 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Price</p>
                      <p className="font-bold text-gray-900 text-lg">
                        #{service?.price ? Number(service.price).toLocaleString() : ""}
                      </p>
                    </div>
                  </div>

                  {/* Condition */}
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <FiInfo className="text-blue-600 mt-1 w-6 h-6 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-500">Condition</p>
                      <div className="relative">
                        <p
                          className={`font-bold text-gray-900 text-lg ${
                            service?.condition && service.condition.length > 25 ? 'truncate' : ''
                          }`}
                          onMouseEnter={() => setHoveredField('condition')}
                          onMouseLeave={() => setHoveredField(null)}
                        >
                          {truncateText(service?.condition, 25)}
                        </p>
                        {hoveredField === 'condition' && service?.condition && service.condition.length > 25 && (
                          <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-10 whitespace-nowrap">
                            {service.condition}
                            <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Contact Method */}
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <FiMapPin className="text-red-500 mt-1 w-6 h-6 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-500">Preferred Contact Method</p>
                      <div className="relative">
                        <p
                          className={`font-bold text-gray-900 text-lg ${
                            service?.contactMethod && service.contactMethod.length > 25 ? 'truncate' : ''
                          }`}
                          onMouseEnter={() => setHoveredField('contactMethod')}
                          onMouseLeave={() => setHoveredField(null)}
                        >
                          {truncateText(service?.contactMethod, 25)}
                        </p>
                        {hoveredField === 'contactMethod' && service?.contactMethod && service.contactMethod.length > 25 && (
                          <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-10 whitespace-nowrap">
                            {service.contactMethod}
                            <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Safety Tips */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="bg-amber-100 p-3 rounded-2xl mt-1">
                  <FiShield className="text-amber-600 w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-3">
                    Safety Tips
                  </h3>
                  <ul className="text-gray-700 space-y-2.5">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Always meet in public campus locations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Never send payments in advance without verification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Check item condition before purchasing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Report suspicious activity to Campus Security</span>
                    </li>
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
          className="grid grid-cols-1 sm:grid-cols-2 mt-10 gap-5 max-w-2xl mx-auto"
        >
          {cleanPhone && (
            <a
              href={`https://wa.me/${cleanPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-5 px-8 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <FiMessageSquare className="w-6 h-6" />
              WhatsApp Seller
            </a>
          )}
          {phone && (
            <a
              href={`tel:${phone}`}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-5 px-8 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <FiPhone className="w-6 h-6" />
              Call Seller
            </a>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ContactSeller;