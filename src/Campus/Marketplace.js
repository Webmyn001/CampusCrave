import { useEffect, useRef, useState } from 'react';
import { FiSearch, FiFilter, FiTrendingUp, FiClock, FiRepeat, FiArrowRight, FiStar, FiHeart, FiEye, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { MdLocalOffer, MdWhatshot } from 'react-icons/md';
import AdvertisementBanner from './Advertisment';
import ReportButton from './ReportButton';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Enhanced animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12
    }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const cardHoverVariants = {
  initial: { scale: 1, y: 0 },
  hover: { 
    scale: 1.02, 
    y: -8,
    transition: { type: "spring", stiffness: 300, damping: 20 }
  }
};

// Enhanced Card Component
const ListingCard = ({ item, type, index }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();

  const getTypeConfig = (type) => {
    const configs = {
      premium: {
        gradient: 'from-amber-500 to-orange-500',
        bgGradient: 'from-amber-50 to-orange-50',
        border: 'border-amber-300',
        badge: '⭐ Premium',
        icon: FiStar,
        textColor: 'text-amber-700'
      },
      urgent: {
        gradient: 'from-rose-500 to-pink-600',
        bgGradient: 'from-rose-50 to-pink-50',
        border: 'border-rose-300',
        badge: '⚡ Urgent',
        icon: MdWhatshot,
        textColor: 'text-rose-700'
      },
      services: {
        gradient: 'from-blue-500 to-cyan-600',
        bgGradient: 'from-blue-50 to-cyan-50',
        border: 'border-blue-300',
        badge: '🔄 Business',
        icon: FiRepeat,
        textColor: 'text-blue-700'
      }
    };
    return configs[type] || configs.premium;
  };

  const config = getTypeConfig(type);
  const displayTitle = type === 'services' ? item.businessName : item.title;
  const displayCondition = type === 'services' ? item.workingHours : item.condition;
  const hasPrice = type !== 'services';

  return (
    <motion.div
      variants={cardHoverVariants}
      initial="initial"
      whileHover="hover"
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden flex-shrink-0 w-80 mx-2"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <div className="relative h-48 overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <motion.img
            src={item.images?.[0]?.url || `https://picsum.photos/400/300?random=${item._id}`}
            alt={displayTitle}
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: imageLoaded ? 1 : 0, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Type Badge */}
          <motion.div 
            className="absolute top-4 left-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className={`px-3 py-1.5 text-xs font-bold text-white rounded-full bg-gradient-to-r ${config.gradient} shadow-lg backdrop-blur-sm`}>
              {config.badge}
            </span>
          </motion.div>

          {/* Like Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsLiked(!isLiked)}
            className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <FiHeart 
              className={`w-4 h-4 transition-colors duration-300 ${
                isLiked ? 'text-rose-500 fill-rose-500' : 'text-gray-600'
              }`} 
            />
          </motion.button>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Title Section */}
        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <FiEye className="w-4 h-4" />
            <span>Featured Listing</span>
          </div>
          <h3 className="font-bold text-gray-900 text-lg leading-tight line-clamp-2 group-hover:text-indigo-600 transition-colors duration-300">
            {displayTitle || 'No title available'}
          </h3>
        </motion.div>

        {/* Condition/Working Hours */}
        <motion.div 
          className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className={`p-2 rounded-lg bg-gradient-to-r ${config.gradient} text-white`}>
            <config.icon className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-500 capitalize">
              {hasPrice ? "Condition" : "Working Hours"}
            </p>
            <p className="text-sm text-gray-700 font-medium truncate">
              {displayCondition || (hasPrice ? "No condition available" : "No working hours available")}
            </p>
          </div>
        </motion.div>

        {/* Price & Action Button */}
        <motion.div 
          className="flex items-center justify-between pt-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {hasPrice ? (
            <>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 font-medium">Starting Price</span>
                <p className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  ₦{item.price ? Number(item.price).toLocaleString() : '0'}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05, x: 2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(`/listing/${item._id}`, { state: { item } })}
                className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold text-sm hover:shadow-lg transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-indigo-200"
              >
                View Details
                <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </>
          ) : (
            <div className="w-full flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05, x: 2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(`/business/${item._id}`, { state: { item } })}
                className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold text-sm hover:shadow-lg transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-indigo-200"
              >
                View Service
                <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>

      {/* Hover Effect Border */}
      <div className={`absolute inset-0 rounded-3xl border-2 ${config.border} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
    </motion.div>
  );
};

// Enhanced Horizontal Scroll Section
const HorizontalScrollSection = ({ title, description, icon: Icon, listings, type, onViewAll, loading }) => {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 330;
      const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });

      setTimeout(updateArrowVisibility, 300);
    }
  };

  const updateArrowVisibility = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    updateArrowVisibility();
    window.addEventListener('resize', updateArrowVisibility);
    return () => window.removeEventListener('resize', updateArrowVisibility);
  }, [listings]);

  if (loading) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-20"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl w-48 mb-3 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded-xl w-64 animate-pulse"></div>
            </div>
            <div className="h-12 bg-gray-200 rounded-2xl w-32 animate-pulse"></div>
          </div>
          <div className="flex gap-6 overflow-hidden">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex-shrink-0 w-80 bg-white rounded-3xl p-6 shadow-lg border border-gray-100 animate-pulse">
                <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl mb-4"></div>
                <div className="h-4 bg-gray-200 rounded-xl w-3/4 mb-3"></div>
                <div className="h-3 bg-gray-200 rounded-xl w-1/2 mb-4"></div>
                <div className="flex justify-between items-center">
                  <div className="h-6 bg-gray-200 rounded-xl w-20"></div>
                  <div className="h-10 bg-gray-200 rounded-xl w-24"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    );
  }

  if (!listings || listings.length === 0) {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="mb-20 relative"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Enhanced Section Header */}
        <motion.div 
          className="flex items-center justify-between mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-3">
              <motion.div 
                className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl text-white shadow-lg shadow-indigo-200"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Icon className="w-7 h-7" />
              </motion.div>
              <div>
                <h2 className="text-4xl font-black bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  {title}
                </h2>
                <p className="text-gray-600 text-lg mt-2 max-w-2xl">{description}</p>
              </div>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={onViewAll}
            className="hidden lg:flex items-center gap-3 px-6 py-3 bg-white text-indigo-600 font-semibold rounded-2xl border-2 border-indigo-100 hover:border-indigo-200 hover:bg-indigo-50 transition-all duration-300 shadow-md hover:shadow-lg group"
          >
            <span>View All</span>
            <span className="px-2 py-1 bg-indigo-100 text-indigo-600 rounded-lg text-sm font-bold">
              {listings.length}
            </span>
            <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.button>
        </motion.div>

        {/* Enhanced Scroll Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <AnimatePresence>
            {showLeftArrow && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8, x: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: -10 }}
                onClick={() => scroll('left')}
                className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/95 backdrop-blur-md border border-gray-200 rounded-2xl p-4 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 hover:border-indigo-300 group"
                whileHover={{ backgroundColor: "rgba(255,255,255,1)" }}
              >
                <FiChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-indigo-600 transition-colors" />
              </motion.button>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showRightArrow && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8, x: 10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: 10 }}
                onClick={() => scroll('right')}
                className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/95 backdrop-blur-md border border-gray-200 rounded-2xl p-4 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 hover:border-indigo-300 group"
                whileHover={{ backgroundColor: "rgba(255,255,255,1)" }}
              >
                <FiChevronRight className="w-6 h-6 text-gray-700 group-hover:text-indigo-600 transition-colors" />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Scrollable Cards */}
          <div
            ref={scrollContainerRef}
            onScroll={updateArrowVisibility}
            className="flex overflow-x-auto scrollbar-hide gap-8 pb-8 -mx-4 px-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {listings.map((item, index) => (
              <ListingCard
                key={item._id}
                item={item}
                type={type}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Mobile View All Button */}
        <div className="flex justify-center mt-8 lg:hidden">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onViewAll}
            className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3"
          >
            View All {title}
            <span className="px-3 py-1 bg-white/20 rounded-lg text-sm font-bold">
              {listings.length}
            </span>
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
};

// Enhanced Empty State Component
const EmptyState = ({ type = "general" }) => {
  const emptyStateConfig = {
    general: {
      icon: "📦",
      title: "No Listings Available",
      description: "Check back later for new listings or try adjusting your filters.",
      gradient: "from-purple-100 to-pink-100",
      iconColor: "text-purple-500",
      buttonText: "Browse All"
    },
    premium: {
      icon: "⭐",
      title: "No Premium Listings",
      description: "Premium listings will appear here when available. Be the first to post!",
      gradient: "from-amber-100 to-orange-100",
      iconColor: "text-amber-500",
      buttonText: "View Premium"
    },
    urgent: {
      icon: "⚡",
      title: "No Urgent Listings",
      description: "No urgent listings available at the moment. Check back soon!",
      gradient: "from-rose-100 to-pink-100",
      iconColor: "text-rose-500",
      buttonText: "See Urgent"
    },
    services: {
      icon: "🔄",
      title: "No Services Available",
      description: "Recurring services will appear here when posted by campus businesses.",
      gradient: "from-blue-100 to-cyan-100",
      iconColor: "text-blue-500",
      buttonText: "Explore Services"
    }
  };

  const config = emptyStateConfig[type];

  return (
    <motion.div
      className={`max-w-md mx-auto my-16 text-center bg-white rounded-3xl p-12 shadow-2xl border border-gray-100 backdrop-blur-sm bg-opacity-90`}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
    >
      <motion.div 
        className={`text-7xl mb-8 ${config.iconColor} drop-shadow-sm`}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        {config.icon}
      </motion.div>
      <h2 className="text-3xl font-black text-gray-800 mb-4 bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
        {config.title}
      </h2>
      <p className="text-gray-600 mb-8 text-lg leading-relaxed">{config.description}</p>
      <motion.div 
        className="h-1.5 w-24 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-full mx-auto mb-8"
        initial={{ width: 0 }}
        animate={{ width: 96 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      />
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {config.buttonText}
      </motion.button>
    </motion.div>
  );
};

function Marketplace() {
  const navigate = useNavigate();

  // API data states
  const [premiumListings, setPremiumListings] = useState([]);
  const [servicesListings, setServicesListings] = useState([]);
  const [urgentListings, setUrgentListings] = useState([]);

  const [loading, setLoading] = useState({ premium: true, services: true, urgent: true });
  const [error, setError] = useState({ premium: null, services: null, urgent: null });

  // Search & Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Fetch listings
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [premiumResponse, servicesResponse, urgentResponse] = await Promise.all([
          axios.get('https://campus-plum.vercel.app/api/pro-listings/'),
          axios.get('https://campus-plum.vercel.app/api/vip-listings/'),
          axios.get('https://campus-plum.vercel.app/api/listings/')
        ]);

        setPremiumListings(premiumResponse.data);
        setServicesListings(servicesResponse.data);
        setUrgentListings(urgentResponse.data);

        setLoading({ premium: false, services: false, urgent: false });
      } catch (err) {
        setError({
          premium: 'Failed to load Premium listings',
          services: 'Failed to load Services listings',
          urgent: 'Failed to load Urgent listings'
        });
        setLoading({ premium: false, services: false, urgent: false });
      }
    };

    fetchData();
  }, []);

  // Filter function
  const filterListings = (listings, type) => {
    if (!searchTerm && !filterCategory) return listings;
    
    return listings.filter(item => {
      const searchFields = type === 'services' 
        ? [item.businessName, item.workingHours]
        : [item.title, item.description];
      
      const matchesSearch = !searchTerm || searchFields.some(field => 
        field?.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const matchesCategory = !filterCategory || filterCategory === type;

      return matchesSearch && matchesCategory;
    });
  };

  const filteredPremium = filterListings(premiumListings, 'premium');
  const filteredServices = filterListings(servicesListings, 'services');
  const filteredUrgent = filterListings(urgentListings, 'urgent');

  // Quick filter buttons
  const quickFilters = [
    { value: '', label: 'All', icon: MdLocalOffer, count: filteredPremium.length + filteredServices.length + filteredUrgent.length },
    { value: 'premium', label: 'Premium', icon: FiTrendingUp, count: filteredPremium.length },
    { value: 'urgent', label: 'Urgent', icon: FiClock, count: filteredUrgent.length },
    { value: 'services', label: 'Services', icon: FiRepeat, count: filteredServices.length },
  ];

  // View All handlers
  const handleViewAllPremium = () => {
    navigate('/premium-listings', { 
      state: { 
        listings: filteredPremium,
        title: 'All Premium Listings',
        description: 'Explore all premium campus listings'
      }
    });
  };

  const handleViewAllUrgent = () => {
    navigate('/urgent-listings', { 
      state: { 
        listings: filteredUrgent,
        title: 'All Urgent Listings',
        description: 'Browse all urgent campus listings'
      }
    });
  };

  const handleViewAllServices = () => {
    navigate('/services-listings', { 
      state: { 
        listings: filteredServices,
        title: 'All Service Listings',
        description: 'Discover all recurring services'
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      {/* Enhanced Header */}
      <motion.div
        className="relative text-center pt-20 pb-12 px-4 overflow-hidden"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute -top-40 -right-32 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
            animate={{ 
              scale: [1, 1.1, 1],
              x: [0, 30, 0],
              y: [0, -20, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute -bottom-40 -left-32 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, -20, 0],
              y: [0, 30, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute top-40 left-1/2 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
            animate={{ 
              scale: [1, 1.15, 1],
              x: [0, 25, 0],
              y: [0, 25, 0]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        
        <div className="relative z-10">
          <motion.h1 
            className="text-5xl md:text-7xl font-black bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 tracking-tight"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Campus Marketplace
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Discover amazing products and services from your campus community. 
            <span className="block text-transparent bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text font-bold mt-2">
              Buy smart, sell faster, connect better!
            </span>
          </motion.p>
        </div>
      </motion.div>

      {/* Enhanced Search & Filter Section */}
      <motion.div 
        className="max-w-6xl mx-auto px-4 mb-12"
        variants={fadeInUp}
        initial="hidden"
        animate="show"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 p-8">
          {/* Search Bar */}
          <div className="relative mb-8">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <FiSearch className="h-6 w-6 text-indigo-400" />
            </div>
            <motion.input
              type="text"
              placeholder="Search listings, services, products, businesses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-5 text-lg rounded-2xl border-2 border-indigo-100/60 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100/50 transition-all duration-300 bg-white/70 backdrop-blur-sm placeholder-gray-400"
              whileFocus={{ scale: 1.01 }}
            />
          </div>

          {/* Quick Filter Buttons */}
          <div className="flex flex-wrap gap-3 mb-6">
            {quickFilters.map((filter) => (
              <motion.button
                key={filter.value}
                onClick={() => setFilterCategory(filter.value)}
                className={`flex items-center gap-3 px-6 py-4 rounded-2xl border-2 transition-all duration-300 font-semibold ${
                  filterCategory === filter.value
                    ? 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white border-transparent shadow-lg shadow-indigo-200'
                    : 'bg-white/60 text-gray-700 border-gray-200/80 hover:border-indigo-300 hover:bg-indigo-50/50 hover:shadow-md'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <filter.icon className="w-5 h-5" />
                <span>{filter.label}</span>
                <span className={`px-3 py-1.5 text-sm rounded-xl font-bold ${
                  filterCategory === filter.value 
                    ? 'bg-white/20 text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {filter.count}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Advanced Filters */}
          <motion.div 
            className="flex items-center justify-between cursor-pointer p-5 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-2xl hover:from-gray-100 hover:to-gray-200/50 transition-all duration-300 border border-gray-200/50"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            whileHover={{ y: -2 }}
          >
            <div className="flex items-center gap-4 text-gray-700">
              <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600">
                <FiFilter className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-lg">Advanced Filters</span>
                <p className="text-sm text-gray-500">Price range, location, categories & more</p>
              </div>
            </div>
            <motion.div
              animate={{ rotate: isFiltersOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="p-2 bg-white rounded-xl border border-gray-200"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.div>
          </motion.div>

          <AnimatePresence>
            {isFiltersOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="mt-6 pt-6 border-t border-gray-200/60"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">Price Range</label>
                    <div className="flex gap-3">
                      <input 
                        type="number" 
                        placeholder="Min ₦" 
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all bg-white/50" 
                      />
                      <input 
                        type="number" 
                        placeholder="Max ₦" 
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all bg-white/50" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">Sort By</label>
                    <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all bg-white/50">
                      <option>Newest First</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                      <option>Most Popular</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">Category</label>
                    <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all bg-white/50">
                      <option>All Categories</option>
                      <option>Electronics</option>
                      <option>Books</option>
                      <option>Furniture</option>
                      <option>Services</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Banner */}
      <motion.div 
        className="max-w-7xl mx-auto px-4 mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <AdvertisementBanner />
      </motion.div>

      {/* Main Content Sections */}
      <div className="max-w-7xl mx-auto space-y-24 pb-20">
        {/* Premium Listings Section */}
        <AnimatePresence mode="wait">
          {(filteredPremium.length > 0 || loading.premium) ? (
            <HorizontalScrollSection
              title="Premium Listings"
              description="Exclusive high-quality verified listings with premium features and top-notch quality"
              icon={FiStar}
              listings={filteredPremium}
              type="premium"
              onViewAll={handleViewAllPremium}
              loading={loading.premium}
            />
          ) : (
            !loading.premium && <EmptyState type="premium" />
          )}
        </AnimatePresence>

        {/* Urgent Listings Section */}
        <AnimatePresence mode="wait">
          {(filteredUrgent.length > 0 || loading.urgent) ? (
            <HorizontalScrollSection
              title="Urgent Listings"
              description="Quick sales and time-sensitive offers that need immediate attention"
              icon={MdWhatshot}
              listings={filteredUrgent}
              type="urgent"
              onViewAll={handleViewAllUrgent}
              loading={loading.urgent}
            />
          ) : (
            !loading.urgent && <EmptyState type="urgent" />
          )}
        </AnimatePresence>

        {/* Services Section */}
        <AnimatePresence mode="wait">
          {(filteredServices.length > 0 || loading.services) ? (
            <HorizontalScrollSection
              title="Campus Business & Services"
              description="Discover amazing student-run businesses and professional services near you"
              icon={FiRepeat}
              listings={filteredServices}
              type="services"
              onViewAll={handleViewAllServices}
              loading={loading.services}
            />
          ) : (
            !loading.services && <EmptyState type="services" />
          )}
        </AnimatePresence>
      </div>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default Marketplace;