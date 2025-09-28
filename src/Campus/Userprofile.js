import { FiEdit, FiLogOut, FiPlus, FiMail, FiCalendar, FiBook, FiHome, FiEye, FiLoader, FiStar, FiAlertTriangle, FiShield, FiTrash2, FiTrendingUp } from 'react-icons/fi';
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const cardHoverVariants = {
    rest: { scale: 1, y: 0 },
    hover: { scale: 1.02, y: -2 }
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
        
        // Fetch premium listings
        const premiumRes = await axios.get('https://campus-plum.vercel.app/api/pro-listings/');
        const premium = premiumRes.data.filter(item => item.sellerInfo._id === userId);
        
        // Fetch VIP listings
        const vipRes = await axios.get('https://campus-plum.vercel.app/api/vip-listings/');
        const vip = vipRes.data.filter(item => item.sellerInfo._id === userId);
        
        // Fetch normal listings and filter urgent ones
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
  if (!window.confirm('Are you sure you want to delete this listing? This action cannot be undone.')) {
    return;
  }

  setDeletingId(listingId);

  try {
    const token = localStorage.getItem('token'); // get your token from localStorage
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
        Authorization: `Bearer ${token}`, // <-- Authorization added here
      },
    });

    // Remove the listing from state
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

  const handleLogout = () => {
    localStorage.removeItem('Login');
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    navigate('/');
  };
  if (loading || !currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <FiLoader className="text-indigo-600 text-4xl" />
          </motion.div>
          <p className="text-gray-600">Loading your profile...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/20 py-8 px-4 sm:px-6 lg:px-8"
    >

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              My Profile
            </h1>
            <p className="text-gray-600 mt-2">Welcome back, {currentUser.name}!</p>
          </div>
          <div className="flex gap-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/publish"
                className="flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 shadow-md font-semibold"
              >
                <FiPlus className="mr-2" /> New Listing
              </Link>
            </motion.div>



            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button 
                onClick={handleLogout}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-rose-500 to-red-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 shadow-md font-semibold"
              >
                <FiLogOut className="mr-2" /> Logout
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Profile Card */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            {/* Header Section with Gradient */}
            <div className="relative h-48 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              {/* Update Profile Button */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="absolute top-6 right-6"
              >
                <Link
                  to="/profilepage"
                  className="flex items-center gap-2 bg-white/90 backdrop-blur-sm text-indigo-600 font-semibold px-4 py-2 rounded-full shadow-lg hover:bg-white transition-all duration-200 border border-white/20"
                >
                  <FiEdit className="text-indigo-600" />
                  <span>Update Profile</span>
                </Link>
              </motion.div>
            </div>
            {/* Profile Content */}
            <div className="relative px-8 pb-8">
              {/* Profile Image */}
              <div className="relative -mt-20 mb-6">
                {currentUser.profilePhoto.url ? (
                  <motion.img
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    src={currentUser.profilePhoto.url}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-white shadow-2xl object-cover"
                  />
                ) : (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="w-32 h-32 flex items-center justify-center rounded-full border-4 border-white shadow-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-4xl font-bold"
                  >
                    {currentUser.name
                      ? currentUser.name
                          .split(" ")
                          .map(word => word[0]?.toUpperCase())
                          .slice(0, 2)
                          .join("")
                      : "U"}
                  </motion.div>
                )}
              </div>

              {/* User Info */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">{currentUser.name}</h1>
                    {currentUser.isPro && (
                      <motion.span 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="px-4 py-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-sm font-semibold rounded-full shadow-lg"
                      >
                        PRO MEMBER
                      </motion.span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    <InfoCard icon={<FiMail />} label="Email" value={currentUser.email} truncate={true} />
                    <InfoCard icon={<FiCalendar />} label="Member Since" value={currentUser.memberSince} />
                    <InfoCard icon={<FiBook />} label="Department" value={currentUser.course || 'Not specified'} />
                    <InfoCard icon={<FiHome />} label="Hostel" value={currentUser.hostel || 'Not specified'} />
                  </div>
                </div>
                
                {/* Stats Overview */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl p-6 border border-gray-200/50">
                  <h3 className="font-semibold text-gray-700 mb-4">Quick Stats</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <StatPreview value={listings.premium.length} label="Premium" color="purple" />
                    <StatPreview value={listings.vip.length} label="VIP" color="yellow" />
                    <StatPreview value={listings.urgent.length} label="Urgent" color="red" />
                    <StatPreview 
                      value={listings.premium.length + listings.vip.length + listings.urgent.length} 
                      label="Total" 
                      color="indigo" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs Navigation */}
        <motion.div variants={itemVariants} className="flex space-x-1 bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/20 mb-8">
          {[
            { id: 'listings', label: 'My Listings', icon: <FiShield /> },
            { id: 'stats', label: 'Account Stats', icon: <FiStar /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex-1 justify-center ${
                activeTab === tab.id 
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg' 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100/50'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </motion.div>
        

 {/* Verification Status Message - Enhanced */}
 <motion.div
  variants={itemVariants}
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  className="mb-8"
>
  {/* Verification Status Message - Enhanced */}
  <div className={`relative overflow-hidden rounded-3xl p-6 shadow-lg ${
    currentUser.isVerified 
      ? 'bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-200/50' 
      : 'bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-200/50'
  }`}>
    
    {/* Animated Background Pattern */}
    <div className={`absolute inset-0 opacity-5 ${
      currentUser.isVerified ? 'bg-green-500' : 'bg-amber-500'
    }`} 
    style={{
      backgroundImage: `radial-gradient(circle at 25px 25px, currentColor 2%, transparent 2%), radial-gradient(circle at 75px 75px, currentColor 2%, transparent 2%)`,
      backgroundSize: '100px 100px'
    }}></div>
    
    <div className="relative z-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Animated Icon Container */}
          <motion.div 
            animate={currentUser.isVerified ? {
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            } : {
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className={`p-3 rounded-2xl ${
              currentUser.isVerified 
                ? 'bg-gradient-to-br from-green-400 to-emerald-500' 
                : 'bg-gradient-to-br from-amber-400 to-orange-500'
            } shadow-lg`}
          >
            {currentUser.isVerified ? (
              <span className="text-2xl">🏆</span> // Star for verified
            ) : (
              <span className="text-2xl">⚡</span> // Lightning bolt for not verified
            )}
          </motion.div>
          
          <div>
            <h3 className={`text-xl font-bold ${
              currentUser.isVerified ? 'text-green-800' : 'text-amber-800'
            }`}>
              {currentUser.isVerified ? (
                <>Account Verified <span className="text-2xl">🎉</span></>
              ) : (
                <>Get Verified <span className="text-2xl">🚀</span></>
              )}
            </h3>
            <p className={`mt-1 ${
              currentUser.isVerified ? 'text-green-700' : 'text-amber-700'
            }`}>
              {currentUser.isVerified 
                ? 'Your verified status boosts buyer confidence and helps you sell 3x faster! Trust built, sales unlocked. 💫' 
                : 'Complete verification to unlock higher trust scores, faster sales, and premium features. Start now! ✨'
              }
            </p>
          </div>
        </div>
         

        {/* Status Badge */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`px-4 py-2 rounded-full font-semibold shadow-md ${
            currentUser.isVerified
              ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
              : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
          }`}
        >
          {currentUser.isVerified ? 'VERIFIED SELLER' : 'PENDING VERIFICATION'}
        </motion.div>

         {/* Start Trading Button */}
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Link to="/marketplace">
      <button className="flex items-center gap-2 px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-all duration-200 shadow-sm">
        Enter Marketplace
        <FiTrendingUp className="w-4 h-4" />
      </button>
    </Link>
  </motion.div>
      </div>
      
      {/* Progress/Status Bar for Unverified */}
      {!currentUser.isVerified && (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-4"
        >
          <div className="bg-amber-200/50 rounded-full h-2">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full w-3/4"></div>
          </div>
          <p className="text-amber-600 text-sm mt-2 text-center">
            Complete your profile  to get verified quickly and start selling faster!
          </p>
        </motion.div>
      )}
      
      
    </div>
  </div>
</motion.div>



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
                  title="Premium Listings"
                  icon={<FiShield />}
                  listings={listings.premium}
                  loading={listings.loading}
                  category="premium"
                  color="purple"
                  onDelete={handleDeleteListing}
                />
                
                <ListingSection
                  title="Business/Service Listings"
                  icon={<FiStar />}
                  listings={listings.vip}
                  loading={listings.loading}
                  category="vip"
                  color="yellow"
                  onDelete={handleDeleteListing}
                />
                
                <ListingSection
                  title="Quick Sales"
                  icon={<FiAlertTriangle />}
                  listings={listings.urgent}
                  loading={listings.loading}
                  category="urgent"
                  color="red"
                  onDelete={handleDeleteListing}
                />
              </div>
            )}

            {activeTab === 'stats' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                  title="Total Listings" 
                  value={listings.premium.length + listings.vip.length + listings.urgent.length}
                  icon={<FiShield />}
                  color="indigo"
                />
                <StatCard 
                  title="Premium Listings" 
                  value={listings.premium.length}
                  icon={<FiShield />}
                  color="purple"
                />
                <StatCard 
                  title="VIP Listings" 
                  value={listings.vip.length}
                  icon={<FiStar />}
                  color="yellow"
                />
                <StatCard 
                  title="Urgent Listings" 
                  value={listings.urgent.length}
                  icon={<FiAlertTriangle />}
                  color="red"
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// Updated InfoCard component with better text handling
const InfoCard = ({ icon, label, value, truncate = false }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="flex items-start gap-3 p-3 bg-white/50 rounded-xl border border-gray-200/50 min-w-0 hover:bg-white/70 transition-colors duration-200 relative">
      <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600 flex-shrink-0 mt-0.5">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-gray-500 font-medium mb-1 whitespace-nowrap">{label}</p>
        <div 
          className="relative"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <p className={`font-medium text-gray-800 break-words word-break-break-all ${
            truncate ? 'truncate' : ''
          }`}>
            {value}
          </p>
          
          {/* Tooltip for truncated content */}
          {truncate && showTooltip && (
            <div className="absolute z-10 bottom-full left-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap">
              {value}
              <div className="absolute top-full left-4 border-4 border-transparent border-t-gray-900"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StatPreview = ({ value, label, color }) => {
  const colorClasses = {
    purple: 'from-purple-500 to-indigo-500',
    yellow: 'from-amber-400 to-yellow-500',
    red: 'from-rose-500 to-red-500',
    indigo: 'from-indigo-500 to-blue-500'
  };

  return (
    <div className="text-center p-3 bg-white/80 rounded-lg border border-gray-200/50">
      <div className={`text-2xl font-bold bg-gradient-to-r ${colorClasses[color]} bg-clip-text text-transparent`}>
        {value}
      </div>
      <div className="text-xs text-gray-600 font-medium">{label}</div>
    </div>
  );
};

const ListingSection = ({ title, icon, listings, loading, category, color, onDelete }) => {
  const colorClasses = {
    purple: { bg: 'bg-purple-100', text: 'text-purple-600', gradient: 'from-purple-500 to-indigo-500' },
    yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600', gradient: 'from-amber-400 to-yellow-500' },
    red: { bg: 'bg-red-100', text: 'text-red-600', gradient: 'from-rose-500 to-red-500' }
  };

  const colors = colorClasses[color];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-3 rounded-xl ${colors.bg} ${colors.text}`}>
          {icon}
        </div>
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${colors.gradient} text-white`}>
          {listings.length} items
        </span>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <FiLoader className={`text-2xl ${colors.text}`} />
          </motion.div>
        </div>
      ) : listings.length > 0 ? (
        <div className="overflow-x-auto pb-4">
          <div className="flex space-x-6 min-w-max">
            {listings.map((item, index) => (
              <ListingCard 
                key={item._id} 
                item={item} 
                category={category} 
                index={index}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl p-12 text-center border-2 border-dashed border-gray-300/50"
        >
          <div className={`w-16 h-16 mx-auto mb-4 ${colors.bg} rounded-2xl flex items-center justify-center`}>
            {icon}
          </div>
          <p className="text-gray-600 font-medium">You don't have any {title.toLowerCase()}</p>
          <p className="text-sm text-gray-500 mt-2">Create your first listing to get started</p>
        </motion.div>
      )}
    </motion.div>
  );
};

// Updated Listing Card Component without link wrappers
const ListingCard = ({ item, category, index, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  
  const getCategoryColor = () => {
    switch(category) {
      case 'premium': return 'from-purple-500 to-indigo-500';
      case 'vip': return 'from-amber-400 to-yellow-500';
      case 'urgent': return 'from-rose-500 to-red-500';
      default: return 'from-gray-500 to-gray-700';
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    
    // Split date and time
    const [datePart] = dateStr.split(" "); // "28/09/2025"
    const parts = datePart.split("/");

    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // JS months are 0-based
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

    return dateStr; // fallback
  };

  const handleDeleteClick = async () => {
    setIsDeleting(true);
    await onDelete(item._id, category);
    setIsDeleting(false);
  };
console.log(item)
  const isVip = category === 'vip';

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover="hover"
      className="group relative flex-shrink-0 w-64"
    >
      <motion.div
        variants={{
          rest: { scale: 1 },
          hover: { scale: 1.02 }
        }}
        className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:shadow-xl transition-all duration-300 h-full"
      >
        {/* Delete Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleDeleteClick}
          disabled={isDeleting}
          className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-red-500 hover:text-white transition-all duration-200 group/delete"
          title="Delete listing"
        >
          {isDeleting ? (
            <FiLoader className="w-4 h-4 animate-spin text-red-500" />
          ) : (
            <FiTrash2 className="w-4 h-4 text-red-500 group-hover/delete:text-white" />
          )}
        </motion.button>

        {/* Card content without link wrapper */}
        <div className="h-full">
          <div className="relative h-48 overflow-hidden">
            <img 
              src={item.images?.[0]?.url || "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"} 
              alt={item.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            
            {/* Conditional content based on VIP status */}
            {isVip ? (
              // VIP: Show business name only
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="font-bold text-lg truncate text-center">
                  {item.businessName || item.title}
                </h3>
              </div>
            ) : (
              // Premium/Urgent: Show price and title
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <p className="text-xl font-bold text-center">₦{item.price}</p>
                <h3 className="font-semibold text-sm truncate text-center mt-1">
                  {item.title}
                </h3>
              </div>
            )}
          </div>
          
          {/* Additional info and note for all listings */}
          <div className="p-4">
            <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
              <span>{formatDate(item.formattedPostedAt || item.createdAt)}</span>
            </div>
            
            {/* Note about viewing in marketplace */}
            <div className="text-xs text-gray-500 bg-blue-50 p-2 rounded-lg border border-blue-100">
              <p className="text-center">
                View this listing in marketplace to see details
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Stat Card Component
const StatCard = ({ title, value, icon, color }) => {
  const colorClasses = {
    indigo: 'from-indigo-500 to-blue-500',
    purple: 'from-purple-500 to-indigo-500',
    yellow: 'from-amber-400 to-yellow-500',
    red: 'from-rose-500 to-red-500'
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="flex justify-between items-center">
        <div>
          <div className={`text-3xl font-bold bg-gradient-to-r ${colorClasses[color]} bg-clip-text text-transparent`}>
            {value}
          </div>
          <div className="text-gray-600 font-medium mt-1">{title}</div>
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-r ${colorClasses[color]} text-white shadow-lg`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

export default UserProfile;