import { useEffect, useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import AdvertisementBanner from './Advertisment';
import ReportButton from './ReportButton';
import axios from 'axios';
import { motion } from 'framer-motion';
import PremiumListingsSection from './PremiumListingsSection';
import UrgentListingsSection from './UrgentListingsSection';
import RecurringServicesSection from './RecurringServicesSection';

// Animation variants (kept as is in case you need later)
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

// Empty state UI
const EmptyState = ({ type = "general" }) => {
  const emptyStateConfig = {
    general: {
      icon: "📦",
      title: "No Listings Available",
      description: "There are currently no listings in the marketplace.",
    },
    premium: {
      icon: "🌟",
      title: "No Premium Listings",
      description: "There are no premium listings at the moment.",
    },
    urgent: {
      icon: "⏰",
      title: "No Urgent Listings",
      description: "No urgent listings available right now.",
    },
    services: {
      icon: "♻️",
      title: "No Services Available",
      description: "There are no recurring services listed currently.",
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
      <div className="text-5xl mb-4">{config.icon}</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-3">{config.title}</h2>
      <p className="text-gray-600 mb-6">{config.description}</p>
    </motion.div>
  );
};

function Marketplace() {
  const premiumSliderRef = useRef(null);
  const urgentSliderRef = useRef(null);
  const servicesSliderRef = useRef(null);

  // API data states
  const [vipListings, setVipListings] = useState([]);
  const [proListings, setProListings] = useState([]);
  const [normalListings, setNormalListings] = useState([]);

  const [loading, setLoading] = useState({ vip: true, pro: true, normal: true });
  const [error, setError] = useState({ vip: null, pro: null, normal: null });

  // 🔎 Search + Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  // Fetch listings
  useEffect(() => {
    const fetchData = async () => {
      try {
        const vipResponse = await axios.get('https://campus-plum.vercel.app/api/pro-listings/');
        setVipListings(vipResponse.data);
        setLoading(prev => ({ ...prev, vip: false }));

        const proResponse = await axios.get('https://campus-plum.vercel.app/api/vip-listings/');
        setProListings(proResponse.data);
        setLoading(prev => ({ ...prev, pro: false }));

        const normalResponse = await axios.get('https://campus-plum.vercel.app/api/listings/');
        setNormalListings(normalResponse.data);
        setLoading(prev => ({ ...prev, normal: false }));
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      {/* Header */}
      <motion.div
        className="text-center pt-12 pb-6 px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-3">
          Campus Marketplace
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Discover amazing products and services from fellow students. Buy smart, sell faster!
        </p>
      </motion.div>

      {/* 🔍 Search & Filter Bar */}
      <div className="max-w-5xl mx-auto px-4 -mt-2 mb-8">
        <div className="bg-white shadow-lg rounded-2xl flex flex-col md:flex-row items-center gap-4 p-4 border border-gray-100">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <input
              type="text"
              placeholder="Search listings, services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
            />
            <FiSearch className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          {/* Category Filter */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
          >
            <option value="">All Categories</option>
            <option value="premium">Premium</option>
            <option value="urgent">Urgent</option>
            <option value="services">Services</option>
          </select>
        </div>
      </div>

      {/* Banner */}
      <div className="max-w-6xl mx-auto px-4">
        <AdvertisementBanner />
      </div>

      {/* Premium Listings Section */}
      {filteredVip.length > 0 || loading.vip ? (
        <PremiumListingsSection
          listings={filteredVip}
          loading={loading.vip}
          error={error.vip}
          sliderRef={premiumSliderRef}
          scrollSlider={() => {}}
          renderLoadingSkeleton={() => {}}
        />
      ) : (
        <EmptyState type="premium" />
      )}

      {/* Urgent Listings Section */}
      {filteredNormal.length > 0 || loading.normal ? (
        <UrgentListingsSection
          listings={filteredNormal}
          loading={loading.normal}
          error={error.normal}
          sliderRef={urgentSliderRef}
          scrollSlider={() => {}}
          renderLoadingSkeleton={() => {}}
        />
      ) : (
        <EmptyState type="urgent" />
      )}

      {/* Recurring Services Section */}
      {filteredPro.length > 0 || loading.pro ? (
        <RecurringServicesSection
          listings={filteredPro}
          loading={loading.pro}
          error={error.pro}
          sliderRef={servicesSliderRef}
          scrollSlider={() => {}}
          renderLoadingSkeleton={() => {}}
        />
      ) : (
        <EmptyState type="services" />
      )}

     
    </div>
  );
}

export default Marketplace;
