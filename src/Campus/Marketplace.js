import { useEffect, useRef, useState } from 'react';
import { FiSearch, FiFilter, FiTrendingUp, FiClock, FiRepeat, FiArrowRight } from 'react-icons/fi';
import { MdLocalOffer, MdWhatshot } from 'react-icons/md';
import AdvertisementBanner from './Advertisment';
import ReportButton from './ReportButton';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Import your sections
import PremiumListingsSection from './PremiumListingsSection';
import UrgentListingsSection from './UrgentListingsSection';
import RecurringServicesSection from './RecurringServicesSection';

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

// Enhanced Empty State Component
const EmptyState = ({ type = "general" }) => {
  const emptyStateConfig = {
    general: {
      icon: "📦",
      title: "No Listings Available",
      description: "Check back later for new listings or try adjusting your filters.",
      gradient: "from-purple-100 to-pink-100",
      iconColor: "text-purple-500"
    },
    premium: {
      icon: "⭐",
      title: "No Premium Listings",
      description: "Premium listings will appear here when available.",
      gradient: "from-yellow-100 to-orange-100",
      iconColor: "text-yellow-500"
    },
    urgent: {
      icon: "⚡",
      title: "No Urgent Listings",
      description: "No urgent listings available at the moment.",
      gradient: "from-red-100 to-pink-100",
      iconColor: "text-red-500"
    },
    services: {
      icon: "🔄",
      title: "No Services Available",
      description: "Recurring services will appear here when posted.",
      gradient: "from-green-100 to-blue-100",
      iconColor: "text-green-500"
    }
  };

  const config = emptyStateConfig[type];

  return (
    <motion.div
      className={`max-w-md mx-auto my-12 text-center bg-white rounded-3xl p-8 shadow-xl border border-gray-100 backdrop-blur-sm bg-opacity-90`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
    >
      <div className={`text-6xl mb-6 ${config.iconColor} drop-shadow-sm`}>
        {config.icon}
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-3">{config.title}</h2>
      <p className="text-gray-600 mb-2">{config.description}</p>
      <div className="mt-6 h-2 w-20 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-full mx-auto"></div>
    </motion.div>
  );
};

// Loading Skeleton Component
const LoadingSkeleton = () => (
  <div className="max-w-6xl mx-auto px-4 py-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1 }}
        >
          <div className="animate-pulse">
            <div className="h-40 bg-gray-200 rounded-xl mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="flex justify-between items-center">
              <div className="h-6 bg-gray-200 rounded w-20"></div>
              <div className="h-8 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

// View All Button Component
const ViewAllButton = ({ category, count, onClick }) => (
  <motion.div 
    className="flex justify-center mt-8 mb-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 }}
  >
    <motion.button
      onClick={onClick}
      className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:from-indigo-600 hover:to-blue-600 transform hover:-translate-y-1"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative z-10">View All {category} ({count})</span>
      <FiArrowRight className="w-5 h-5 relative z-10 transform group-hover:translate-x-1 transition-transform" />
      
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Shine effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
    </motion.button>
  </motion.div>
);

function Marketplace() {
  const premiumSliderRef = useRef(null);
  const urgentSliderRef = useRef(null);
  const servicesSliderRef = useRef(null);
  const navigate = useNavigate();

  // API data states
  const [vipListings, setVipListings] = useState([]);
  const [proListings, setProListings] = useState([]);
  const [normalListings, setNormalListings] = useState([]);

  const [loading, setLoading] = useState({ vip: true, pro: true, normal: true });
  const [error, setError] = useState({ vip: null, pro: null, normal: null });

  // 🔎 Search + Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Fetch listings
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vipResponse, proResponse, normalResponse] = await Promise.all([
          axios.get('https://campus-plum.vercel.app/api/pro-listings/'),
          axios.get('https://campus-plum.vercel.app/api/vip-listings/'),
          axios.get('https://campus-plum.vercel.app/api/listings/')
        ]);

        setVipListings(vipResponse.data);
        setProListings(proResponse.data);
        setNormalListings(normalResponse.data);
        
        setLoading({ vip: false, pro: false, normal: false });
      } catch (err) {
        setError({
          vip: 'Failed to load VIP listings',
          pro: 'Failed to load Pro listings',
          normal: 'Failed to load Normal listings'
        });
        setLoading({ vip: false, pro: false, normal: false });
      }
    };

    fetchData();
  }, []);

  // ✅ Filter function
  const filterListings = (listings, type) => {
    return listings.filter(item => {
      const matchesSearch =
        item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = !filterCategory || filterCategory === type;

      return matchesSearch && matchesCategory;
    });
  };

  const filteredVip = filterListings(vipListings, 'premium');
  const filteredPro = filterListings(proListings, 'services');
  const filteredNormal = filterListings(normalListings, 'urgent');

  // Quick filter buttons
  const quickFilters = [
    { value: '', label: 'All', icon: MdLocalOffer, count: filteredVip.length + filteredPro.length + filteredNormal.length },
    { value: 'premium', label: 'Premium', icon: FiTrendingUp, count: filteredVip.length },
    { value: 'urgent', label: 'Urgent', icon: FiClock, count: filteredNormal.length },
    { value: 'services', label: 'Services', icon: FiRepeat, count: filteredPro.length },
  ];

  // View All handlers
  const handleViewAllPremium = () => {
    navigate('/premium-listings', { 
      state: { 
        listings: filteredVip,
        title: 'All Premium Listings',
        description: 'Explore all premium campus listings'
      }
    });
  };

  const handleViewAllUrgent = () => {
    navigate('/urgent-listings', { 
      state: { 
        listings: filteredNormal,
        title: 'All Urgent Listings',
        description: 'Browse all urgent campus listings'
      }
    });
  };

  const handleViewAllServices = () => {
    navigate('/services-listings', { 
      state: { 
        listings: filteredPro,
        title: 'All Service Listings',
        description: 'Discover all recurring services'
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Enhanced Header */}
      <motion.div
        className="relative text-center pt-16 pb-8 px-4 overflow-hidden"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-1/2 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative z-10">
          <motion.h1 
            className="text-5xl md:text-6xl font-black bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Campus Marketplace
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Discover amazing products and services from your campus community. 
            <span className="block text-indigo-500 font-medium mt-1">Buy smart, sell faster!</span>
          </motion.p>
        </div>
      </motion.div>

      {/* Enhanced Search & Filter Section */}
      <motion.div 
        className="max-w-6xl mx-auto px-4 mb-8"
        variants={fadeInUp}
        initial="hidden"
        animate="show"
      >
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 p-6">
          {/* Search Bar */}
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search listings, services, products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl border border-gray-200/60 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-white/50 backdrop-blur-sm"
            />
          </div>

          {/* Quick Filter Buttons */}
          <div className="flex flex-wrap gap-3 mb-4">
            {quickFilters.map((filter) => (
              <motion.button
                key={filter.value}
                onClick={() => setFilterCategory(filter.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                  filterCategory === filter.value
                    ? 'bg-indigo-500 text-white border-indigo-500 shadow-lg shadow-indigo-200'
                    : 'bg-white/60 text-gray-700 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <filter.icon className="w-4 h-4" />
                <span className="font-medium">{filter.label}</span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  filterCategory === filter.value 
                    ? 'bg-white/20 text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {filter.count}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Advanced Filters Toggle */}
          <motion.div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          >
            <div className="flex items-center gap-2 text-gray-600">
              <FiFilter className="w-4 h-4" />
              <span className="font-medium">Advanced Filters</span>
            </div>
            <motion.div
              animate={{ rotate: isFiltersOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.div>
          </motion.div>

          <AnimatePresence>
            {isFiltersOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-gray-100"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                    <div className="flex gap-2">
                      <input type="number" placeholder="Min" className="flex-1 px-3 py-2 border border-gray-200 rounded-lg" />
                      <input type="number" placeholder="Max" className="flex-1 px-3 py-2 border border-gray-200 rounded-lg" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg">
                      <option>Newest First</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input type="text" placeholder="Campus area" className="w-full px-3 py-2 border border-gray-200 rounded-lg" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Banner */}
      <motion.div 
        className="max-w-6xl mx-auto px-4 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <AdvertisementBanner />
      </motion.div>

      {/* Loading State */}
      {(loading.vip || loading.pro || loading.normal) && <LoadingSkeleton />}

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto space-y-16 pb-16">
        {/* Premium Listings Section */}
        <AnimatePresence mode="wait">
          {filteredVip.length > 0 || loading.vip ? (
            <motion.section
              key="premium"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              <PremiumListingsSection
                listings={filteredVip}
                loading={loading.vip}
                error={error.vip}
                sliderRef={premiumSliderRef}
                scrollSlider={() => {}}
                renderLoadingSkeleton={() => {}}
              />
              {/* View All Button for Premium Listings */}
              {!loading.vip && filteredVip.length > 0 && (
                <ViewAllButton 
                  category="Premium Listings" 
                  count={filteredVip.length}
                  onClick={handleViewAllPremium}
                />
              )}
            </motion.section>
          ) : (
            !loading.vip && (
              <motion.div
                key="premium-empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <EmptyState type="premium" />
              </motion.div>
            )
          )}
        </AnimatePresence>

        {/* Urgent Listings Section */}
        <AnimatePresence mode="wait">
          {filteredNormal.length > 0 || loading.normal ? (
            <motion.section
              key="urgent"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <UrgentListingsSection
                listings={filteredNormal}
                loading={loading.normal}
                error={error.normal}
                sliderRef={urgentSliderRef}
                scrollSlider={() => {}}
                renderLoadingSkeleton={() => {}}
              />
              {/* View All Button for Urgent Listings */}
              {!loading.normal && filteredNormal.length > 0 && (
                <ViewAllButton 
                  category="Urgent Listings" 
                  count={filteredNormal.length}
                  onClick={handleViewAllUrgent}
                />
              )}
            </motion.section>
          ) : (
            !loading.normal && (
              <motion.div
                key="urgent-empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <EmptyState type="urgent" />
              </motion.div>
            )
          )}
        </AnimatePresence>

        {/* Recurring Services Section */}
        <AnimatePresence mode="wait">
          {filteredPro.length > 0 || loading.pro ? (
            <motion.section
              key="services"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <RecurringServicesSection
                listings={filteredPro}
                loading={loading.pro}
                error={error.pro}
                sliderRef={servicesSliderRef}
                scrollSlider={() => {}}
                renderLoadingSkeleton={() => {}}
              />
              {/* View All Button for Services Listings */}
              {!loading.pro && filteredPro.length > 0 && (
                <ViewAllButton 
                  category="Services" 
                  count={filteredPro.length}
                  onClick={handleViewAllServices}
                />
              )}
            </motion.section>
          ) : (
            !loading.pro && (
              <motion.div
                key="services-empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <EmptyState type="services" />
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>

      {/* Floating Action Button */}
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <ReportButton />
      </motion.div>

      {/* Add custom animations to tailwind config */}
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
      `}</style>
    </div>
  );
}

export default Marketplace;