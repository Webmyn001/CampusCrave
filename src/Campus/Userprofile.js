
import {
  Edit,
  Plus,
  Mail,
  Calendar,
  Book,
  Home,
  Loader,
  Star,
  AlertTriangle,
  Shield,
  Trash2,
  TrendingUp,
  Check,
  User,
  Sparkles,
  Zap,
  Award,
} from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// Tailwind utility for handling long strings without wrapping
const TRUNCATE_CLASS = "truncate block max-w-full";

const UserProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("listings");
  const [currentUser, setCurrentUser] = useState(null);
  const [listings, setListings] = useState({
    premium: [],
    vip: [],
    urgent: [],
    loading: true,
  });
  const [deletingId, setDeletingId] = useState(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  // --- Protect route: only logged-in users can view ---
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (!token || !userId) {
      navigate("/login");
      return;
    }
  }, [navigate]);

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          navigate("/login");
          return;
        }

        const res = await axios.get(
          `https://campus-plum.vercel.app/api/auth/${userId}`
        );
        setCurrentUser({
          ...res.data,
          memberSince: new Date(res.data.createdAt).toLocaleDateString(
            "en-US",
            { month: "long", year: "numeric" }
          ),
        });
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  // Fetch listings
  useEffect(() => {
    if (!currentUser) return;

    const fetchListings = async () => {
      try {
        const userId = localStorage.getItem("userId");

        const premiumRes = await axios.get(
          "https://campus-plum.vercel.app/api/pro-listings/"
        );
        const premium = premiumRes.data.filter(
          (item) => item.sellerInfo._id === userId
        );

        const vipRes = await axios.get(
          "https://campus-plum.vercel.app/api/vip-listings/"
        );
        const vip = vipRes.data.filter((item) => item.sellerInfo._id === userId);

        const normalRes = await axios.get(
          "https://campus-plum.vercel.app/api/listings/"
        );
        const urgent = normalRes.data.filter(
          (item) => item.sellerInfo._id === userId
        );

        setListings({
          premium,
          vip,
          urgent,
          loading: false,
        });
      } catch (error) {
        console.error("Error fetching listings:", error);
        setListings((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchListings();
  }, [currentUser]);

  // --- Actions ---

  const handleDeleteListing = async (listingId, category) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) {
      return;
    }

    setDeletingId(listingId);
    try {
      const token = localStorage.getItem("token");
      let endpoint = "";

      switch (category) {
        case "premium":
          endpoint = `https://campus-plum.vercel.app/api/pro-listings/${listingId}`;
          break;
        case "vip":
          endpoint = `https://campus-plum.vercel.app/api/vip-listings/${listingId}`;
          break;
        case "urgent":
          endpoint = `https://campus-plum.vercel.app/api/listings/${listingId}`;
          break;
        default:
          throw new Error("Invalid listing category");
      }

      await axios.delete(endpoint, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setListings((prev) => ({
        ...prev,
        [category]: prev[category].filter((item) => item._id !== listingId),
      }));
    } catch (error) {
      console.error("Error deleting listing:", error);
      alert("Failed to delete listing. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const toggleSoldStatus = async (listingId, category, currentStatus) => {
    try {
      const token = localStorage.getItem("token");
      let endpoint = "";

      if (category === "premium") {
        endpoint = `https://campus-plum.vercel.app/api/pro-listings/${listingId}`;
      } else if (category === "urgent") {
        endpoint = `https://campus-plum.vercel.app/api/listings/${listingId}`;
      } else return;

      await axios.put(
        endpoint,
        { soldOut: !currentStatus },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setListings((prev) => ({
        ...prev,
        [category]: prev[category].map((it) =>
          it._id === listingId ? { ...it, soldOut: !currentStatus } : it
        ),
      }));
    } catch (err) {
      console.error("Error toggling sold-out status:", err);
      alert("Failed to update status. Try again.");
    }
  };

  const totalListings = useMemo(
    () => listings.premium.length + listings.vip.length + listings.urgent.length,
    [listings]
  );

  if (loading || !currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center justify-center space-x-2">
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
              className="w-3 h-3 rounded-full bg-indigo-600"
            />
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
              className="w-3 h-3 rounded-full bg-indigo-600"
            />
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              className="w-3 h-3 rounded-full bg-indigo-600"
            />
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-slate-600 font-medium text-sm"
          >
            Loading your dashboard...
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-10 overflow-hidden"
        >
          {/* Background Gradient Card */}
          <div className="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 rounded-2xl shadow-xl overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
            
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white/30 rounded-lg rotate-12"></div>
              <div className="absolute top-32 right-20 w-16 h-16 border-2 border-white/30 rounded-full"></div>
              <div className="absolute bottom-20 left-1/4 w-12 h-12 border-2 border-white/30 rounded-lg -rotate-12"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 px-6 sm:px-8 lg:px-12 py-10">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                {/* Left Side - Text Content */}
                <div className="flex-1 space-y-6">
                  {/* Greeting Badge */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/90 text-sm font-medium"
                  >
                    <Sparkles className="w-4 h-4" />
                    Welcome back
                  </motion.div>

                  {/* Main Title */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tight">
                      Hello, {currentUser.name?.split(' ')[0]}! 👋
                    </h1>
                    <p className="text-indigo-100 text-base sm:text-lg max-w-2xl">
                      Manage your listings, track your sales, and grow your business all in one place.
                    </p>
                  </motion.div>

                  {/* Quick Stats Row */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap gap-4"
                  >
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                        <Shield className="w-4 h-4 text-emerald-300" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-white">{totalListings}</div>
                        <div className="text-xs text-indigo-200">Active Listings</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                        <Award className="w-4 h-4 text-amber-300" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-white">{listings.premium.length}</div>
                        <div className="text-xs text-indigo-200">Premium Items</div>
                      </div>
                    </div>

                    {currentUser.isVerified && (
                      <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 backdrop-blur-sm rounded-lg border border-emerald-400/30">
                        <Check className="w-4 h-4 text-emerald-300" />
                        <span className="text-sm font-medium text-emerald-100">Verified Seller</span>
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Right Side - Action Button */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex-shrink-0"
                >
                  <Link
                    to="/publish"
                    className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-indigo-700 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden"
                  >
                    {/* Button Gradient Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="relative flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-200 transition-colors duration-300">
                        <Plus className="w-5 h-5 text-indigo-700 group-hover:rotate-90 transition-transform duration-300" />
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-semibold">Create New</div>
                        <div className="text-xs text-indigo-600">Start listing now</div>
                      </div>
                      <Zap className="w-5 h-5 text-amber-500 ml-2" />
                    </div>
                  </Link>

                  {/* Small helper text */}
                  <p className="text-center mt-3 text-xs text-indigo-200">
                    List your item in under 2 minutes
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Bottom Wave Decoration */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/10 to-transparent"></div>
          </div>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          {/* Enhanced Profile Card */}
          <div className="xl:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden hover:shadow-md transition-all duration-300 group"
            >
              {/* Subtle gradient accent at top */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
              
              {/* Decorative background element */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative p-8">
                <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
                  {/* Profile Image Section */}
                  <div className="relative flex flex-col items-center text-center lg:flex-row lg:items-center lg:gap-6">
  {/* Profile Image Wrapper */}
  <div className="relative flex flex-col items-center justify-center">
    {/* Decorative ring */}
    <div className="absolute -inset-2 bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 rounded-full opacity-20 blur-xl"></div>

    {currentUser?.profilePhoto?.url ? (
      <motion.img
        whileHover={{ scale: 1.05 }}
        src={currentUser.profilePhoto.url}
        alt="Profile"
        className="relative w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg ring-2 ring-slate-100"
      />
    ) : (
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="relative w-28 h-28 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-3xl font-bold border-4 border-white shadow-lg ring-2 ring-slate-100"
      >
        {currentUser.name
          ?.split(" ")
          .map((word) => word[0]?.toUpperCase())
          .slice(0, 2)
          .join("") || "U"}
      </motion.div>
    )}

    {/* Edit icon for small screens */}
    <Link
      to="/profilepage"
      className="absolute top-2 right-2 lg:hidden bg-gradient-to-br from-slate-800 to-slate-900 text-white p-2.5 rounded-full shadow-md hover:scale-110 transition-all duration-300"
    >
      <Edit className="w-4 h-4" />
    </Link>
  </div>

  {/* Name and verification badge */}
  <div className="mt-4 lg:mt-0">
    <div className="flex flex-col items-center lg:items-start">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-bold text-slate-900">{currentUser.name}</h2>

        {/* Edit icon beside profile for large screens */}
        <Link
          to="/profilepage"
          className="hidden lg:flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 text-white p-2 rounded-full shadow hover:scale-110 transition-all duration-300"
        >
          <Edit className="w-4 h-4" />
        </Link>
      </div>

      {currentUser.isVerified && (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full mt-2">
          <Check className="w-3.5 h-3.5" />
          Verified Seller
        </span>
      )}
    </div>
  </div>
</div>


                  {/* User Info Section */}
                  <div className="flex-1 min-w-0 w-full">
                    {!currentUser.isVerified && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-5 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-400 rounded-lg"
                      >
                        <p className="text-amber-900 text-sm flex items-start gap-3">
                          <AlertTriangle className="w-5 h-5 flex-shrink-0 text-amber-600 mt-0.5" />
                          <span className="font-medium">Complete your profile to get verified and build trust with buyers!</span>
                        </p>
                      </motion.div>
                    )}

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InfoItem
                        icon={<Mail className="text-indigo-600" />}
                        label="Email"
                        value={currentUser.email}
                      />
                      <InfoItem
                        icon={<Calendar className="text-purple-600" />}
                        label="Member Since"
                        value={currentUser.memberSince}
                      />
                      <InfoItem
                        icon={<Book className="text-blue-600" />}
                        label="Department"
                        value={currentUser.course || "Not specified"}
                      />
                      <InfoItem
                        icon={<Home className="text-emerald-600" />}
                        label="Hostel"
                        value={currentUser.hostel || "Not specified"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-slate-200/60 p-6 hover:shadow-md transition-shadow duration-300"
          >
            <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-600" />
              Your Listings
            </h3>
            <div className="space-y-3">
              <StatItem value={listings.premium.length} label="Premium Listings" />
              <StatItem value={listings.vip.length} label="Business Services" />
              <StatItem value={listings.urgent.length} label="Quick Sales" />
              <div className="pt-3 mt-3 border-t border-slate-200">
                <StatItem value={totalListings} label="Total Listings" primary />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tab Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm border border-slate-200/60 p-1 mb-6 inline-flex"
        >
          {[
            { id: "listings", label: "My Listings", icon: <Shield className="w-4 h-4" /> },
            { id: "stats", label: "Overview", icon: <TrendingUp className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "listings" && (
              <div className="space-y-6">
                <ListingSection
                  title="Premium Listings"
                  emoji="⭐"
                  listings={listings.premium}
                  loading={listings.loading}
                  category="premium"
                  onDelete={handleDeleteListing}
                  onToggleSold={toggleSoldStatus}
                />

                <ListingSection
                  title="Business Services"
                  emoji="💼"
                  listings={listings.vip}
                  loading={listings.loading}
                  category="vip"
                  onDelete={handleDeleteListing}
                  onToggleSold={toggleSoldStatus}
                />

                <ListingSection
                  title="Quick Sales"
                  emoji="⚡"
                  listings={listings.urgent}
                  loading={listings.loading}
                  category="urgent"
                  onDelete={handleDeleteListing}
                  onToggleSold={toggleSoldStatus}
                />
              </div>
            )}

            {activeTab === "stats" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard 
                  title="Total Listings" 
                  value={totalListings} 
                  icon={<Shield className="w-5 h-5" />} 
                  color="indigo"
                />
                <StatCard 
                  title="Premium Items" 
                  value={listings.premium.length} 
                  icon={<Star className="w-5 h-5" />} 
                  color="amber"
                />
                <StatCard 
                  title="Business Services" 
                  value={listings.vip.length} 
                  icon={<TrendingUp className="w-5 h-5" />} 
                  color="blue"
                />
                <StatCard 
                  title="Quick Sale Items" 
                  value={listings.urgent.length} 
                  icon={<Home className="w-5 h-5" />} 
                  color="rose"
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// --- Helper Components ---

const InfoItem = ({ icon, label, value }) => (
  <motion.div 
    whileHover={{ scale: 1.02, y: -2 }}
    className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-slate-50 to-slate-50/50 border border-slate-200/60 hover:border-slate-300 hover:shadow-sm transition-all duration-300 group"
  >
    <div className="flex-shrink-0 p-2 bg-white rounded-lg shadow-sm group-hover:shadow transition-shadow duration-300">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">{label}</p>
      <p className="text-sm text-slate-900 font-semibold truncate" title={value}>
        {value}
      </p>
    </div>
  </motion.div>
);

const StatItem = ({ value, label, primary = false }) => (
  <div className="flex justify-between items-center">
    <span className="text-sm text-slate-600">{label}</span>
    <span className={`font-semibold ${primary ? "text-xl text-indigo-600" : "text-lg text-slate-900"}`}>
      {value}
    </span>
  </div>
);

const ListingSection = ({ title, emoji, listings, loading, category, onDelete, onToggleSold }) => {
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="flex items-center gap-2">
          <Loader className="text-xl text-indigo-600 animate-spin" />
          <span className="text-slate-600 text-sm">Loading {title.toLowerCase()}...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 p-5">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
        <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
          <span>{emoji}</span>
          {title}
        </h2>
        <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-md">
          {listings.length} {listings.length === 1 ? "item" : "items"}
        </span>
      </div>

      {listings.length > 0 ? (
        <div className="flex overflow-x-auto gap-4 pb-2 -mx-1 px-1">
          {listings.map((item, index) => (
            <div key={item._id} className="flex-shrink-0 w-64">
              <ListingCard
                item={item}
                category={category}
                index={index}
                onDelete={onDelete}
                onToggleSold={onToggleSold}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-50 rounded-lg p-8 text-center border border-dashed border-slate-300">
          <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Plus className="text-slate-400 text-xl" />
          </div>
          <p className="text-slate-600 font-medium text-sm mb-1">No listings yet</p>
          <p className="text-slate-500 text-xs">
            Create your first listing to get started
          </p>
        </div>
      )}
    </div>
  );
};

const ListingCard = ({ item, category, index, onDelete, onToggleSold }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const isBusiness = category === "vip";

  const handleDeleteClick = async (e) => {
    e.stopPropagation();
    setIsDeleting(true);
    await onDelete(item._id, category);
    setIsDeleting(false);
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
    const date = new Date(dateStr);
    if (!isNaN(date)) {
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    }
    try {
      const [datePart] = dateStr.split(" ");
      const parts = datePart.split("/");
      if (parts.length === 3) {
          const formatted = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
          if (!isNaN(formatted)) {
              return formatted.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
              });
          }
      }
    } catch (e) {
      return dateStr;
    }
    return dateStr;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-lg border border-slate-200 overflow-hidden cursor-pointer hover:shadow-lg hover:border-slate-300 transition-all duration-300 h-full flex flex-col group"
      onClick={handleCardClick}
    >
      {/* Image Section */}
      <div className="relative h-40 bg-slate-100 overflow-hidden flex-shrink-0">
        <img
          src={item.images?.[0]?.url || "https://picsum.photos/400/300"}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://picsum.photos/400/300";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

        {/* Delete Button */}
        <button
          onClick={handleDeleteClick}
          disabled={isDeleting}
          className="absolute top-2 right-2 bg-white text-red-600 p-1.5 rounded-md shadow-sm hover:bg-red-50 transition-colors duration-200 z-10"
          title="Delete listing"
        >
          {isDeleting ? <Loader className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
        </button>

        {/* Sold Badge */}
        {!isBusiness && item.soldOut && (
          <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-xs font-semibold rounded-md shadow-sm">
            SOLD OUT
          </div>
        )}

        {/* Title/Price Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
          {isBusiness ? (
            <h3 className="font-semibold text-sm truncate">{item.businessName || item.title}</h3>
          ) : (
            <>
              <p className="font-bold text-lg mb-0.5">₦{item.price}</p>
              <h3 className="font-medium text-xs truncate opacity-90">{item.title}</h3>
            </>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-3 flex-grow flex flex-col">
        <div className="text-xs text-slate-500 mb-3">
          Posted: {formatDate(item.formattedPostedAt || item.createdAt)}
        </div>

        {/* Action Controls */}
        <div className="mt-auto pt-3 border-t border-slate-200">
          {!isBusiness ? (
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-600 font-medium">Mark as sold</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleSold(item._id, category, item.soldOut);
                }}
                className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                  item.soldOut ? "bg-emerald-500" : "bg-slate-300"
                }`}
                title={item.soldOut ? "Mark as available" : "Mark as sold"}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-200 ${
                    item.soldOut ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>
          ) : (
            <div className="flex justify-center">
              <span className="text-xs bg-indigo-50 text-indigo-700 font-medium px-2.5 py-1 rounded-md flex items-center gap-1.5">
                <Shield className="w-3 h-3" /> VIP Service
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const StatCard = ({ title, value, icon, color }) => {
  const colorClasses = {
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-200",
    amber: "bg-amber-50 text-amber-600 border-amber-200",
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    rose: "bg-rose-50 text-rose-600 border-rose-200",
  };

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-all duration-300"
    >
      <div className={`inline-flex p-2 rounded-lg ${colorClasses[color]} mb-3 border`}>
        {icon}
      </div>
      <div className="text-xs text-slate-500 font-medium mb-1">{title}</div>
      <div className="text-2xl font-bold text-slate-900">{value}</div>
    </motion.div>
  );
};

export default UserProfile;
