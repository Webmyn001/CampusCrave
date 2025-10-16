import { FiEdit, FiLogOut, FiPlus, FiMail, FiCalendar, FiBook, FiHome, FiLoader, FiStar, FiAlertTriangle, FiShield, FiTrash2, FiTrendingUp, FiCheck, FiX } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('listings');
  const [currentUser, setCurrentUser] = useState([]);
  const [listings, setListings] = useState({
    premium: [],
    vip: [],
    urgent: [],
    loading: true
  });
  const [deletingId, setDeletingId] = useState(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          navigate('/login');
          return;
        }
        
        const res = await axios.get(`https://campus-plum.vercel.app/api/auth/${userId}`);
        setCurrentUser({
          ...res.data,
          memberSince: new Date(res.data.createdAt).toLocaleDateString('en-US', { 
            month: 'long', 
            year: 'numeric' 
          })
        });
        setLoading(false)
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [navigate]);

  // Fetch listings
  useEffect(() => {
    if (!currentUser) return;

    const fetchListings = async () => {
      try {
        const userId = localStorage.getItem('userId');
        
        const premiumRes = await axios.get('https://campus-plum.vercel.app/api/pro-listings/');
        const premium = premiumRes.data.filter(item => item.sellerInfo._id === userId);
        
        const vipRes = await axios.get('https://campus-plum.vercel.app/api/vip-listings/');
        const vip = vipRes.data.filter(item => item.sellerInfo._id === userId);
        
        const normalRes = await axios.get('https://campus-plum.vercel.app/api/listings/');
        const urgent = normalRes.data.filter(item => item.sellerInfo._id === userId);
        
        setListings({
          premium,
          vip,
          urgent,
          loading: false
        });
      } catch (error) {
        console.error('Error fetching listings:', error);
        setListings(prev => ({ ...prev, loading: false }));
      }
    };

    fetchListings();
  }, [currentUser]);

  const handleDeleteListing = async (listingId, category) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) {
      return;
    }

    setDeletingId(listingId);
    try {
      const token = localStorage.getItem('token');
      let endpoint = '';

      switch (category) {
        case 'premium':
          endpoint = `https://campus-plum.vercel.app/api/pro-listings/${listingId}`;
          break;
        case 'vip':
          endpoint = `https://campus-plum.vercel.app/api/vip-listings/${listingId}`;
          break;
        case 'urgent':
          endpoint = `https://campus-plum.vercel.app/api/listings/${listingId}`;
          break;
        default:
          throw new Error('Invalid listing category');
      }

      await axios.delete(endpoint, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setListings(prev => ({
        ...prev,
        [category]: prev[category].filter(item => item._id !== listingId)
      }));

    } catch (error) {
      console.error('Error deleting listing:', error);
      alert('Failed to delete listing. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  // Replace existing toggleSoldStatus with this
const toggleSoldStatus = async (listingId, category, currentStatus) => {
  try {
    const token = localStorage.getItem('token');
    let endpoint = '';

    if (category === 'premium') {
      endpoint = `https://campus-plum.vercel.app/api/pro-listings/${listingId}`;
    } else if (category === 'urgent') {
      endpoint = `https://campus-plum.vercel.app/api/listings/${listingId}`;
    } else return; // skip vip

    // send JSON { soldOut: !currentStatus }
    await axios.put(
      endpoint,
      { soldOut: !currentStatus },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // update local state using soldOut (not sold)
    setListings(prev => ({
      ...prev,
      [category]: prev[category].map(it =>
        it._id === listingId ? { ...it, soldOut: !currentStatus } : it
      ),
    }));
  } catch (err) {
    console.error('Error toggling sold-out status:', err);
    alert('Failed to update status. Try again.');
  }
};


  const handleLogout = () => {
    localStorage.removeItem('Login');
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    navigate('/');
  };

  
  if (loading || !currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <FiLoader className="text-indigo-600 text-4xl" />
          </motion.div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              My Profile
            </h1>
            <p className="text-gray-600 mt-2 text-lg">Welcome back, {currentUser.name}! 👋</p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/publish"
              className="flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
            >
              <FiPlus className="mr-2" /> New Listing
            </Link>
            <button 
              onClick={handleLogout}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
            >
              <FiLogOut className="mr-2" /> Logout
            </button>
          </div>
        </div>

     {/* Profile Card */}
<div className="bg-white rounded-2xl shadow-xl border font-raleway border-gray-100 p-8 mb-8 backdrop-blur-sm bg-white/90">
  <div className="flex flex-col lg:flex-row gap-8">
    {/* Profile Image with Edit Icon */}
    <div className="flex-shrink-0 relative group">
      <div className="relative">
        {currentUser?.profilePhoto?.url ? (
          <img
            src={currentUser?.profilePhoto?.url}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-2xl transition-all duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-32 h-32 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-3xl font-bold border-4 border-white shadow-2xl">
            {currentUser.name?.split(" ").map(word => word[0]?.toUpperCase()).slice(0, 2).join("") || "U"}
          </div>
        )}
        
        {/* Edit Icon with Text */}
        <motion.div
  whileHover={{ scale: 1.08, rotate: 2 }}
  whileTap={{ scale: 0.95 }}
  className="absolute -bottom-3 -right-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white 
             rounded-full shadow-xl border-2 border-white/80 transition-all duration-300 
             hover:from-indigo-700 hover:to-purple-700 hover:shadow-2xl hover:-translate-y-0.5 
             flex items-center gap-2 px-3 py-2 cursor-pointer backdrop-blur-sm"
>
  <Link to="/profilepage" className="flex items-center gap-1">
    <FiEdit className="w-4 h-4 sm:w-5 sm:h-5" />
    <span className="text-[11px] sm:text-xs font-semibold tracking-wide">Update</span>
  </Link>
</motion.div>
      </div>
    </div>

    {/* User Info */}
    <div className="flex-1">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold font-raleway text-gray-900">{currentUser.name}</h2>
        <div className="flex flex-wrap gap-2">
          {currentUser.isPro && (
            <span className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold rounded-full shadow-lg">
              ⭐ PRO SELLER
            </span>
          )}
          {/* Conditional Verified Badge */}
          {currentUser.isVerified ? (
            <span className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-semibold rounded-full shadow-lg flex items-center gap-2">
              <FiCheck className="w-4 h-4" /> VERIFIED
            </span>
          ) : (
            <div className="">
              <div className="px-2 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold rounded-full shadow-lg flex items-center gap-2">
                <FiAlertTriangle className="w-3 h-3" />
              <span>Not Verified</span>
              </div>
              <p className='text-xs pt-1'>Complete your profile to get verified</p>
            </div>
            
          )}
        </div>
      </div>
      
      {!currentUser.isVerified && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <p className="text-amber-800 text-sm flex items-center gap-2">
            <FiAlertTriangle className="w-4 h-4 flex-shrink-0" />
            Verify your account to get your items sold quickly and build trust with buyers.
          </p>
        </div>
      )}
      
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-hidden">
  <InfoItem 
    icon={<FiMail className="text-indigo-500 shrink-0" />} 
    label="Email" 
    value={
      <span
        className="truncate block max-w-[200px] sm:max-w-[250px] cursor-pointer"
        title={currentUser.email} // 👈 shows full value on hover
      >
        {currentUser.email}
      </span>
    }  
  />
  <InfoItem 
    icon={<FiCalendar className="text-purple-500 shrink-0" />} 
    label="Member Since" 
    value={
      <span
        className="truncate block max-w-[200px] sm:max-w-[250px]"
        title={currentUser.memberSince}
      >
        {currentUser.memberSince}
      </span>
    } 
  />
  <InfoItem 
    icon={<FiBook className="text-blue-500 shrink-0" />} 
    label="Department" 
    value={
      <span
        className="truncate block max-w-[200px] sm:max-w-[250px]"
        title={currentUser.course || 'Not specified'}
      >
        {currentUser.course || 'Not specified'}
      </span>
    } 
  />
  <InfoItem 
    icon={<FiHome className="text-green-500 shrink-0" />} 
    label="Hostel" 
    value={
      <span
        className="truncate block max-w-[200px] sm:max-w-[250px]"
        title={currentUser.hostel || 'Not specified'}
      >
        {currentUser.hostel || 'Not specified'}
      </span>
    } 
  />
</div>



    </div>

    {/* Quick Stats */}
    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 min-w-[240px] text-white shadow-2xl">
      <h3 className="font-bold text-lg mb-4 text-white/90">Quick Stats</h3>
      <div className="space-y-4">
        <StatItem value={listings.premium.length} label="Premium" />
        <StatItem value={listings.vip.length} label="Business" />
        <StatItem value={listings.urgent.length} label="Quick Sales" />
        <div className="pt-4 border-t border-white/20">
          <StatItem 
            value={listings.premium.length + listings.vip.length + listings.urgent.length} 
            label="Total Listings" 
            primary 
          />
        </div>
      </div>
    </div>
  </div>
</div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-2 mb-8">
          <div className="flex">
            {[
              { id: 'listings', label: 'My Listings', icon: <FiShield /> },
              { id: 'stats', label: 'Performance Stats', icon: <FiTrendingUp /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1 px-6 py-1 rounded-xl font-semibold transition-all duration-300 flex-1 justify-center ${
                  activeTab === tab.id 
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg' 
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'listings' && (
              <div className="space-y-8">
                <ListingSection
                  title="⭐ Premium Listings"
                  listings={listings.premium}
                  loading={listings.loading}
                  category="premium"
                  onDelete={handleDeleteListing}
                  onToggleSold={toggleSoldStatus}
                />
                
                <ListingSection
                  title="💼 Business Services"
                  listings={listings.vip}
                  loading={listings.loading}
                  category="vip"
                  onDelete={handleDeleteListing}
                  onToggleSold={toggleSoldStatus}
                />
                
                <ListingSection
                  title="⚡ Quick Sales"
                  listings={listings.urgent}
                  loading={listings.loading}
                  category="urgent"
                  onDelete={handleDeleteListing}
                  onToggleSold={toggleSoldStatus}
                />
              </div>
            )}

            {activeTab === 'stats' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                  title="Total Listings" 
                  value={listings.premium.length + listings.vip.length + listings.urgent.length}
                  color="indigo"
                  icon={<FiShield />}
                />
                <StatCard 
                  title="Premium" 
                  value={listings.premium.length}
                  color="purple"
                  icon={<FiStar />}
                />
                <StatCard 
                  title="Business" 
                  value={listings.vip.length}
                  color="amber"
                  icon={<FiTrendingUp />}
                />
                <StatCard 
                  title="Quick Sales" 
                  value={listings.urgent.length}
                  color="red"
                  icon={<FiHome />}
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// Enhanced Info Item
const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
    <div className="p-2 bg-gray-100 rounded-lg">{icon}</div>
    <div className="flex-1">
      <p className="text-sm text-gray-500 font-medium">{label}</p>
      <p className="font-semibold text-gray-900">{value}</p>
    </div>
  </div>
);

// Enhanced Stat Item
const StatItem = ({ value, label, primary = false }) => (
  <div className={`flex justify-between items-center ${primary ? 'font-bold text-lg' : ''}`}>
    <span className="text-white/90">{label}</span>
    <span className={`font-bold ${primary ? 'text-white text-xl' : 'text-white'}`}>
      {value}
    </span>
  </div>
);

// Updated Listing Section
const ListingSection = ({ title, listings, loading, category, onDelete, onToggleSold }) => {
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <FiLoader className="text-2xl text-gray-400 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <span className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 text-sm font-semibold rounded-full shadow-sm">
          {listings.length} {listings.length === 1 ? 'item' : 'items'}
        </span>
      </div>
      
      {listings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {listings.map((item, index) => (
            <ListingCard 
              key={item._id} 
              item={item} 
              category={category} 
              index={index}
              onDelete={onDelete}
              onToggleSold={onToggleSold}
            />
          ))}
        </div>
      ) : (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-12 text-center border-2 border-dashed border-gray-300">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiPlus className="text-gray-400 text-2xl" />
          </div>
          <p className="text-gray-600 font-semibold text-lg mb-2">No {title.toLowerCase()} found</p>
          <p className="text-gray-500">Create your first listing to get started</p>
        </div>
      )}
    </div>
  );
};

// Enhanced Listing Card
const ListingCard = ({ item, category, index, onDelete, onToggleSold }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const isBusiness = category === 'vip';

  const handleDeleteClick = async (e) => {
    e.stopPropagation();
    setIsDeleting(true);
    await onDelete(item._id, category);
    setIsDeleting(false);
  };

  const handleSoldToggle = (e) => {
    e.stopPropagation();
    onToggleSold(item._id, category, item.sold);
  };

  const handleCardClick = () => {
    if (isBusiness) {
      navigate(`/business/${item._id}`, { state: { item } });
    } else {
      navigate(`/listing/${item._id}`, { state: { item } });
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [datePart] = dateStr.split(" ");
    const parts = datePart.split("/");

    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);

      const formatted = new Date(year, month, day);
      if (!isNaN(formatted)) {
        return formatted.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      }
    }
    return dateStr;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.03, y: -5 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 group"
      onClick={handleCardClick}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={item.images?.[0]?.url || "/api/placeholder/300/200"} 
          alt={item.title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Delete Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleDeleteClick}
          disabled={isDeleting}
          className="absolute top-3 left-3 bg-white/90 p-2 rounded-full shadow-lg hover:bg-red-500 hover:text-white transition-all duration-300"
          title="Delete listing"
        >
          {isDeleting ? (
            <FiLoader className="w-4 h-4 animate-spin" />
          ) : (
            <FiTrash2 className="w-4 h-4 text-red-500 group-hover:text-white" />
          )}
        </motion.button>

       
{!isBusiness && item.soldOut && (
  <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
    SOLD
  </div>
)}

        {/* Title/Price Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          {isBusiness ? (
            <h3 className="font-bold text-lg truncate">{item.businessName || item.title}</h3>
          ) : (
            <>
              <p className="font-bold text-xl">₦{item.price}</p>
              <h3 className="font-semibold text-sm truncate">{item.title}</h3>
            </>
          )}
        </div>
      </div>
      
      {/* Card Content */}
      <div className="p-4">
        <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
          <span>{formatDate(item.formattedPostedAt || item.createdAt)}</span>
        </div>
        
        {/* Sold Checkbox (not for business) */}
       {!isBusiness && (
  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
    <span className="text-sm text-gray-600 font-medium">Mark as sold:</span>
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggleSold(item._id, category, item.soldOut);
      }}
      className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
        item.soldOut ? 'bg-green-500' : 'bg-gray-300'
      }`}
    >
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${
        item.soldOut ? 'left-7' : 'left-1'
      }`} />
    </button>
  </div>
)}
        
        {/* Business tag */}
        {isBusiness && (
          <div className="pt-3 border-t border-gray-100">
            <span className="text-sm text-blue-600 font-semibold">💼 Business Service</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Enhanced Stat Card
const StatCard = ({ title, value, color, icon }) => {
  const colorClasses = {
    indigo: 'from-indigo-500 to-blue-500',
    purple: 'from-purple-500 to-pink-500',
    amber: 'from-amber-500 to-orange-500',
    red: 'from-red-500 to-rose-500'
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className={`bg-gradient-to-br ${colorClasses[color]} rounded-2xl p-6 text-white shadow-xl`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
          {icon}
        </div>
      </div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-white/90 font-medium">{title}</div>
    </motion.div>
  );
};

export default UserProfile;