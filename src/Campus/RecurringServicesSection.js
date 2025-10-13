import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiClock, FiUser, FiDollarSign, FiX, FiFilter, FiChevronDown } from 'react-icons/fi';
import { useState, useMemo } from 'react';

const ServicesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showDesktopFilters, setShowDesktopFilters] = useState(true);

  // Services data
  const servicesData = [
    {
      id: 1,
      businessName: "Campus Printing Hub",
      ownerName: "John Ade",
      workingHours: "8AM - 6PM",
      image: "https://images.unsplash.com/photo-1581093458791-9d4a34f65a1f?w=185&h=185&fit=crop",
      rating: 4.5,
      price: 500
    },
    {
      id: 2,
      businessName: "Student Haircuts & Styling Studio",
      ownerName: "Sarah Beauty",
      workingHours: "9AM - 8PM",
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=185&h=185&fit=crop",
      rating: 4.8,
      price: 3000
    },
    {
      id: 3,
      businessName: "Tech Repair Zone & Phone Services",
      ownerName: "Mike Tech",
      workingHours: "10AM - 7PM",
      image: "https://images.unsplash.com/photo-1581093458791-9d4a34f65a1f?w=185&h=185&fit=crop",
      rating: 4.3,
      price: 1500
    },
    {
      id: 4,
      businessName: "Campus Laundry & Dry Cleaning",
      ownerName: "Grace Clean",
      workingHours: "7AM - 9PM",
      image: "https://images.unsplash.com/photo-1581093458791-9d4a34f65a1f?w=185&h=185&fit=crop",
      rating: 4.6,
      price: 2000
    },
    {
      id: 5,
      businessName: "Food Delivery & Catering Services",
      ownerName: "David Meals",
      workingHours: "24/7",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=185&h=185&fit=crop",
      rating: 4.7,
      price: 2500
    },
    {
      id: 6,
      businessName: "Study Group Tutoring Center",
      ownerName: "Prof. Smart",
      workingHours: "3PM - 9PM",
      image: "https://images.unsplash.com/photo-1581093458791-9d4a34f65a1f?w=185&h=185&fit=crop",
      rating: 4.9,
      price: 5000
    },
    {
      id: 7,
      businessName: "Fitness Training & Gym Sessions",
      ownerName: "Coach Strong",
      workingHours: "5AM - 10PM",
      image: "https://images.unsplash.com/photo-1581093458791-9d4a34f65a1f?w=185&h=185&fit=crop",
      rating: 4.8,
      price: 8000
    },
    {
      id: 8,
      businessName: "Photography & Event Coverage",
      ownerName: "Emma Shots",
      workingHours: "Flexible",
      image: "https://images.unsplash.com/photo-1581093458791-9d4a34f65a1f?w=185&h=185&fit=crop",
      rating: 4.7,
      price: 15000
    },
    {
      id: 9,
      businessName: "Graphic Design & Branding Studio",
      ownerName: "Alex Creative",
      workingHours: "9AM - 6PM",
      image: "https://images.unsplash.com/photo-1581093458791-9d4a34f65a1f?w=185&h=185&fit=crop",
      rating: 4.9,
      price: 12000
    },
    {
      id: 10,
      businessName: "Music Lessons & Instrument Training",
      ownerName: "Melody Masters",
      workingHours: "2PM - 8PM",
      image: "https://images.unsplash.com/photo-1581093458791-9d4a34f65a1f?w=185&h=185&fit=crop",
      rating: 4.8,
      price: 6000
    },
    {
      id: 11,
      businessName: "Car Wash & Auto Detailing",
      ownerName: "Sparkle Clean",
      workingHours: "7AM - 7PM",
      image: "https://images.unsplash.com/photo-1581093458791-9d4a34f65a1f?w=185&h=185&fit=crop",
      rating: 4.6,
      price: 4000
    },
    {
      id: 12,
      businessName: "Web Development & IT Solutions",
      ownerName: "Tech Wizards",
      workingHours: "10AM - 6PM",
      image: "https://images.unsplash.com/photo-1581093458791-9d4a34f65a1f?w=185&h=185&fit=crop",
      rating: 4.9,
      price: 25000
    },
    {
      id: 13,
      businessName: "Language Translation Services",
      ownerName: "Global Communicators",
      workingHours: "24/7 Online",
      image: "https://images.unsplash.com/photo-1581093458791-9d4a34f65a1f?w=185&h=185&fit=crop",
      rating: 4.7,
      price: 7000
    },
    {
      id: 14,
      businessName: "Event Planning & Decorations",
      ownerName: "Celebration Experts",
      workingHours: "9AM - 5PM",
      image: "https://images.unsplash.com/photo-1581093458791-9d4a34f65a1f?w=185&h=185&fit=crop",
      rating: 4.8,
      price: 18000
    }
  ];

  // Filter services based on search criteria
  const filteredServices = useMemo(() => {
    let filtered = servicesData;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(service =>
        service.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.ownerName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by price range
    if (minPrice) {
      filtered = filtered.filter(service => service.price >= parseInt(minPrice));
    }
    if (maxPrice) {
      filtered = filtered.filter(service => service.price <= parseInt(maxPrice));
    }

    // Sort services
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      if (sortBy === 'name') {
        aValue = a.businessName;
        bValue = b.businessName;
      } else {
        aValue = a.price;
        bValue = b.price;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [servicesData, searchQuery, minPrice, maxPrice, sortBy, sortOrder]);

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
            Campus Services
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover trusted services from your campus community
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
                  Search Services
                </label>
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by business or owner name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Results Count */}
              <div className="flex items-end">
                <div className="w-full text-center p-3 bg-blue-50 rounded-lg">
                  <div className="font-bold text-blue-600 text-lg">{filteredServices.length}</div>
                  <div className="text-blue-500 text-sm">Services Found</div>
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
                            <option value="name">Business Name</option>
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
            <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">
              {filteredServices.length} found
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
                    Search Services
                  </label>
                  <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search by business or owner name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    <option value="name">Business Name</option>
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

        {/* Services Grid */}
        <div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
          >
            <AnimatePresence>
              {filteredServices.map((service) => (
                <motion.div
                  key={service.id}
                  variants={cardVariants}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  <div className="relative">
                    <img 
                      src={service.image} 
                      alt={service.businessName}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        Service
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs">
                      ⭐ {service.rating}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-bold text-sm sm:text-base text-gray-800 mb-2 line-clamp-2 leading-tight">
                      {service.businessName}
                    </h3>
                    
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <FiUser className="w-3 h-3" />
                        <span className="line-clamp-1">{service.ownerName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <FiClock className="w-3 h-3" />
                        <span>{service.workingHours}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <FiDollarSign className="w-3 h-3" />
                        <span className="font-bold text-green-600">₦{service.price.toLocaleString()}</span>
                      </div>
                    </div>

                    <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 text-xs">
                      View Details
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredServices.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No services found</h3>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;