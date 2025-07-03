import { FiCheckCircle, FiEdit, FiLogOut, FiPackage, FiPlus, FiUser, FiMail, FiCalendar, FiBook, FiHome, FiTrash2, FiEye } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const UserProfile = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([
    { 
      id: 1, 
      title: "MacBook Pro 2020 (16GB/512GB)", 
      price: "₦280,000", 
      status: "active",
      image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      date: "2 days ago",
      views: 142,
      category: "Electronics"
    },
    { 
      id: 2, 
      title: "Calculus Textbook 3rd Edition", 
      price: "₦7,500", 
      status: "sold",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      date: "1 week ago",
      views: 89,
      category: "Books"
    },
    { 
      id: 3, 
      title: "Designer Winter Jacket", 
      price: "₦15,000", 
      status: "active",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      date: "3 days ago",
      views: 67,
      category: "Fashion"
    },
  ]);
  
  const [currentUser, setCurrentUser] = useState({
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    memberSince: "March 2022",
    course: "Computer Science",
    year: "4",
    hostel: "Unity Hall, Room 405",
    phone: "+234 812 345 6789"
  });
  
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('listings');

  const handleAuth = () => {
    localStorage.removeItem('Login');
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    window.dispatchEvent(new Event('storage'));
    navigate('/');
  };

  const toggleListingStatus = (listingId) => {
    setListings(listings.map(listing => 
      listing.id === listingId 
        ? { ...listing, status: listing.status === 'active' ? 'sold' : 'active' }
        : listing
    ));
  };

  const deleteListing = (listingId) => {
    setListings(listings.filter(listing => listing.id !== listingId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header with Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">My Profile</h1>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/publish"
              className="flex items-center px-4 py-2 text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md"
            >
              <FiPlus className="mr-2" /> 
              <span className="hidden sm:inline">Publish New</span>
              <span className="sm:hidden">New</span>
            </Link>
            <button 
              onClick={handleAuth}
              className="flex items-center px-4 py-2 text-white bg-gradient-to-r from-red-500 to-orange-500 rounded-xl hover:from-red-600 hover:to-orange-600 transition-all shadow-md"
            >
              <FiLogOut className="mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Profile Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8"
        >
          <div className="relative h-32 bg-gradient-to-r from-indigo-600 to-purple-600">
            <div className="absolute -bottom-16 left-6 sm:left-8">
              <div className="relative">
                <img 
                  src={currentUser.avatar}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white shadow-xl"
                />
                {true && (
                  <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                    <FiCheckCircle className="text-white text-sm" />
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="pt-20 pb-6 px-6 sm:px-8">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-800">{currentUser.name}</h1>
                  <span className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                    true 
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white'
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                    PRO Member
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 mt-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-indigo-100 p-2 rounded-lg">
                      <FiMail className="text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="font-medium">{currentUser.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-indigo-100 p-2 rounded-lg">
                      <FiCalendar className="text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Member Since</p>
                      <p className="font-medium">{currentUser.memberSince}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-indigo-100 p-2 rounded-lg">
                      <FiBook className="text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Department</p>
                      <p className="font-medium">{currentUser.course}, Part {currentUser.year}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-indigo-100 p-2 rounded-lg">
                      <FiHome className="text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Address</p>
                      <p className="font-medium">{currentUser.hostel}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Link 
                to="/profilepage"
                className="self-start flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-xl transition-colors h-fit"
              >
                <FiEdit />
                <span>Edit Profile</span>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Tabs for Listings and Stats */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`px-4 py-3 font-medium text-sm sm:text-base ${
              activeTab === 'listings' 
                ? 'text-indigo-600 border-b-2 border-indigo-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('listings')}
          >
            <div className="flex items-center gap-2">
              <FiPackage />
              My Listings ({listings.length})
            </div>
          </button>
          <button
            className={`px-4 py-3 font-medium text-sm sm:text-base ${
              activeTab === 'stats' 
                ? 'text-indigo-600 border-b-2 border-indigo-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('stats')}
          >
            <div className="flex items-center gap-2">
              <FiUser />
              Account Stats
            </div>
          </button>
        </div>

        {/* Listings Section */}
        {activeTab === 'listings' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((listing) => (
                <motion.div 
                  key={listing.id}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl shadow-md overflow-hidden"
                >
                  <div className="relative">
                    <img 
                      src={listing.image} 
                      alt={listing.title} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        listing.status === 'active' 
                          ? 'bg-green-100 text-green-600'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {listing.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-gray-800 text-lg line-clamp-1">{listing.title}</h3>
                      <p className="text-blue-600 font-bold text-lg">{listing.price}</p>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                      <span>{listing.category}</span>
                      <span>{listing.date}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <FiEye className="text-gray-400" />
                        <span>{listing.views} views</span>
                      </div>
                      
                      <div className="flex gap-2">
                        <button 
                          onClick={() => toggleListingStatus(listing.id)}
                          className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg transition-colors"
                        >
                          {listing.status === 'active' ? 'Mark Sold' : 'Reactivate'}
                        </button>
                        <button 
                          onClick={() => deleteListing(listing.id)}
                          className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {listings.length === 0 && (
              <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                <FiPackage className="mx-auto text-gray-400 text-4xl mb-4" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">No listings yet</h3>
                <p className="text-gray-500 mb-6">You haven't published any items for sale.</p>
                <Link
                  to="/publish"
                  className="inline-flex items-center px-4 py-2 text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors"
                >
                  <FiPlus className="mr-2" /> 
                  Create First Listing
                </Link>
              </div>
            )}
          </motion.div>
        )}

        {/* Stats Section */}
        {activeTab === 'stats' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Stats Cards */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="text-3xl font-bold text-indigo-600 mb-2">42</div>
              <div className="text-gray-700 font-medium">Total Listings</div>
              <div className="text-sm text-gray-500 mt-1">Since joining</div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="text-3xl font-bold text-green-600 mb-2">38</div>
              <div className="text-gray-700 font-medium">Items Sold</div>
              <div className="text-sm text-gray-500 mt-1">Successful transactions</div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">4.9</div>
              <div className="text-gray-700 font-medium">Seller Rating</div>
              <div className="text-sm text-gray-500 mt-1">Based on 24 reviews</div>
            </div>
            
            {/* Activity Section */}
            <div className="md:col-span-3 bg-white rounded-2xl shadow-md p-6 mt-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="bg-green-100 rounded-full p-2">
                    <FiCheckCircle className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Item sold: Calculus Textbook</p>
                    <p className="text-sm text-gray-500">Yesterday at 2:45 PM</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="bg-blue-100 rounded-full p-2">
                    <FiPlus className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">New listing: Designer Winter Jacket</p>
                    <p className="text-sm text-gray-500">3 days ago</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="bg-indigo-100 rounded-full p-2">
                    <FiUser className="text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-medium">Profile information updated</p>
                    <p className="text-sm text-gray-500">1 week ago</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;