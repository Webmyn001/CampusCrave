import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiGrid, FiDollarSign, FiX, FiFilter, FiChevronDown } from 'react-icons/fi';
import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UrgentListingsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showDesktopFilters, setShowDesktopFilters] = useState(true);

  // State for urgent listings data
  const [urgentListingsData, setUrgentListingsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch urgent listings data from API
  useEffect(() => {
    const fetchUrgentListings = async () => {
      try {
        const res = await axios.get('https://campus-plum.vercel.app/api/listings/');
        setUrgentListingsData(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching urgent listings', err);
        setError(err);
        setLoading(false);
      }
    };

    fetchUrgentListings();
  }, []);

  // Filter urgent listings based on search criteria
  const filteredListings = useMemo(() => {
    let filtered = urgentListingsData;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.businessName?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by price range
    if (minPrice) {
      filtered = filtered.filter(item => item.price >= parseInt(minPrice));
    }
    if (maxPrice) {
      filtered = filtered.filter(item => item.price <= parseInt(maxPrice));
    }

    // Sort listings
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      if (sortBy === 'name') {
        aValue = a.title || a.businessName || '';
        bValue = b.title || b.businessName || '';
      } else {
        aValue = a.price || 0;
        bValue = b.price || 0;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [urgentListingsData, searchQuery, minPrice, maxPrice, sortBy, sortOrder]);

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

  // Loading skeleton component
  const renderLoadingSkeleton = () => (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
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

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Urgent Listings
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Quick deals and urgent sales from campus community
          </p>
        </motion.div>

        {/* Top Filter Bar - Only for Large Screens */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="hidden lg:block mb-8"
        >
          {/* Always Visible Search Bar */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Search Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Listings
                </label>
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by item name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Results Count */}
              <div className="flex items-end">
                <div className="w-full text-center p-3 bg-red-50 rounded-lg">
                  <div className="font-bold text-red-600 text-lg">
                    {loading ? '...' : filteredListings.length}
                  </div>
                  <div className="text-red-500 text-sm">Urgent Listings Found</div>
                </div>
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
                          Price Range (₦)
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="number"
                            placeholder="Min"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          />
                          <input
                            type="number"
                            placeholder="Max"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          >
                            <option value="name">Item Name</option>
                            <option value="price">Price</option>
                          </select>
                          <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
                            setMinPrice('');
                            setMaxPrice('');
                            setSortBy('name');
                            setSortOrder('asc');
                          }}
                          className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200"
                        >
                          Reset Filters
                        </button>
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
              <FiSearch className="w-5 h-5" />
              Search & Filters
            </span>
            <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs">
              {loading ? '...' : filteredListings.length} found
            </span>
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
                    Search Listings
                  </label>
                  <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search by item name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range (₦)
                  </label>
                  <div className="space-y-3">
                    <input
                      type="number"
                      placeholder="Min Price"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                    <input
                      type="number"
                      placeholder="Max Price"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent mb-2"
                  >
                    <option value="name">Item Name</option>
                    <option value="price">Price</option>
                  </select>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </select>
                </div>

                {/* Reset Filters */}
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setMinPrice('');
                    setMaxPrice('');
                    setSortBy('name');
                    setSortOrder('asc');
                  }}
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors duration-200"
                >
                  Reset Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Listings Grid */}
        <div>
          {loading ? (
            renderLoadingSkeleton()
          ) : error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-red-400 text-6xl mb-4">⚠️</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Error loading listings</h3>
              <p className="text-gray-500">Please try again later</p>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
            >
              <AnimatePresence>
                {filteredListings.map((item) => (
                  <motion.div
                    key={item.id || item._id}
                    variants={cardVariants}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                  >
                    <div className="relative">
                      <img 
                        src={item.image || "https://images.unsplash.com/photo-1581093458791-9d4a34f65a1f?w=185&h=185&fit=crop"} 
                        alt={item.title || item.businessName}
                        className="w-full h-48 object-cover rounded-lg"
                      />

                      {/* Urgent Tag */}
                      <div className="absolute top-3 left-3">
                        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          Urgent
                        </span>
                      </div>

                      {/* Hot / Quick Tag */}
                      <div className="absolute top-3 right-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            item.urgency === "high"
                              ? "bg-red-600 text-white"
                              : "bg-orange-500 text-white"
                          }`}
                        >
                          {item.urgency === "high" ? "🔥 Hot" : "⚡ Quick"}
                        </span>
                      </div>

                      {/* SOLD OUT Overlay */}
                      {item.soldOut && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-lg">
                          <span className="text-white text-2xl sm:text-3xl font-extrabold uppercase tracking-widest drop-shadow-lg">
                            Sold Out
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-bold text-sm sm:text-base text-gray-800 mb-2 line-clamp-2 leading-tight">
                        {item.title || item.businessName}
                      </h3>
                      
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <FiGrid className="w-3 h-3" />
                          <span>Condition: {item.condition || "Good"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <FiDollarSign className="w-3 h-3" />
                          <span className="font-bold text-green-600">
                            ₦{item.price?.toLocaleString() || "0"}
                          </span>
                        </div>
                      </div>

                      <Link 
                        to={`/Quicksales/${item._id || item.id}`}
                        state={{ product: item }}
                        className="block w-full bg-gradient-to-r from-red-500 to-orange-600 text-white py-2 rounded-lg font-semibold hover:from-red-600 hover:to-orange-700 transition-all duration-300 text-xs text-center"
                      >
                        View Details
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Empty State */}
          {!loading && !error && filteredListings.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-gray-400 text-6xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No urgent listings found</h3>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UrgentListingsPage;