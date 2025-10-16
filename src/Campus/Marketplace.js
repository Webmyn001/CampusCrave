import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiFilter, FiClock, FiUser, FiDollarSign, FiGrid, FiList, FiX, FiChevronDown, FiArrowRight } from 'react-icons/fi';
import { useState, useMemo, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showDesktopFilters, setShowDesktopFilters] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [displayLimits, setDisplayLimits] = useState({
    services: 12,
    urgent: 12,
    premium: 12
  });

   const navigate = useNavigate(); // Add this hook
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
        setBaseServices(res.data);
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
        setUrgentListingsData(res.data);
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
        setPremiumListingsData(res.data);
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
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
    >
      <div className="relative">
        <img 
          src={service.image || "https://images.unsplash.com/photo-1581093458791-9d4a34f65a1f?w=185&h=185&fit=crop"} 
          alt={service.businessName}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            Service
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-sm sm:text-base md:text-lg text-gray-800 mb-2 line-clamp-2 leading-tight">
          {service.businessName}
        </h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
            <FiUser className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="line-clamp-1">{service.ownerName}</span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
            <FiClock className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{service.workingHours || "Flexible"}</span>
          </div>
        </div>

        <Link 
  to={`/business/${service._id}`}
  state={{ service }}
  className="block w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 text-xs sm:text-sm text-center"
>
  View Service
</Link>
      </div>
    </motion.div>
  );

  const renderProductCard = (product, type) => (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
    >
      <div className="relative">
  <img 
    src={product.image || "https://images.unsplash.com/photo-1581093458791-9d4a34f65a1f?w=185&h=185&fit=crop"} 
    alt={product.title}
    className="w-full h-48 object-cover rounded-lg"
  />

  {/* 🔹 Urgent / Premium Tag */}
  <div className="absolute top-3 left-3">
    <span
      className={`px-2 py-1 rounded-full text-xs font-semibold ${
        type === "urgent"
          ? "bg-red-500 text-white"
          : "bg-yellow-500 text-gray-800"
      }`}
    >
      {type === "urgent" ? "Urgent" : "Premium"}
    </span>
  </div>

  {/* 🔹 SOLD OUT Overlay */}
  {product.soldOut && (
    <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-lg">
      <span className="text-white text-2xl sm:text-3xl font-extrabold uppercase tracking-widest drop-shadow-lg">
        Sold Out
      </span>
    </div>
  )}
</div>
      
      <div className="p-4">
        <h3 className="font-bold text-sm sm:text-base md:text-lg text-gray-800 mb-2 line-clamp-2 leading-tight">
          {product.title}
        </h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
            <FiGrid className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Condition: {product.condition || "Good"}</span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
            <FiDollarSign className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="font-bold text-green-600">₦{product.price?.toLocaleString() || "0"}</span>
          </div>
        </div>
{console.log(product)}
        <Link 
  to={`/listing/${product._id}`}
  state={{ product }}
  className="block w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 text-xs sm:text-sm text-center"
>
  View Service
</Link>
      </div>
    </motion.div>
  );

  const renderLoadingSkeleton = () => (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 animate-pulse">
          <div className="w-full h-48 bg-gray-300"></div>
          <div className="p-4">
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-3 bg-gray-300 rounded mb-1"></div>
            <div className="h-3 bg-gray-300 rounded mb-4"></div>
            <div className="h-10 bg-gray-300 rounded"></div>
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
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
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
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
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
      {!isLoading && data.length > 12 && displayedData.length < data.length && (
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
       
        {/* Logo and Caption */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }} 
          className="text-center mb-8"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.3 }} 
            className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-2 leading-tight"
          >
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Campus</span>
            <span className="text-gray-800 font-light">Crave</span>
          </motion.h1>
          <p className="text-gray-600 max-w-2xl py-2 text-center mx-auto">
            Discover services, urgent deals, and premium listings from your campus community
          </p>
        </motion.div>

        {/* Top Filter Bar - Only for Large Screens */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="hidden lg:block mb-8"
        >
          {/* Always Visible Search and Category Bar */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Search Input */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search services, urgent deals, and premium listings..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  <option value="service">Services</option>
                  <option value="urgent">Urgent Listings</option>
                  <option value="premium">Premium Listings</option>
                </select>
              </div>
            </div>
          </div>

          {/* Collapsible Advanced Filters */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            {/* Filter Toggle Button */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Advanced Filters</h3>
              <button
                onClick={() => setShowDesktopFilters(!showDesktopFilters)}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <FiFilter className="w-4 h-4" />
                {showDesktopFilters ? 'Hide Filters' : 'Show Filters'}
                <FiChevronDown 
                  className={`w-4 h-4 transition-transform duration-200 ${
                    showDesktopFilters ? 'rotate-180' : ''
                  }`} 
                />
              </button>
            </div>

            {/* Advanced Filter Content - Collapsible */}
            <AnimatePresence>
              {showDesktopFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Price Range */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Price Range
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="number"
                            placeholder="Min"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <input
                            type="number"
                            placeholder="Max"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      {/* Sort Options */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Sort By
                        </label>
                        <div className="flex gap-2">
                          <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="name">Name</option>
                            <option value="price">Price</option>
                          </select>
                          <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                          </select>
                        </div>
                      </div>

                      {/* Reset Filters */}
                      <div className="flex items-end">
                        <button
                          onClick={() => {
                            setSearchQuery('');
                            setSelectedCategory('all');
                            setMinPrice('');
                            setMaxPrice('');
                            setSortBy('name');
                            setSortOrder('asc');
                            setDisplayLimits({
                              services: 12,
                              urgent: 12,
                              premium: 12
                            });
                          }}
                          className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200"
                        >
                          Reset Filters
                        </button>
                      </div>
                    </div>

                    {/* Statistics */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-700 mb-3">Statistics</h4>
                      <div className="grid grid-cols-4 gap-3 text-sm">
                        <div className="text-center p-2 bg-blue-50 rounded-lg">
                          <div className="font-bold text-blue-600">{stats.total}</div>
                          <div className="text-blue-500">Total</div>
                        </div>
                        <div className="text-center p-2 bg-green-50 rounded-lg">
                          <div className="font-bold text-green-600">{stats.services}</div>
                          <div className="text-green-500">Services</div>
                        </div>
                        <div className="text-center p-2 bg-red-50 rounded-lg">
                          <div className="font-bold text-red-600">{stats.urgent}</div>
                          <div className="text-red-500">Urgent</div>
                        </div>
                        <div className="text-center p-2 bg-yellow-50 rounded-lg">
                          <div className="font-bold text-yellow-600">{stats.premium}</div>
                          <div className="text-yellow-500">Premium</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="w-full bg-white py-3 px-4 rounded-xl shadow-md flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <FiFilter className="w-5 h-5" />
              Search & Filters (Smart Finder)
            </span>
            <FiChevronDown className={`w-5 h-5 transition-transform ${showMobileFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Search and Filter Section for Mobile */}
        <div className="lg:hidden">
          <AnimatePresence>
            {showMobileFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6 mb-6 overflow-hidden"
              >
                {/* Search Input */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search
                  </label>
                  <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search listings..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Categories</option>
                    <option value="service">Services</option>
                    <option value="urgent">Urgent Listings</option>
                    <option value="premium">Premium Listings</option>
                  </select>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </label>
                  <div className="space-y-3">
                    <input
                      type="number"
                      placeholder="Min Price"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="number"
                      placeholder="Max Price"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Sort Options */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
                  >
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                  </select>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </select>
                </div>

                {/* Reset Filters */}
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setMinPrice('');
                    setMaxPrice('');
                    setSortBy('name');
                    setSortOrder('asc');
                    setDisplayLimits({
                      services: 12,
                      urgent: 12,
                      premium: 12
                    });
                  }}
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors duration-200"
                >
                  Reset Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

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
                  "Urgent Listings", 
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
                  "Urgent Listings", 
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
      </div>
    </div>
  );
};

export default Marketplace;