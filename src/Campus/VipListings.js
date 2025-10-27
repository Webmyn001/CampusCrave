import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { FiSearch, FiLoader, FiAlertCircle, FiShoppingBag, FiStar, FiEye, FiCalendar, FiArrowRight, FiCheck } from "react-icons/fi";

const VipServicesListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchListings = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://campus-plum.vercel.app/api/vip-listings/");
        if (!cancelled) {
          setListings(Array.isArray(response.data) ? response.data : []);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.response?.data?.message || err.message || "Failed to load VIP services.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchListings();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredListings = listings.filter((item) =>
    (item.title || "").toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const cardHoverVariants = {
    rest: { scale: 1, y: 0 },
    hover: { scale: 1.02, y: -5 }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/20 to-purple-50/20 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg">
                <FiLoader className="w-8 h-8 text-white" />
              </div>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-amber-600 font-medium mt-4 text-lg"
            >
              Loading premium services...
            </motion.p>
          </motion.div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-rose-50/20 to-purple-50/20 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="bg-gradient-to-r from-rose-100 to-pink-100 p-6 rounded-2xl mb-6">
              <FiAlertCircle className="w-16 h-16 text-rose-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Services</h3>
            <p className="text-gray-600 max-w-2xl mb-6">{error}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Try Again
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/10 to-purple-50/10 py-8 px-4 sm:px-6 lg:px-8">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div
            variants={itemVariants}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 p-8 mb-8 shadow-2xl"
          >
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
                    <FiShoppingBag className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                      VIP Services
                    </h1>
                    <p className="text-amber-100 text-lg">
                      Exclusive premium services for discerning clients
                    </p>
                  </div>
                </div>
                <div className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                  <span className="text-white font-semibold">
                    {listings.length} Premium {listings.length === 1 ? 'Service' : 'Services'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search VIP services..."
                className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 shadow-lg"
              />
            </div>
          </motion.div>

          {/* Content */}
          <AnimatePresence mode="wait">
            {listings.length === 0 ? (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="bg-gradient-to-r from-amber-100 to-yellow-100 p-8 rounded-2xl mb-6">
                  <FiShoppingBag className="w-16 h-16 text-amber-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  No Premium Services Available
                </h3>
                <p className="text-gray-600 max-w-2xl text-lg leading-relaxed">
                  Currently there are no VIP services listed. Check back later or contact us to feature your premium service.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="listings-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Search Results Info */}
                {searchTerm && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-6"
                  >
                    <p className="text-gray-600">
                      Showing {filteredListings.length} of {listings.length} services
                      {searchTerm && ` for "${searchTerm}"`}
                    </p>
                  </motion.div>
                )}

                {/* Empty Search Results */}
                {searchTerm && filteredListings.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                  >
                    <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-6 rounded-2xl inline-block mb-4">
                      <FiSearch className="w-12 h-12 text-gray-400" />
                    </div>
                    <p className="text-gray-600 text-lg">No services found matching your search.</p>
                  </motion.div>
                )}

                {/* Listings Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  <AnimatePresence>
                    {filteredListings.map((item, index) => (
                      <ListingCard 
                        key={item._id || item.id} 
                        item={item} 
                        index={index}
                        variants={itemVariants}
                        hoverVariants={cardHoverVariants}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

// Enhanced Listing Card Component with Verified Badge
const ListingCard = ({ item, index, variants, hoverVariants }) => {
  // Check if seller is verified (assuming item.sellerInfo.isVerified exists)
  const isVerified = item.sellerInfo?.isVerified || false;

  return (
    <motion.article
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      whileHover="hover"
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="group"
    >
      <motion.div
        variants={hoverVariants}
        className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:shadow-xl transition-all duration-300"
      >
        {/* Image Section */}
        <div className="relative overflow-hidden">
          <Link to={`/business/${item._id || item.id}`} className="block">
            <img
              src={
                item.image ||
                (item.photos && item.photos[0]) ||
                `https://picsum.photos/800/600?random=${encodeURIComponent(
                  item._id || item.id || item.title
                )}`
              }
              alt={item.title || "VIP service"}
              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://picsum.photos/800/600?commerce";
              }}
            />
          </Link>
          
          {/* Badges Container */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {/* VIP Badge */}
            <span className="bg-gradient-to-r from-amber-400 to-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg w-fit">
              VIP
            </span>
            
            {/* Verified Badge - Conditionally Rendered */}
            {isVerified && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg w-fit flex items-center gap-1"
              >
                <FiCheck className="w-3 h-3" />
                Verified
              </motion.span>
            )}
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content Section */}
        <div className="p-4">
          <div className="mb-3">
            <h3 className="font-bold text-gray-800 text-lg mb-1 line-clamp-2 leading-tight">
              {item.title || "Untitled Service"}
            </h3>
            
            {(item.category || item.tag) && (
              <p className="text-sm text-amber-600 font-medium mb-2">
                {item.category || item.tag}
              </p>
            )}
          </div>

          {/* Meta Information */}
          <div className="space-y-2 mb-4">
            {item.membersince && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <FiCalendar className="w-4 h-4" />
                <span>Member since: {item.membersince}</span>
              </div>
            )}
            
            {/* Additional meta info can go here */}
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <div className="flex items-center gap-1">
                <FiStar className="w-3 h-3 text-amber-400" />
                <span>Premium</span>
              </div>
              <div className="flex items-center gap-1">
                <FiEye className="w-3 h-3" />
                <span>VIP Exclusive</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <Link
            to={`/business/${item._id || item.id}`}
            className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 group/btn"
          >
            View Details
            <FiArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </motion.div>
    </motion.article>
  );
};

export default VipServicesListings;