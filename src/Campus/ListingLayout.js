// ListingsLayout.jsx
import { Link } from 'react-router-dom';
import { FiClock, FiShoppingBag, FiHeart, FiSearch, FiCheckCircle } from 'react-icons/fi';
import { useState } from 'react';

const ListingsLayout = ({ children, category, accentColor, showSearch = false, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Category Header */}
        <div className={`mb-8 p-6 rounded-2xl bg-gradient-to-r ${accentColor} shadow-lg`}>
          <div className="flex flex-col gap-3 text-white">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                {category.icon}
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{category.title}</h1>
                <p className="text-white/90 text-sm md:text-base mt-1 max-w-2xl">{category.description}</p>
              </div>
            </div>

            {/* Search bar */}
            {showSearch && (
              <div className="mt-4 w-full flex justify-center">
                <div className="relative w-full max-w-2xl">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiSearch className="text-gray-400 w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    placeholder={`Search ${category.title.toLowerCase()}...`}
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/70 outline-none focus:bg-white/15 focus:border-white/30 transition-all duration-200"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-6">
          {children}
        </div>
      </div>
    </div>
  );
};

// Modernized Listing Card with Verified Badge
const ListingCard = ({ item, accentColor }) => {
  const gradientColors = accentColor.replace('bg-gradient-to-r', '').trim();
  
  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden">
      {/* Accent Top Border */}
      <div className={`absolute top-0 left-0 w-full h-1 ${accentColor}`}></div>
      
      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = "https://via.placeholder.com/400x300?text=Image+Not+Available";
          }}
        />
        
        {/* Category Badge */}
        <span className={`absolute top-3 left-3 px-3 py-1.5 ${accentColor} text-white rounded-full text-xs font-medium shadow-lg backdrop-blur-sm`}>
          {item.category}
        </span>

        {/* Verified Badge - Positioned on image */}
        {item.user?.verified && (
          <div className="absolute top-3 right-3 z-10">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-2 rounded-full shadow-lg">
              <FiCheckCircle className="w-4 h-4" />
            </div>
            <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Title and Price */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1 pr-3 leading-tight">
            {item.title}
          </h3>
          <p className="text-2xl font-bold text-gray-900 whitespace-nowrap">
            {item.price}
          </p>
        </div>

        {/* Timer (if available) */}
        {item.secondsLeft && (
          <div className="flex items-center gap-2 text-sm text-orange-600 mb-3 bg-orange-50 px-3 py-2 rounded-lg">
            <FiClock className="w-4 h-4 flex-shrink-0" />
            <span className="font-medium">{item.secondsLeft} left • Hurry!</span>
          </div>
        )}

        {/* Seller Info with Verified Badge */}
        {item.sellerInfo?.name && (
          <div className="flex items-center gap-3 text-sm text-gray-600 mb-4 mt-auto">
            <div className="flex items-center gap-2 flex-1">
              <div className="w-8 h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
                <FiShoppingBag className="w-4 h-4 text-gray-600" />
              </div>
              <div className="flex items-center">
                <span className="font-medium text-gray-900">{item.sellerInfo.name}</span>
                {item.user?.verified && (
                  <FiCheckCircle className="w-4 h-4 text-green-500 ml-1.5 flex-shrink-0" />
                )}
              </div>
            </div>
          </div>
        )}

        {/* View Details Button */}
        <Link
          to={{
            pathname: `/listing/${item.id}`,
            state: { item }
          }}  
          className={`mt-auto w-full text-center py-3 px-4 ${accentColor} text-white rounded-xl font-semibold transition-all duration-200
                     hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group`}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            View Details
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
          <span className={`absolute inset-0 bg-gradient-to-r ${gradientColors} opacity-0 group-hover:opacity-100 transition-opacity duration-200`}></span>
        </Link>
      </div>
    </div>
  );
};

export { ListingsLayout, ListingCard };