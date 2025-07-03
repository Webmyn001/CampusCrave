// ListingsLayout.jsx
import { Link } from 'react-router-dom';
import { FiClock, FiShoppingBag, FiHeart } from 'react-icons/fi';

// Shared layout component
const ListingsLayout = ({ children, category, accentColor }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Category Header */}
        <div className={`mb-8 p-6 rounded-2xl bg-gradient-to-r ${accentColor} shadow-lg`}>
          <div className="flex items-center gap-4 text-white">
            {category.icon}
            <div>
              <h1 className="text-3xl font-bold">{category.title}</h1>
              <p className="mt-2 text-white/90">{category.description}</p>
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {children}
        </div>
      </div>
    </div>
  );
};

// Listing Card Component
const ListingCard = ({ item, accentColor }) => {
  // Extract gradient colors from accentColor for button hover effect
  const gradientColors = accentColor.replace('bg-gradient-to-r', '').trim();
  
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full">
      {/* Image Section */}
      <div className="relative aspect-square">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover rounded-t-xl"
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = "https://via.placeholder.com/536x354?text=Image+Not+Available";
          }}
        />
        {/* Badge */}
        <span className={`absolute top-3 left-3 px-3 py-1 ${accentColor} text-white rounded-full text-sm font-bold shadow-md`}>
          {item.category}
        </span>
        
        {/* Wishlist Button */}
        <button className="absolute top-3 right-3 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all">
          <FiHeart className="w-4 h-4 text-rose-500" />
        </button>
      </div>

      {/* Details Section */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 min-h-[3rem]">
            {item.title}
          </h3>
          <p className="text-xl font-bold text-gray-900 whitespace-nowrap ml-2">
            {item.price}
          </p>
        </div>

        {/* Time Left / Status */}
        {item.timeLeft && (
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <FiClock className="w-4 h-4 flex-shrink-0" />
            <span className="font-medium">{item.timeLeft} left</span>
          </div>
        )}

        {/* Seller Info */}
        {item.seller && (
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4 mt-auto">
            <FiShoppingBag className="w-4 h-4 flex-shrink-0" />
            <span className="line-clamp-1">{item.seller}</span>
          </div>
        )}

        {/* Action Button */}
        <Link
           to={{
           pathname: `/listing/${item.id}`,
           state: { item }  // Pass entire item object as state
          }}  
          className={`w-full block text-center py-3 px-4 ${accentColor} text-white rounded-lg font-bold transition-all
                     hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] 
                     hover:bg-gradient-to-r ${gradientColors} relative overflow-hidden group`}
        >
          <span className="relative z-10">BUY NOW</span>
          <span className={`absolute inset-0 bg-gradient-to-r ${gradientColors} opacity-0 group-hover:opacity-100 transition-opacity`}></span>
        </Link>
      </div>
    </div>
  );
};

export { ListingsLayout, ListingCard };