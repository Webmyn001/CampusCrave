import { FiEdit, FiLogOut, FiPlus, FiMail, FiCalendar, FiBook, FiHome, FiEye, FiLoader, FiStar, FiAlertTriangle, FiShield } from 'react-icons/fi';
import { useEffect, useState } from 'react';
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

  const handleLogout = () => {
    localStorage.removeItem('Login');
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    navigate('/');
  };

  if (loading || !currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <FiLoader className="animate-spin text-indigo-600 text-4xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">My Profile</h1>
          <div className="flex gap-3">
            <Link
              to="/publish"
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
            >
              <FiPlus className="mr-2" /> New Listing
            </Link>
            <button 
              onClick={handleLogout}
              className="flex items-center px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors shadow-sm"
            >
              <FiLogOut className="mr-2" /> Logout
            </button>
          </div>
        </div>

       <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8 border border-gray-100">
  {/* Header Section with Gradient + Update Button */}
  <div className="relative h-40 bg-gradient-to-r from-indigo-500 to-purple-600">
    {/* Update Profile Button (top-right) */}
    <Link
      to="/profilepage"
      className="absolute top-4 right-4 flex items-center gap-2 bg-white text-sm font-medium text-indigo-600 px-4 py-2 rounded-full shadow-md hover:bg-indigo-50 border border-gray-200 transition-all"
    >
      <FiEdit className="text-indigo-600" />
      <span>Update Profile</span>
    </Link>
  </div>

  {/* Profile Image */}
  <div className="relative -mt-16 px-6">
    <img 
      src={currentUser.image || "https://i.pinimg.com/736x/3e/96/71/3e9671f23722767969d511dda257a888.jpg"}
      alt="Profile"
      className="w-36 h-36 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-lg object-cover"
    />
  </div>



          <div className="pt-20 pb-6 px-6">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-xl font-bold text-gray-800">{currentUser.name}</h1>
                  {currentUser.isPro && (
                    <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs rounded-full">
                      PRO MEMBER
                    </span>
                  )}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-indigo-100 p-2 rounded-lg">
                      <FiMail className="text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="font-medium">{currentUser.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="bg-indigo-100 p-2 rounded-lg">
                      <FiCalendar className="text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Member Since</p>
                      <p className="font-medium">{currentUser.memberSince}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="bg-indigo-100 p-2 rounded-lg">
                      <FiBook className="text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Department</p>
                      <p className="font-medium">{currentUser.course || 'Not specified'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="bg-indigo-100 p-2 rounded-lg">
                      <FiHome className="text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Hostel</p>
                      <p className="font-medium">{currentUser.hostel || 'Not specified'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`px-4 py-3 font-medium flex items-center gap-2 ${
              activeTab === 'listings' 
                ? 'text-indigo-600 border-b-2 border-indigo-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('listings')}
          >
            <FiShield className="text-lg" />
            My Listings
          </button>
          <button
            className={`px-4 py-3 font-medium flex items-center gap-2 ${
              activeTab === 'stats' 
                ? 'text-indigo-600 border-b-2 border-indigo-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('stats')}
          >
            <FiStar className="text-lg" />
            Account Stats
          </button>
        </div>

        {/* Listings Content */}
        {activeTab === 'listings' && (
          <div className="space-y-10">
            {/* Premium Listings */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <FiShield className="text-purple-600 text-xl" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Premium Listings</h2>
              </div>
              
              {listings.loading ? (
                <div className="flex justify-center py-8">
                  <FiLoader className="animate-spin text-purple-600 text-2xl" />
                </div>
              ) : listings.premium.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {listings.premium.map(item => (
                    <ListingCard key={item._id} item={item} category="premium" />
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 rounded-xl p-8 text-center border border-gray-200">
                  <p className="text-gray-600">You don't have any premium listings</p>
                </div>
              )}
            </div>
            
            {/* VIP Listings */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-yellow-100 p-2 rounded-lg">
                  <FiStar className="text-yellow-600 text-xl" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">VIP Listings</h2>
              </div>
              
              {listings.loading ? (
                <div className="flex justify-center py-8">
                  <FiLoader className="animate-spin text-yellow-600 text-2xl" />
                </div>
              ) : listings.vip.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {listings.vip.map(item => (
                    <ListingCard key={item._id} item={item} category="vip" />
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 rounded-xl p-8 text-center border border-gray-200">
                  <p className="text-gray-600">You don't have any VIP listings</p>
                </div>
              )}
            </div>
            
            {/* Urgent Listings */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-red-100 p-2 rounded-lg">
                  <FiAlertTriangle className="text-red-600 text-xl" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Urgent Listings</h2>
              </div>
              
              {listings.loading ? (
                <div className="flex justify-center py-8">
                  <FiLoader className="animate-spin text-red-600 text-2xl" />
                </div>
              ) : listings.urgent.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {listings.urgent.map(item => (
                    <ListingCard key={item._id} item={item} category="urgent" />
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 rounded-xl p-8 text-center border border-gray-200">
                  <p className="text-gray-600">You don't have any urgent listings</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Stats Content */}
        {activeTab === 'stats' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          </div>
        )}
      </div>
    </div>
  );
};

// Listing Card Component
const ListingCard = ({ item, category }) => {
  const getCategoryColor = () => {
    switch(category) {
      case 'premium': return 'from-purple-500 to-indigo-500';
      case 'vip': return 'from-yellow-400 to-amber-500';
      case 'urgent': return 'from-red-500 to-orange-500';
      default: return 'from-gray-500 to-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all">
      <div className="relative h-48">
        <img 
          src={item.image || "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"} 
          alt={item.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/70"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="font-bold text-lg truncate">{item.title}</h3>
          <p className="text-xl font-bold">₦{item.price}</p>
        </div>
        <span className={`absolute top-3 right-3 bg-gradient-to-r ${getCategoryColor()} text-white px-3 py-1 rounded-full text-xs`}>
          {category.toUpperCase()}
        </span>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
          <span>{item.category || 'General'}</span>
          <span>{new Date(item.formattedPostedAt).toLocaleDateString()}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-500">
          <FiEye className="mr-1" /> {item.views || 0} views
        </div>
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value, icon, color }) => {
  const bgColor = () => {
    switch(color) {
      case 'indigo': return 'bg-indigo-50 border-indigo-200 text-indigo-600';
      case 'purple': return 'bg-purple-50 border-purple-200 text-purple-600';
      case 'yellow': return 'bg-yellow-50 border-yellow-200 text-yellow-600';
      default: return 'bg-gray-50 border-gray-200 text-gray-600';
    }
  };

  return (
    <div className={`rounded-xl border p-6 ${bgColor()}`}>
      <div className="flex justify-between items-start">
        <div>
          <div className="text-3xl font-bold mb-1">{value}</div>
          <div className="text-gray-600">{title}</div>
        </div>
        <div className="p-3 rounded-lg bg-white shadow-sm">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;