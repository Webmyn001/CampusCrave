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
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent break-words">
              Contact Seller
            </h1>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto text-sm sm:text-base break-words">
              Get in touch with the seller to discuss this item. All contact information is verified for your safety.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
          {/* Left Column - Seller Profile */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 border border-gray-100 xl:col-span-2"
          >
            {/* Profile Header */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center text-center mb-8 relative"
            >
              <div className="relative mb-6">
                {service?.sellerInfo?.profilePhoto?.url ? (
                  <div className="relative">
                    <img
                      src={service.sellerInfo?.profilePhoto.url}
                      alt={service?.sellerInfo?.title || "Seller"}
                      className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover ring-4 ring-white shadow-2xl"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/150?text=Avatar";
                      }}
                    />
                    {service.sellerInfo?.isVerified && (
                      <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-1.5 sm:p-2 rounded-full shadow-lg border-2 border-white">
                        <FiCheckCircle className="w-4 h-4 sm:w-6 sm:h-6" />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="relative">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-2xl sm:text-3xl font-bold ring-4 ring-white shadow-2xl">
                      {initials}
                    </div>
                    {service.sellerInfo?.isVerified && (
                      <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-1.5 sm:p-2 rounded-full shadow-lg border-2 border-white">
                        <FiCheckCircle className="w-4 h-4 sm:w-6 sm:h-6" />
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 break-words text-center">
                    {service?.sellerInfo?.name || "Unknown Seller"}
                  </h2>
                  {isVerified && (
                    <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                      <FiCheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                      Verified
                    </span>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              variants={containerVariants}
              className="space-y-4 sm:space-y-6 mb-8"
            >
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 pb-2 sm:pb-3 border-b border-gray-200 flex items-center gap-2">
                <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                  <FiUser className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                Contact Information
              </h3>

              {/* WhatsApp */}
              <motion.div
                variants={itemVariants}
                className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl sm:rounded-2xl border border-green-100 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="p-3 sm:p-4 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl sm:rounded-2xl shadow-lg group-hover:scale-110 transition-transform flex-shrink-0">
                  <FiMessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-500 mb-1">WhatsApp</p>
                  {cleanPhone ? (
                    <div>
                      <a
                        href={`https://wa.me/${cleanPhone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm sm:text-base font-semibold text-gray-900 hover:text-green-600 transition-colors flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 break-all"
                      >
                        {service?.sellerInfo?.phone}
                        <span className="text-[10px] sm:text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full w-fit">Recommended</span>
                      </a>
                    </div>
                  ) : (
                    <span className="text-gray-500">N/A</span>
                  )}
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div
                variants={itemVariants}
                className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl border border-blue-100 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="p-3 sm:p-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl sm:rounded-2xl shadow-lg group-hover:scale-110 transition-transform flex-shrink-0">
                  <FiPhone className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-500 mb-1">Primary Phone</p>
                  {phone ? (
                    <a
                      href={`tel:${phone}`}
                      className="text-sm sm:text-base font-semibold text-gray-900 hover:text-blue-600 transition-colors break-all"
                    >
                      {phone}
                    </a>
                  ) : (
                    <span className="text-gray-500">N/A</span>
                  )}
                </div>
              </motion.div>

              {/* Hostel Address */}
              {service?.sellerInfo?.hostel && (
                <motion.div
                  variants={itemVariants}
                  className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl sm:rounded-2xl border border-amber-100 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="p-3 sm:p-4 bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-xl sm:rounded-2xl shadow-lg group-hover:scale-110 transition-transform flex-shrink-0">
                    <FiMapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-500 mb-1">Hostel Address</p>
                    <p className="text-sm sm:text-base font-semibold text-gray-900 break-words">
                      {service.sellerInfo.hostel}
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>

          {/* Right Column - Service Details & Safety Tips */}
          <div className="space-y-4 sm:space-y-6">
            {/* Conditional Service/Goods Details Card */}
            {service?.businessName ? (
              // Service Details Card
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 border border-gray-100"
              >
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-5 pb-2 sm:pb-3 border-b border-gray-200 flex items-center gap-2">
                  <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                    <FiPackage className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  Service Details
                </h3>

                <div className="space-y-4 sm:space-y-5">
                  {/* Business Name */}
                  <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                    <FiUser className="text-green-600 mt-1 w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-gray-500">Business Name</p>
                      <p className="font-bold text-gray-900 text-sm sm:text-base break-words">
                        {service.businessName}
                      </p>
                    </div>
                  </div>

                  {/* Business Email */}
                  <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                    <FiMail className="text-green-600 mt-1 w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-gray-500">Business Email</p>
                      <p className="font-bold text-gray-900 text-sm sm:text-base break-all">
                        {service.businessEmail || "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Business Address */}
                  <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                    <FiMapPin className="text-green-600 mt-1 w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-gray-500">Business Address</p>
                      <p className="font-bold text-gray-900 text-sm sm:text-base break-words">
                        {service.address || "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                    <FiClock className="text-green-600 mt-1 w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-gray-500">Working Hours</p>
                      <p className="font-bold text-gray-900 text-sm sm:text-base break-words">
                        {service.workingHours || "N/A"}
                      </p>
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
                className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 border border-gray-100"
              >
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-5 pb-2 sm:pb-3 border-b border-gray-200 flex items-center gap-2">
                  <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                    <FiPackage className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  Goods Details
                </h3>

                <div className="space-y-4 sm:space-y-5">
                  {/* Item Title */}
                  <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <FiPackage className="text-indigo-600 mt-1 w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-gray-500">Item</p>
                      <p className="font-bold text-gray-900 text-base sm:text-lg break-words">
                        {service?.title || "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <FaNairaSign className="text-green-600 mt-1 w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-gray-500">Price</p>
                      <p className="font-bold text-gray-900 text-base sm:text-lg">
                        #{service?.price ? Number(service.price).toLocaleString() : "0"}
                      </p>
                    </div>
                  </div>

                  {/* Condition */}
                  <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <FiInfo className="text-blue-600 mt-1 w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-gray-500">Condition</p>
                      <p className="font-bold text-gray-900 text-base sm:text-lg break-words">
                        {service?.condition || "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Contact Method */}
                  <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <FiMapPin className="text-red-500 mt-1 w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-gray-500">Preferred Contact Method</p>
                      <p className="font-bold text-gray-900 text-base sm:text-lg break-words">
                        {service?.contactMethod || "N/A"}
                      </p>
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
              className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="bg-amber-100 p-2 sm:p-3 rounded-xl sm:rounded-2xl mt-1">
                  <FiShield className="text-amber-600 w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-2 sm:mb-3">
                    Safety Tips
                  </h3>
                  <ul className="text-gray-700 space-y-2 text-sm sm:text-base">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="break-words">Always meet in public campus locations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="break-words">Never send payments in advance without verification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="break-words">Check item condition before purchasing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="break-words">Report suspicious activity to Campus Security</span>
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
          className="grid grid-cols-1 sm:grid-cols-2 mt-8 sm:mt-10 gap-4 sm:gap-5 max-w-2xl mx-auto"
        >
          {cleanPhone && (
            <a
              href={`https://wa.me/${cleanPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 sm:py-5 px-6 sm:px-8 rounded-xl sm:rounded-2xl font-bold flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              <FiMessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
              WhatsApp Seller
            </a>
          )}
          {phone && (
            <a
              href={`tel:${phone}`}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-4 sm:py-5 px-6 sm:px-8 rounded-xl sm:rounded-2xl font-bold flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              <FiPhone className="w-5 h-5 sm:w-6 sm:h-6" />
              Call Seller
            </a>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ContactSeller;