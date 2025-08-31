import { useEffect, useRef, useState } from 'react';
import { FiShoppingBag, FiSearch, FiFilter, FiPlus, FiFrown, FiMeh, FiSmile, FiStar, FiClock, FiRefreshCw } from 'react-icons/fi';
import AdvertisementBanner from './Advertisment';
import ReportButton from './ReportButton';
import axios from 'axios';
import { motion } from 'framer-motion';
import PremiumListingsSection from './PremiumListingsSection';
import UrgentListingsSection from './UrgentListingsSection';
import RecurringServicesSection from './RecurringServicesSection';
import { Link } from 'react-router-dom';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: 'spring', 
      stiffness: 120 
    } 
  }
};

const cardHoverVariants = {
  hover: { 
    y: -8,
    transition: { 
      type: 'spring', 
      stiffness: 400 
    }
  }
};

// Custom Empty State Component
const EmptyState = ({ type = "general", onAction }) => {
  const emptyStateConfig = {
    general: {
      icon: <FiFrown className="text-4xl text-indigo-600" />,
      title: "No Listings Available",
      description: "There are currently no listings in the marketplace. Be the first to create a listing!",
    },
    premium: {
      icon: <FiStar className="text-4xl text-amber-500" />,
      title: "No Premium Listings",
      description: "There are no premium listings at the moment. Premium listings get 3x more visibility!",
    },
    urgent: {
      icon: <FiClock className="text-4xl text-red-500" />,
      title: "No Urgent Listings",
      description: "No urgent listings available right now. Urgent listings are highlighted for quick sales.",
    },
    services: {
      icon: <FiRefreshCw className="text-4xl text-green-500" />,
      title: "No Services Available",
      description: "There are no recurring services listed currently. Services help you earn regularly!",
    }
  };

  const config = emptyStateConfig[type];

  return (
    <motion.div 
      className="max-w-2xl mx-auto my-16 text-center bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-center mb-6">
        <div className="p-4 bg-indigo-100 rounded-full">
          {config.icon}
        </div>
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-3">{config.title}</h2>
      <p className="text-gray-600 mb-6">{config.description}</p>
    </motion.div>
  );
};

function Marketplace() {
  const premiumSliderRef = useRef(null);
  const urgentSliderRef = useRef(null);
  const servicesSliderRef = useRef(null);

  // State for API data
  const [vipListings, setVipListings] = useState([]);
  const [proListings, setProListings] = useState([]);
  const [normalListings, setNormalListings] = useState([]);
  const [loading, setLoading] = useState({
    vip: true,
    pro: true,
    normal: true
  });
  const [error, setError] = useState({
    vip: null,
    pro: null,
    normal: null
  });

  // Fetch data from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch VIP listings
        const vipResponse = await axios.get('https://campus-plum.vercel.app/api/vip-listings/');
        setVipListings(vipResponse.data);
        setLoading(prev => ({ ...prev, vip: false }));
        
        // Fetch Pro listings
        const proResponse = await axios.get('https://campus-plum.vercel.app/api/pro-listings/');
        setProListings(proResponse.data);
        setLoading(prev => ({ ...prev, pro: false }));
        
        // Fetch Normal listings
        const normalResponse = await axios.get('https://campus-plum.vercel.app/api/listings/');
        setNormalListings(normalResponse.data);
        setLoading(prev => ({ ...prev, normal: false }));
        console.log(normalListings)
      } catch (err) {
        setError({
          vip: 'Failed to load VIP listings',
          pro: 'Failed to load Pro listings',
          normal: 'Failed to load Normal listings'
        });
        setLoading({ vip: false, pro: false, normal: false });
        console.error('API Error:', err);
      }
    };

    fetchData();
  }, []);

  // Generate urgent listings from normal listings
  const urgentListings = normalListings
    .filter(item => item.urgency === 'urgent' || item.urgency === 'high')
    .slice(0, 10);

  // Slider scroll functionality
  const scrollSlider = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = ref.current.offsetWidth * 0.8;
      ref.current.scrollBy({
        left: direction === 'next' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Loading skeleton for cards
  const renderLoadingSkeleton = (count = 4) => {
    return Array.from({ length: count }).map((_, index) => (
      <motion.div 
        key={index}
        variants={itemVariants}
        className="flex-shrink-0 w-72 bg-white rounded-2xl p-4 shadow-lg border border-gray-100"
      >
        <div className="animate-pulse">
          <div className="bg-gray-200 rounded-xl aspect-square mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-10 bg-gray-200 rounded-lg"></div>
        </div>
      </motion.div>
    ));
  };

  // Check if all listings are empty
  const allListingsEmpty = 
    !loading.vip && !loading.pro && !loading.normal &&
    vipListings.length === 0 && 
    proListings.length === 0 && 
    normalListings.length === 0;

 


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      {/* Header Section */}
      <motion.div 
        className="text-center pt-8 pb-6 px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-4">
          Campus Marketplace
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Discover amazing products and services from fellow students. Buy fast, sell faster!
        </p>
      </motion.div>

      <AdvertisementBanner/>

      {/* Empty State for entire marketplace */}
      {allListingsEmpty && !error.vip && !error.pro && !error.normal && (
        <EmptyState 
          type="general"
        />
      )}

      {/* Premium Listings Section */}
      {vipListings.length > 0 || loading.vip ? (
        <PremiumListingsSection
          listings={vipListings}
          loading={loading.vip}
          error={error.vip}
          sliderRef={premiumSliderRef}
          scrollSlider={scrollSlider}
          renderLoadingSkeleton={renderLoadingSkeleton}
        />
      ) : (
        <motion.section 
          className="max-w-7xl mx-auto py-12 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <EmptyState 
            type="premium"
          />
        </motion.section>
      )}

      {/* Urgent Listings Section */}
      {urgentListings.length > 0 || loading.normal ? (
        <UrgentListingsSection
          listings={urgentListings}
          loading={loading.normal}
          error={error.normal}
          sliderRef={urgentSliderRef}
          scrollSlider={scrollSlider}
          renderLoadingSkeleton={renderLoadingSkeleton}
        />
      ) : (
        <motion.section 
          className="max-w-7xl mx-auto py-12 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <EmptyState 
            type="urgent"
          />
        </motion.section>
      )}

      {/* Report Button */}
      <ReportButton />

      {/* Recurring Services Section */}
      {proListings.length > 0 || loading.pro ? (
        <RecurringServicesSection
          listings={proListings}
          loading={loading.pro}
          error={error.pro}
          sliderRef={servicesSliderRef}
          scrollSlider={scrollSlider}
          renderLoadingSkeleton={renderLoadingSkeleton}
        />
      ) : (
        <motion.section 
          className="max-w-7xl mx-auto py-12 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <EmptyState 
            type="services"
          />
        </motion.section>
      )}

      {/* Call to Action */}
      <motion.section 
        className="max-w-6xl mx-auto py-16 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl p-10 text-center text-white shadow-xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to start trading?</h2>
          <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
            Join thousands of students buying and selling on our secure campus marketplace
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            
            <Link to="/publish">
            <button 
              className="px-8 py-3 bg-indigo-800 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors border border-indigo-500"
            >
              Create Listing
            </button>
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default Marketplace;