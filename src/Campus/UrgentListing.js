// UrgentListings.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ListingsLayout, ListingCard } from './ListingLayout';
import { FiZap, FiLoader, FiAlertCircle, FiSearch } from 'react-icons/fi';

const UrgentListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get('https://campus-plum.vercel.app/api/listings');
        // Add sample verification status for demonstration
        const listingsWithVerification = response.data.map(item => ({
          ...item,
          user: {
            ...item.user,
            verified: Math.random() > 0.5 // Random verification for demo
          }
        }));
        setListings(listingsWithVerification);
      } catch (err) {
        setError(err.message || 'Failed to load urgent listings');
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const filteredListings = listings.filter(item =>
    item.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Custom search input component for better styling
  const SearchInput = ({ onSearch }) => (
    <div className="relative max-w-2xl w-full mx-auto mb-8">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <FiSearch className="text-gray-400 w-5 h-5" />
      </div>
      <input
        type="text"
        placeholder="Search urgent listings..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-orange-300 focus:ring-2 focus:ring-orange-100 focus:outline-none transition-all duration-200 bg-white shadow-sm"
      />
    </div>
  );

  // Loading State
  if (loading) {
    return (
      <ListingsLayout
        category={{
          title: "Urgent Sales",
          description: "Time-sensitive deals requiring quick action",
          icon: <FiZap className="w-8 h-8" />
        }}
        accentColor="from-red-500 to-orange-400"
      >
        <div className="flex flex-col items-center justify-center py-20 col-span-full">
          <div className="relative">
            <FiLoader className="animate-spin text-orange-500 w-16 h-16 mb-4" />
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-400 opacity-0 animate-pulse rounded-full"></div>
          </div>
          <p className="text-gray-600 font-medium text-lg mt-4">Loading urgent items...</p>
          <p className="text-gray-400 text-sm mt-2">Getting the best deals ready for you</p>
        </div>
      </ListingsLayout>
    );
  }

  // Error State
  if (error) {
    return (
      <ListingsLayout
        category={{
          title: "Urgent Sales",
          description: "Time-sensitive deals requiring quick action",
          icon: <FiZap className="w-8 h-8" />
        }}
        accentColor="from-red-500 to-orange-400"
      >
        <div className="flex flex-col items-center justify-center py-20 col-span-full">
          <div className="bg-gradient-to-r from-red-100 to-orange-100 p-6 rounded-2xl mb-6">
            <FiAlertCircle className="text-red-500 w-16 h-16" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Error loading listings</h3>
          <p className="text-gray-600 text-center max-w-md mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-red-500 to-orange-400 hover:from-red-600 hover:to-orange-500 text-white py-3 px-8 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Try Again
          </button>
        </div>
      </ListingsLayout>
    );
  }

  // Empty State
  if (listings.length === 0) {
    return (
      <ListingsLayout
        category={{
          title: "Urgent Sales",
          description: "Time-sensitive deals requiring quick action",
          icon: <FiZap className="w-8 h-8" />
        }}
        accentColor="from-red-500 to-orange-400"
      >
        <div className="flex flex-col items-center justify-center py-20 col-span-full">
          <div className="bg-gradient-to-r from-red-50 to-orange-50 p-8 rounded-2xl mb-6">
            <div className="bg-gradient-to-r from-red-500 to-orange-400 p-4 rounded-full">
              <FiZap className="text-white w-12 h-12" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">No Urgent Listings Available</h3>
          <p className="text-gray-600 text-center max-w-md mb-2">
            Currently there are no time-sensitive deals. Check back later for urgent sales.
          </p>
          <p className="text-gray-400 text-sm">New deals are added regularly</p>
        </div>
      </ListingsLayout>
    );
  }

  // Success State
  return (
    <ListingsLayout
      category={{
        title: "Urgent Sales",
        description: "Time-sensitive deals requiring quick action",
        icon: <FiZap className="w-8 h-8" />
      }}
      accentColor="from-red-500 to-orange-400"
      showSearch={false} // We use custom search
    >
      <div className="col-span-full">
        <SearchInput onSearch={(term) => setSearchTerm(term)} />
      </div>

      {filteredListings.length > 0 ? (
        filteredListings.map(item => (
          <ListingCard 
            key={item.id}
            item={item}
            accentColor="bg-gradient-to-r from-red-500 to-orange-400"
          />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center py-12 col-span-full">
          <div className="bg-gray-100 p-6 rounded-2xl mb-4">
            <FiSearch className="text-gray-400 w-12 h-12" />
          </div>
          <p className="text-gray-600 text-lg font-medium">No results match your search.</p>
          <p className="text-gray-400 text-sm mt-1">Try different keywords</p>
        </div>
      )}
    </ListingsLayout>
  );
};

export default UrgentListings;