import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiFilter, FiClock, FiUser, FiDollarSign, FiGrid, FiList, FiX, FiChevronDown, FiArrowRight } from 'react-icons/fi';
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

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

  // Generate more dummy data to have more than 12 items
  const generateServicesData = () => {
    const baseServices = [
      {
        id: 1,
        businessName: "Campus Printing Hub",
        ownerName: "John Ade",
        workingHours: "8AM - 6PM",
        image: "https://images.unsplash.com/photo-1581093458791-9d4a34f65a1f?w=185&h=185&fit=crop",
        type: "service",
        rating: 4.5
      },
      {
        id: 2,
        businessName: "Student Haircuts & Styling Studio",
        ownerName: "Sarah Beauty",
        workingHours: "9AM - 8PM",
        image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=185&h=185&fit=crop",
        type: "service",
        rating: 4.8
      },
      {
        id: 3,
        businessName: "Tech Repair Zone & Phone Services",
        ownerName: "Mike Tech",
        workingHours: "10AM - 7PM",
        image: "https://images.unsplash.com/photo-1581093458791-9d4a34f65a1f?w=185&h=185&fit=crop",
        type: "service",
        rating: 4.3
      },
      {
        id: 4,
        businessName: "Campus Laundry & Dry Cleaning",
        ownerName: "Grace Clean",
        workingHours: "7AM - 9PM",
        image: "https://images.unsplash.com/photo-1581093458791-9d4a34f65a1f?w=185&h=185&fit=crop",
        type: "service",
        rating: 4.6
      },
      {
        id: 5,
        businessName: "Food Delivery & Catering Services",
        ownerName: "David Meals",
        workingHours: "24/7",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=185&h=185&fit=crop",
        type: "service",
        rating: 4.7
      },
      {
        id: 6,
        businessName: "Study Group Tutoring Center",
        ownerName: "Prof. Smart",
        workingHours: "3PM - 9PM",
        image: "https://images.unsplash.com/photo-1581093458791-9d4a34f65a1f?w=185&h=185&fit=crop",
        type: "service",
        rating: 4.9
      },
      {
        id: 7,
        businessName: "Fitness Training & Gym Sessions",
        ownerName: "Coach Strong",
        workingHours: "5AM - 10PM",
        image: "https://images.unsplash.com/photo-1581093458791-9d4a34f65a1f?w=185&h=185&fit=crop",
        type: "service",
        rating: 4.8
      },
      {
        id: 8,
        businessName: "Photography & Event Coverage",
        ownerName: "Emma Shots",
        workingHours: "Flexible",
        image: "https://images.unsplash.com/photo-1581093458791-9d4a34f65a1f?w=185&h=185&fit=crop",
        type: "service",
        rating: 4.7
      },
      {
        id: 9,
        businessName: "Graphic Design & Branding Studio",
        ownerName: "Alex Creative",
        workingHours: "9AM - 6PM",
        image: "https://images.unsplash.com/photo-1581093458791-9d4a34f65a1f?w=185&h=185&fit=crop",
        type: "service",
        rating: 4.9
      },
      {
        id: 10,
        businessName: "Music Lessons & Instrument Training",
        ownerName: "Melody Masters",
        workingHours: "2PM - 8PM",
        image: "https://images.unsplash.com/photo-1581093458791-9d4a34f65a1f?w=185&h=185&fit=crop",
        type: "service",
        rating: 4.8
      },
      {
        id: 11,
        businessName: "Car Wash & Auto Detailing",
        ownerName: "Sparkle Clean",
        workingHours: "7AM - 7PM",
        image: "https://images.unsplash.com/photo-1581093458791-9d4a34f65a1f?w=185&h=185&fit=crop",
        type: "service",
        rating: 4.6
      },
      {
        id: 12,
        businessName: "Web Development & IT Solutions",
        ownerName: "Tech Wizards",
        workingHours: "10AM - 6PM",
        image: "https://images.unsplash.com/photo-1581093458791-9d4a34f65a1f?w=185&h=185&fit=crop",
        type: "service",
        rating: 4.9
      },
      {
        id: 13,
        businessName: "Language Translation Services",
        ownerName: "Global Communicators",
        workingHours: "24/7 Online",
        image: "https://images.unsplash.com/photo-1581093458791-9d4a34f65a1f?w=185&h=185&fit=crop",
        type: "service",
        rating: 4.7
      },
      {
        id: 14,
        businessName: "Event Planning & Decorations",
        ownerName: "Celebration Experts",
        workingHours: "9AM - 5PM",
        image: "https://images.unsplash.com/photo-1581093458791-9d4a34f65a1f?w=185&h=185&fit=crop",
        type: "service",
        rating: 4.8
      }
    ];
    return baseServices;
  };

  const generateUrgentListingsData = () => {
    const baseUrgent = [
      {
        id: 1,
        title: "Textbooks - Final Year Collection Complete Set",
        condition: "Like New",
        price: 2500,
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=185&h=185&fit=crop",
        type: "urgent",
        urgency: "high"
      },
      {
        id: 2,
        title: "Scientific Calculator & Math Tools Bundle",
        condition: "Good",
        price: 5000,
        image: "https://images.unsplash.com/photo-1581093458791-9d4a34f65a1f?w=185&h=185&fit=crop",
        type: "urgent",
        urgency: "medium"
      },
      {
        id: 3,
        title: "Room Heater & Winter Essentials Pack",
        condition: "Excellent",
        price: 8000,
        image: "https://images.unsplash.com/photo-1581093458791-9d4a34f65a1f?w=185&h=185&fit=crop",
        type: "urgent",
        urgency: "high"
      },
      {
        id: 4,
        title: "Chemistry Lab Coat & Safety Equipment",
        condition: "New",
        price: 3500,
        image: "https://images.unsplash.com/photo-1581093458791-9d4a34f65a1f?w=185&h=185&fit=crop",
        type: "urgent",
        urgency: "medium"
      },
      {
        id: 5,
        title: "Graduation Gown & Cap Set",
        condition: "Like New",
        price: 4000,
        image: "https://images.unsplash.com/photo-1581093458791-9d4a34f65a1f?w=185&h=185&fit=crop",
        type: "urgent",
        urgency: "high"
      },
      {
        id: 6,
        title: "Mini Fridge & Cooler Combo",
        condition: "Good",
        price: 12000,
        image: "https://images.unsplash.com/photo-1581093458791-9d4a34f65a1f?w=185&h=185&fit=crop",
        type: "urgent",
        urgency: "medium"
      },
      {
        id: 7,
        title: "Study Desk & Chair Set",
        condition: "Excellent",
        price: 15000,
        image: "https://images.unsplash.com/photo-1581093458791-9d4a34f65a1f?w=185&h=185&fit=crop",
        type: "urgent",
        urgency: "high"
      },
      {
        id: 8,
        title: "Electrical Engineering Toolkit",
        condition: "New",
        price: 7500,
        image: "https://images.unsplash.com/photo-1581093458791-9d4a34f65a1f?w=185&h=185&fit=crop",
        type: "urgent",
        urgency: "medium"
      },
      {
        id: 9,
        title: "Bed & Mattress Combo - Moving Out Sale",
        condition: "Good",
        price: 20000,
        image: "https://images.unsplash.com/photo-1581093458791-9d4a34f65a1f?w=185&h=185&fit=crop",
        type: "urgent",
        urgency: "high"
      },
      {
        id: 10,
        title: "Cooking Stove & Utensils Set",
        condition: "Excellent",
        price: 9000,
        image: "https://images.unsplash.com/photo-1581093458791-9d4a34f65a1f?w=185&h=185&fit=crop",
        type: "urgent",
        urgency: "medium"
      },
      {
        id: 11,
        title: "Art Supplies & Painting Kit",
        condition: "Like New",
        price: 6000,
        image: "https://images.unsplash.com/photo-1581093458791-9d4a34f65a1f?w=185&h=185&fit=crop",
        type: "urgent",
        urgency: "high"
      },
      {
        id: 12,
        title: "Sports Equipment & Gym Gear",
        condition: "Good",
        price: 11000,
        image: "https://images.unsplash.com/photo-1581093458791-9d4a34f65a1f?w=185&h=185&fit=crop",
        type: "urgent",
        urgency: "medium"
      },
      {
        id: 13,
        title: "Digital Camera & Photography Kit",
        condition: "Excellent",
        price: 25000,
        image: "https://images.unsplash.com/photo-1581093458791-9d4a34f65a1f?w=185&h=185&fit=crop",
        type: "urgent",
        urgency: "high"
      },
      {
        id: 14,
        title: "Musical Instruments Collection",
        condition: "Like New",
        price: 18000,
        image: "https://images.unsplash.com/photo-1581093458791-9d4a34f65a1f?w=185&h=185&fit=crop",
        type: "urgent",
        urgency: "medium"
      }
    ];
    return baseUrgent;
  };

  const generatePremiumListingsData = () => {
    const basePremium = [
      {
        id: 1,
        title: "MacBook Pro 2023 M2 Chip 16GB RAM",
        condition: "Brand New",
        price: 450000,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=185&h=185&fit=crop",
        type: "premium",
        featured: true
      },
      {
        id: 2,
        title: "Designer Handbag Luxury Collection",
        condition: "Excellent",
        price: 25000,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=185&h=185&fit=crop",
        type: "premium",
        featured: true
      },
      {
        id: 3,
        title: "Gaming Console & Accessories Bundle",
        condition: "Like New",
        price: 35000,
        image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=185&h=185&fit=crop",
        type: "premium",
        featured: true
      },
      {
        id: 4,
        title: "Smart Watch Series 8 Latest Model",
        condition: "Brand New",
        price: 15000,
        image: "https://images.unsplash.com/photo-1579586337278-3fbd766d2b3a?w=185&h=185&fit=crop",
        type: "premium",
        featured: true
      },
      {
        id: 5,
        title: "Professional DSLR Camera Kit",
        condition: "Excellent",
        price: 120000,
        image: "https://images.unsplash.com/photo-1581093458791-9d4a34f65a1f?w=185&h=185&fit=crop",
        type: "premium",
        featured: true
      },
      {
        id: 6,
        title: "Designer Sunglasses & Eyewear",
        condition: "New",
        price: 18000,
        image: "https://images.unsplash.com/photo-1581093458791-9d4a34f65a1f?w=185&h=185&fit=crop",
        type: "premium",
        featured: true
      },
      {
        id: 7,
        title: "Wireless Headphones Premium Edition",
        condition: "Like New",
        price: 22000,
        image: "https://images.unsplash.com/photo-1581093458791-9d4a34f65a1f?w=185&h=185&fit=crop",
        type: "premium",
        featured: true
      },
      {
        id: 8,
        title: "Luxury Watch & Timepiece Collection",
        condition: "Excellent",
        price: 75000,
        image: "https://images.unsplash.com/photo-1581093458791-9d4a34f65a1f?w=185&h=185&fit=crop",
        type: "premium",
        featured: true
      },
      {
        id: 9,
        title: "Gaming Laptop High Performance",
        condition: "Brand New",
        price: 280000,
        image: "https://images.unsplash.com/photo-1581093458791-9d4a34f65a1f?w=185&h=185&fit=crop",
        type: "premium",
        featured: true
      },
      {
        id: 10,
        title: "Designer Shoes & Footwear Set",
        condition: "New",
        price: 32000,
        image: "https://images.unsplash.com/photo-1581093458791-9d4a34f65a1f?w=185&h=185&fit=crop",
        type: "premium",
        featured: true
      },
      {
        id: 11,
        title: "Smart Home Devices Bundle",
        condition: "Like New",
        price: 45000,
        image: "https://images.unsplash.com/photo-1581093458791-9d4a34f65a1f?w=185&h=185&fit=crop",
        type: "premium",
        featured: true
      },
      {
        id: 12,
        title: "Premium Sound System & Speakers",
        condition: "Excellent",
        price: 68000,
        image: "https://images.unsplash.com/photo-1581093458791-9d4a34f65a1f?w=185&h=185&fit=crop",
        type: "premium",
        featured: true
      },
      {
        id: 13,
        title: "Luxury Perfume & Fragrance Set",
        condition: "New",
        price: 25000,
        image: "https://images.unsplash.com/photo-1581093458791-9d4a34f65a1f?w=185&h=185&fit=crop",
        type: "premium",
        featured: true
      },
      {
        id: 14,
        title: "Designer Jewelry & Accessories",
        condition: "Brand New",
        price: 55000,
        image: "https://images.unsplash.com/photo-1581093458791-9d4a34f65a1f?w=185&h=185&fit=crop",
        type: "premium",
        featured: true
      }
    ];
    return basePremium;
  };

  const servicesData = generateServicesData();
  const urgentListingsData = generateUrgentListingsData();
  const premiumListingsData = generatePremiumListingsData();

  // Filter data based on search and filters
  const filterData = (data) => {
    return data.filter(item => {
      const matchesSearch = !searchQuery || 
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.businessName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.ownerName?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPrice = (!minPrice || item.price >= parseInt(minPrice)) && 
                          (!maxPrice || item.price <= parseInt(maxPrice));

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
          src={service.image} 
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
            <span>{service.workingHours}</span>
          </div>
        </div>

        <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 text-xs sm:text-sm">
          View Service
        </button>
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
          src={product.image} 
          alt={product.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
            type === 'urgent' ? 'bg-red-500 text-white' : 'bg-yellow-500 text-gray-800'
          }`}>
            {type === 'urgent' ? 'Urgent' : 'Premium'}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-sm sm:text-base md:text-lg text-gray-800 mb-2 line-clamp-2 leading-tight">
          {product.title}
        </h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
            <FiGrid className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Condition: {product.condition}</span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
            <FiDollarSign className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="font-bold text-green-600">₦{product.price.toLocaleString()}</span>
          </div>
        </div>

        <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 text-xs sm:text-sm">
          View Details
        </button>
      </div>
    </motion.div>
  );

  const renderSection = (title, data, displayedData, renderCard, type, totalCount) => (
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
        {displayedData.length > 0 ? (
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
      {data.length > 12 && displayedData.length < data.length && (
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
                  filteredServices.length
                )}

                {/* Premium Listings Section */}
                {renderSection(
                  "Premium Listings", 
                  filteredPremium, 
                  displayedPremium, 
                  renderProductCard, 
                  "premium",
                  filteredPremium.length
                )}

                {/* Urgent Listings Section */}
                {renderSection(
                  "Urgent Listings", 
                  filteredUrgent, 
                  displayedUrgent, 
                  renderProductCard, 
                  "urgent",
                  filteredUrgent.length
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
                  filteredServices.length
                )}
                {selectedCategory === 'urgent' && renderSection(
                  "Urgent Listings", 
                  filteredUrgent, 
                  displayedUrgent, 
                  renderProductCard, 
                  "urgent",
                  filteredUrgent.length
                )}
                {selectedCategory === 'premium' && renderSection(
                  "Premium Listings", 
                  filteredPremium, 
                  displayedPremium, 
                  renderProductCard, 
                  "premium",
                  filteredPremium.length
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