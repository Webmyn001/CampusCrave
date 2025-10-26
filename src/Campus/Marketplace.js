import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiFilter, FiClock, FiUser, FiDollarSign, FiGrid, FiList, FiX, FiChevronDown, FiArrowRight, FiStar, FiHeart, FiShoppingCart, FiMapPin, FiEye } from 'react-icons/fi';
import { useState, useMemo, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { GiTwoCoins } from "react-icons/gi"
import axios from 'axios';

// Utility function to shuffle array
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showDesktopFilters, setShowDesktopFilters] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [displayLimits, setDisplayLimits] = useState({
    services: 8,
    urgent: 8,
    premium: 8
  });

  // State for all data
  const [baseServices, setBaseServices] = useState([]);
  const [urgentListingsData, setUrgentListingsData] = useState([]);
  const [premiumListingsData, setPremiumListingsData] = useState([]);
  const [loading, setLoading] = useState({
    services: true,
    urgent: true,
    premium: true
  });
  const [error, setError] = useState(null);

  // Fetch Services Data
  useEffect(() => {
    const fetchProListings = async () => {
      try {
        const res = await axios.get('https://campus-plum.vercel.app/api/vip-listings/');
        const shuffledData = shuffleArray(res.data);
        setBaseServices(shuffledData);
        setLoading(prev => ({ ...prev, services: false }));
      } catch (err) {
        console.error('Error fetching pro listings', err);
        setError(err);
        setLoading(prev => ({ ...prev, services: false }));
      }
    };

    fetchProListings();
  }, []);

  // Fetch Urgent Listings Data
  useEffect(() => {
    const fetchUrgentListings = async () => {
      try {
        const res = await axios.get('https://campus-plum.vercel.app/api/listings/');
        const shuffledData = shuffleArray(res.data);
        setUrgentListingsData(shuffledData);
        setLoading(prev => ({ ...prev, urgent: false }));
      } catch (err) {
        console.error('Error fetching urgent listings', err);
        setError(err);
        setLoading(prev => ({ ...prev, urgent: false }));
      }
    };

    fetchUrgentListings();
  }, []);

  // Fetch Premium Listings Data
  useEffect(() => {
    const fetchPremiumListings = async () => {
      try {
        const res = await axios.get('https://campus-plum.vercel.app/api/pro-listings/');
        const shuffledData = shuffleArray(res.data);
        setPremiumListingsData(shuffledData);
        setLoading(prev => ({ ...prev, premium: false }));
      } catch (err) {
        console.error('Error fetching premium listings', err);
        setError(err);
        setLoading(prev => ({ ...prev, premium: false }));
      }
    };

    fetchPremiumListings();
  }, []);

  const servicesData = baseServices;

  // Filter data based on search and filters
  const filterData = (data) => {
    return data.filter(item => {
      const matchesSearch = !searchQuery || 
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.businessName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.ownerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sellerInfo?.name?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPrice = (!minPrice || (item.price && item.price >= parseInt(minPrice))) && 
                          (!maxPrice || (item.price && item.price <= parseInt(maxPrice)));

      return matchesSearch && matchesPrice;
    });
  };

  const filteredServices = filterData(servicesData);
  const filteredUrgent = filterData(urgentListingsData);
  const filteredPremium = filterData(premiumListingsData);
  
  // Get displayed items based on current limit
  const displayedServices = filteredServices.slice(0, displayLimits.services);
  const displayedUrgent = filteredUrgent.slice(0, displayLimits.urgent);
  const displayedPremium = filteredPremium.slice(0, displayLimits.premium);

  // Statistics
  const stats = {
    total: servicesData.length + urgentListingsData.length + premiumListingsData.length,
    services: servicesData.length,
    urgent: urgentListingsData.length,
    premium: premiumListingsData.length,
    filtered: filteredServices.length + filteredUrgent.length + filteredPremium.length
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: { duration: 0.3 }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const renderServiceCard = (service) => (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 group cursor-pointer"
    >
      <div className="relative overflow-hidden">
        <img 
          src={service?.images?.[0]?.url || "https://images.unsplash.com/photo-1581093458791-9d4a34f65a1f?w=300&h=200&fit=crop"} 
          alt={service.businessName}
          className="w-full h-32 sm:h-40 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2">
          <button className="p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors">
            <FiHeart className="w-3 h-3 text-gray-600 hover:text-red-500" />
          </button>
        </div>
        <div className="absolute bottom-2 left-2">
          <span className="bg-green-500 text-white px-2 py-0.5 rounded-full text-xs font-medium">
            Service
          </span>
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-sm text-gray-800 mb-2 line-clamp-2 leading-tight group-hover:text-indigo-600 transition-colors">
          {service.businessName}
        </h3>
        
        <div className="space-y-1 mb-3">
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <FiUser className="w-3 h-3 text-indigo-500" />
            <span className="line-clamp-1">{service?.sellerInfo?.name || "Unknown Seller"}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <FiClock className="w-3 h-3 text-orange-500" />
            <span className="line-clamp-1">{service.workingHours || "Flexible Hours"}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <FiStar className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="text-xs font-medium text-gray-700">4.8</span>
            <span className="text-xs text-gray-500">(24)</span>
          </div>
          <Link 
            to={`/business/${service._id}`}
            state={{ service }}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-3 py-1.5 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 text-xs flex items-center gap-1"
          >
            <FiEye className="w-3 h-3" />
            View
          </Link>
        </div>
      </div>
    </motion.div>
  );

  const renderProductCard = (product, type) => (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 group cursor-pointer"
    >
      <div className="relative overflow-hidden">
        <img 
          src={product?.images?.[0]?.url || "https://images.unsplash.com/photo-1581093458791-9d4a34f65a1f?w=300&h=200&fit=crop"} 
          alt={product.title}
          className="w-full h-32 sm:h-40 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Wishlist Button */}
        <div className="absolute top-2 right-2">
          <button className="p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors">
            <FiHeart className="w-3 h-3 text-gray-600 hover:text-red-500" />
          </button>
        </div>

        {/* Category Badge */}
        <div className="absolute bottom-2 left-2">
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
            type === 'urgent' ? 'bg-red-500 text-white' : 
            type === 'premium' ? 'bg-yellow-500 text-white' : 
            'bg-indigo-500 text-white'
          }`}>
            {type === 'urgent' ? 'Quick Sale' : type === 'premium' ? 'Premium' : 'Product'}
          </span>
        </div>

        {/* Sold Out Overlay */}
        {product.soldOut && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white text-sm font-bold uppercase tracking-wider drop-shadow-lg">
              Sold Out
            </span>
          </div>
        )}
      </div>
      
      <div className="p-3">
        <h3 className="font-semibold text-sm text-gray-800 mb-2 line-clamp-2 leading-tight group-hover:text-indigo-600 transition-colors">
          {product.title}
        </h3>
        
        <div className="space-y-1 mb-3">
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <FiGrid className="w-3 h-3 text-purple-500" />
            <span className="line-clamp-1">Condition: {product.condition || "Good"}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <FiUser className="w-3 h-3 text-indigo-500" />
            <span className="line-clamp-1">{product.sellerInfo?.name || "Campus Seller"}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1">
            <GiTwoCoins className="w-4 h-4 text-green-600" />
            <span className="text-sm font-bold text-green-600">₦{product.price?.toLocaleString() || "0"}</span>
          </div>
          <div className="flex items-center gap-1">
            <FiStar className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="text-xs font-medium text-gray-700">4.5</span>
            <span className="text-xs text-gray-500">(12)</span>
          </div>
        </div>

        <Link 
          to={`/listing/${product._id}`}
          state={{ product }}
          className="block w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 text-xs text-center flex items-center justify-center gap-1"
        >
          <FiEye className="w-3 h-3" />
          View Details
        </Link>
      </div>
    </motion.div>
  );

  const renderLoadingSkeleton = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 animate-pulse">
          <div className="w-full h-32 sm:h-40 bg-gray-300"></div>
          <div className="p-3">
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="space-y-1 mb-3">
              <div className="h-3 bg-gray-300 rounded"></div>
              <div className="h-3 bg-gray-300 rounded"></div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <div className="h-4 bg-gray-300 rounded w-16"></div>
              <div className="h-3 bg-gray-300 rounded w-12"></div>
            </div>
            <div className="h-8 bg-gray-300 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSection = (title, data, displayedData, renderCard, type, totalCount, isLoading) => (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <div className="flex items-center justify-between mb-6">
        <h2
  className={`text-2xl font-bold ${
    title === "Services"
      ? "text-green-500"
      : title === "Premium Listings"
      ? "text-yellow-500"
      : title === "Quick Sales"
      ? "text-red-500"
      : "text-gray-800"
  }`}
>
  {title}
</h2>
        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
          {displayedData.length} of {totalCount} items
        </span>
      </div>

      <AnimatePresence mode="wait">
        {isLoading ? (
          renderLoadingSkeleton()
        ) : displayedData.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6"
          >
            {displayedData.map((item) => (
              <motion.div key={`${type}-${item.id}`} variants={cardVariants}>
                {renderCard(item, type)}
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-gray-50 rounded-2xl"
          >
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No {title.toLowerCase()} found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View All Link */}
      {!isLoading && data.length > 5 && displayedData.length < data.length && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-6"
        >
          <Link to={
            type === 'service' ? '/services' : 
            type === 'urgent' ? '/Quicksales' : 
            type === 'premium' ? '/premium' : 
            '/marketplace'
          }
            onClick={() => setDisplayLimits(prev => ({ ...prev, [type]: data.length }))}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
          >
            <span>View All {totalCount} {title.toLowerCase()}</span>
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      )}
    </motion.section>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-100 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
       
        {/* Modern Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }} 
          className="mb-8"
        >
          {/* Logo and Title */}
          <div className="text-center mb-6">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, delay: 0.3 }} 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3 leading-tight"
            >
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Campus</span>
              <span className="text-gray-800 font-light">Crave</span>
            </motion.h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Your campus marketplace for services, deals, and premium listings
            </p>
          </div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
              {/* Search Input with Filter Icon */}
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search services, products, urgent deals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm bg-gray-50 focus:bg-white transition-all"
                />
                <button
                  onClick={() => setShowFilterModal(true)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-md transition-all duration-300 hover:scale-105"
                >
                  <FiFilter className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Category Filters - Desktop Only */}
              <div className="hidden lg:flex flex-wrap gap-2 mt-4">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedCategory === 'all' 
                      ? 'bg-indigo-500 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  All ({stats.total})
                </button>
                <button
                  onClick={() => setSelectedCategory('service')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedCategory === 'service' 
                      ? 'bg-green-500 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Services ({stats.services})
                </button>
                <button
                  onClick={() => setSelectedCategory('urgent')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedCategory === 'urgent' 
                      ? 'bg-red-500 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Quick Sales ({stats.urgent})
                </button>
                <button
                  onClick={() => setSelectedCategory('premium')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedCategory === 'premium' 
                      ? 'bg-yellow-500 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Premium ({stats.premium})
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Advanced Filter Modal */}
        <AnimatePresence>
          {showFilterModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowFilterModal(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-800">Advanced Filters</h2>
                  <button
                    onClick={() => setShowFilterModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <FiX className="w-6 h-6 text-gray-500" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6 space-y-6">
                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Price Range (₦)
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <input
                          type="number"
                          placeholder="Min Price"
                          value={minPrice}
                          onChange={(e) => setMinPrice(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <input
                          type="number"
                          placeholder="Max Price"
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Sort Options */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Sort By
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="name">Name</option>
                        <option value="price">Price</option>
                        <option value="date">Date Added</option>
                        <option value="rating">Rating</option>
                      </select>
                      <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                      </select>
                    </div>
                  </div>

                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Category
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Categories</option>
                      <option value="service">Services</option>
                      <option value="urgent">Quick Sales</option>
                      <option value="premium">Premium Listings</option>
                    </select>
                  </div>

                  {/* Statistics */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-700 mb-3">Search Results</h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="font-bold text-blue-600 text-lg">{stats.filtered}</div>
                        <div className="text-blue-500">Filtered Results</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="font-bold text-green-600 text-lg">{stats.total}</div>
                        <div className="text-green-500">Total Items</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="flex gap-3 p-6 border-t border-gray-200">
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setMinPrice('');
                      setMaxPrice('');
                      setSortBy('name');
                      setSortOrder('asc');
                      setDisplayLimits({
                        services: 8,
                        urgent: 8,
                        premium: 8
                      });
                    }}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Reset All
                  </button>
                  <button
                    onClick={() => setShowFilterModal(false)}
                    className="flex-1 bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
                  >
                    Apply Filters
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Summary */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-6"
        >
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl shadow-sm p-4 border border-indigo-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <h3 className="text-lg font-bold text-gray-800">
                    {selectedCategory === 'all' ? 'All Listings' : 
                     selectedCategory === 'service' ? 'Services' :
                     selectedCategory === 'urgent' ? 'Quick Sales' : 'Premium Listings'}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                    {stats.filtered} results
                  </span>
                  <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">
                    of {stats.total} total
                  </span>
                </div>
              </div>
              
              {/* Modern Sort Section */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FiChevronDown className="w-4 h-4 text-indigo-500" />
                  <span className="font-medium">Sort by:</span>
                </div>
                <div className="relative">
                  <select
                    value={`${sortBy}-${sortOrder}`}
                    onChange={(e) => {
                      const [newSortBy, newSortOrder] = e.target.value.split('-');
                      setSortBy(newSortBy);
                      setSortOrder(newSortOrder);
                    }}
                    className="appearance-none bg-white border-2 border-indigo-200 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
                  >
                    <option value="name-asc">Name A-Z</option>
                    <option value="name-desc">Name Z-A</option>
                    <option value="price-asc">Price Low-High</option>
                    <option value="price-desc">Price High-Low</option>
                    <option value="date-desc">Newest First</option>
                    <option value="date-asc">Oldest First</option>
                  </select>
                  <FiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-indigo-500 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div>
          <AnimatePresence mode="wait">
            {selectedCategory === 'all' ? (
              <motion.div
                key="all-categories"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Services Section */}
                {renderSection(
                  "Services", 
                  filteredServices, 
                  displayedServices, 
                  renderServiceCard, 
                  "service",
                  filteredServices.length,
                  loading.services
                )}

                {/* Premium Listings Section */}
                {renderSection(
                  "Premium Listings", 
                  filteredPremium, 
                  displayedPremium, 
                  renderProductCard, 
                  "premium",
                  filteredPremium.length,
                  loading.premium
                )}

                {/* Urgent Listings Section */}
                {renderSection(
                  "Quick Sales", 
                  filteredUrgent, 
                  displayedUrgent, 
                  renderProductCard, 
                  "urgent",
                  filteredUrgent.length,
                  loading.urgent
                )}
              </motion.div>
            ) : (
              <motion.div
                key="single-category"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {selectedCategory === 'service' && renderSection(
                  "Services", 
                  filteredServices, 
                  displayedServices, 
                  renderServiceCard, 
                  "service",
                  filteredServices.length,
                  loading.services
                )}
                {selectedCategory === 'urgent' && renderSection(
                  "Quick Sales", 
                  filteredUrgent, 
                  displayedUrgent, 
                  renderProductCard, 
                  "urgent",
                  filteredUrgent.length,
                  loading.urgent
                )}
                {selectedCategory === 'premium' && renderSection(
                  "Premium Listings", 
                  filteredPremium, 
                  displayedPremium, 
                  renderProductCard, 
                  "premium",
                  filteredPremium.length,
                  loading.premium
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Floating Filter Button for Mobile */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          onClick={() => setShowFilterModal(true)}
          className="fixed bottom-6 right-6 lg:hidden bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white p-3 rounded-full shadow-lg z-40 transition-all duration-300 hover:scale-110"
        >
          <FiFilter className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
};

export default Marketplace;