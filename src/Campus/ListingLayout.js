// ListingsLayout.jsx
import { Link } from 'react-router-dom';
import { FiClock, FiShoppingBag, FiHeart } from 'react-icons/fi';

// Shared layout component
const ListingsLayout = ({ children, category, accentColor }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Category Header */}
        <div className={`mb-6 p-5 rounded-xl bg-gradient-to-r ${accentColor} shadow-md`}>
          <div className="flex items-center gap-3 text-white">
            {category.icon}
            <div>
              <h1 className="text-xl md:text-2xl font-bold">{category.title}</h1>
              <p className="mt-1 text-sm text-white/90 max-w-2xl">{category.description}</p>
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {children}
        </div>
      </div>
    </div>
  );
};

// Listing Card Component - Medium size
const ListingCard = ({ item, accentColor }) => {
  // Extract gradient colors from accentColor for button hover effect
  const gradientColors = accentColor.replace('bg-gradient-to-r', '').trim();
  
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col h-full border border-gray-100">
      {/* Image Section */}
      <div className="relative aspect-[4/3]">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = "https://via.placeholder.com/400x300?text=Image+Not+Available";
          }}
        />
        {/* Badge */}
        <span className={`absolute top-2 left-2 px-2 py-1 ${accentColor} text-white rounded text-xs font-medium shadow-sm`}>
          {item.category}
        </span>
        
        {/* Wishlist Button */}
        <button className="absolute top-2 right-2 bg-white/80 hover:bg-white p-1.5 rounded-full shadow-sm transition-all">
          <FiHeart className="w-3.5 h-3.5 text-rose-500" />
        </button>
      </div>

      {/* Details Section */}
      <div className="p-3 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-base font-medium text-gray-900 line-clamp-2 min-h-[2.5rem]">
            {item.title}
          </h3>
          <p className="text-lg font-bold text-gray-900 whitespace-nowrap ml-2">
            {item.price}
          </p>
        </div>

        {/* Time Left / Status */}
        {item.timeLeft && (
          <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-1">
            <FiClock className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="font-medium">{item.timeLeft} left</span>
          </div>
        )}

        {/* Seller Info */}
        {item.seller && (
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
            <FiShoppingBag className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="line-clamp-1">{item.seller}</span>
          </div>
        )}

        {/* Action Button */}
        <Link
          to={{
            pathname: `/listing/${item.id}`,
            state: { item }  // Pass entire item object as state
          }}  
          className={`mt-2 w-full block text-center py-2 px-3 ${accentColor} text-white rounded-md font-medium transition-all
                     hover:shadow-sm hover:scale-[1.01] active:scale-[0.99] text-sm
                     hover:bg-gradient-to-r ${gradientColors} relative overflow-hidden group`}
        >
          <span className="relative z-10">View Details</span>
          <span className={`absolute inset-0 bg-gradient-to-r ${gradientColors} opacity-0 group-hover:opacity-100 transition-opacity`}></span>
        </Link>
      </div>
    </div>
  );
};

export { ListingsLayout, ListingCard };