import { motion, AnimatePresence } from 'framer-motion';
import { Search, Grid,  X, Filter, ChevronDown, Eye, Heart, User,  Coins } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UrgentListingsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showFilterModal, setShowFilterModal] = useState(false);

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

  // Loading skeleton component
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-100 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Modern Header - Matching Marketplace */}
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
              <span className="bg-gradient-to-r from-red-600 via-orange-600 to-pink-600 bg-clip-text text-transparent">Quick</span>
              <span className="text-gray-800 font-light">Sales</span>
            </motion.h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Urgent deals and quick sales from your campus community
            </p>
          </div>

          {/* Search Bar - Matching Marketplace Style */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
              {/* Search Input with Filter Icon */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search urgent listings by item name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm bg-gray-50 focus:bg-white transition-all"
                />
                <button
                  onClick={() => setShowFilterModal(true)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white rounded-md transition-all duration-300 hover:scale-105"
                >
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Advanced Filter Modal - Matching Marketplace */}
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
                    <X className="w-6 h-6 text-gray-500" />
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <input
                          type="number"
                          placeholder="Max Price"
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
                        className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      >
                        <option value="name">Name</option>
                        <option value="price">Price</option>
                      </select>
                      <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      >
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                      </select>
                    </div>
                  </div>

                  {/* Statistics */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-700 mb-3">Search Results</h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="text-center p-3 bg-red-50 rounded-lg">
                        <div className="font-bold text-red-600 text-lg">{filteredListings.length}</div>
                        <div className="text-red-500">Filtered Results</div>
                      </div>
                      <div className="text-center p-3 bg-orange-50 rounded-lg">
                        <div className="font-bold text-orange-600 text-lg">{urgentListingsData.length}</div>
                        <div className="text-orange-500">Total Listings</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="flex gap-3 p-6 border-t border-gray-200">
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setMinPrice('');
                      setMaxPrice('');
                      setSortBy('name');
                      setSortOrder('asc');
                    }}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Reset All
                  </button>
                  <button
                    onClick={() => setShowFilterModal(false)}
                    className="flex-1 bg-gradient-to-r from-red-500 to-orange-600 text-white py-3 rounded-xl font-semibold hover:from-red-600 hover:to-orange-700 transition-colors"
                  >
                    Apply Filters
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Summary - Matching Marketplace */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-6"
        >
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl shadow-sm p-4 border border-red-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <h3 className="text-lg font-bold text-gray-800">
                    Quick Sales
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-gradient-to-r from-red-500 to-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                    {loading ? '...' : filteredListings.length} results
                  </span>
                  <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">
                    of {urgentListingsData.length} total
                  </span>
                </div>
              </div>
              
              {/* Modern Sort Section */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <ChevronDown className="w-4 h-4 text-red-500" />
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
                    className="appearance-none bg-white border-2 border-red-200 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
                  >
                    <option value="name-asc">Name A-Z</option>
                    <option value="name-desc">Name Z-A</option>
                    <option value="price-asc">Price Low-High</option>
                    <option value="price-desc">Price High-Low</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-500 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Listings Grid - Matching Marketplace Card Grid */}
        <div>
          {loading ? (
            renderLoadingSkeleton()
          ) : error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 bg-gray-50 rounded-2xl"
            >
              <div className="text-red-400 text-6xl mb-4">⚠️</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Error loading listings</h3>
              <p className="text-gray-500">Please try again later</p>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              {filteredListings.length > 0 ? (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6"
                >
                  {filteredListings.map((item) => (
                    <motion.div
                      key={item.id || item._id}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 group cursor-pointer"
                    >
                      <div className="relative overflow-hidden">
                        <img 
                          src={item?.images?.[0]?.url || "https://images.unsplash.com/photo-1581093458791-9d4a34f65a1f?w=300&h=200&fit=crop"} 
                          alt={item.title || item.businessName}
                          className="w-full h-32 sm:h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        
                        {/* Wishlist Button */}
                        <div className="absolute top-2 right-2">
                          <button className="p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors">
                            <Heart className="w-3 h-3 text-gray-600 hover:text-red-500" />
                          </button>
                        </div>

                        {/* Category Badge */}
                        <div className="absolute bottom-2 left-2">
                          <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-medium">
                            Quick Sale
                          </span>
                        </div>

                        {/* Sold Out Overlay */}
                        {item.soldOut && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="text-white text-sm font-bold uppercase tracking-wider drop-shadow-lg">
                              Sold Out
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="p-3">
                        <h3 className="font-semibold text-sm text-gray-800 mb-2 line-clamp-2 leading-tight group-hover:text-red-600 transition-colors">
                          {item.title || item.businessName}
                        </h3>
                        
                        <div className="space-y-1 mb-3">
                          <div className="flex items-center gap-1.5 text-xs text-gray-600">
                            <Grid className="w-3 h-3 text-purple-500" />
                            <span className="line-clamp-1">Condition: {item.condition || "Good"}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-gray-600">
                            <User className="w-3 h-3 text-indigo-500" />
                            <span className="line-clamp-1">{item.sellerInfo?.name || "Campus Seller"}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-1">
                            <Coins className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-bold text-green-600">₦{item.price?.toLocaleString() || "0"}</span>
                          </div>
                        </div>

                        <Link 
                          to={`/listing/${item._id || item.id}`}
                          state={{ product: item }}
                          className="block w-full bg-gradient-to-r from-red-500 to-orange-600 text-white py-2 rounded-lg font-medium hover:from-red-600 hover:to-orange-700 transition-all duration-300 text-xs text-center flex items-center justify-center gap-1"
                        >
                          <Eye className="w-3 h-3" />
                          View Details
                        </Link>
                      </div>
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
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No quick sales found</h3>
                  <p className="text-gray-500">Try adjusting your search criteria</p>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>

        {/* Floating Filter Button for Mobile */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          onClick={() => setShowFilterModal(true)}
          className="fixed bottom-6 right-6 lg:hidden bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white p-3 rounded-full shadow-lg z-40 transition-all duration-300 hover:scale-110"
        >
          <Filter className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
};

export default UrgentListingsPage;