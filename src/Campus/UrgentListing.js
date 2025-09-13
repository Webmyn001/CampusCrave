// UrgentListings.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ListingsLayout, ListingCard } from './ListingLayout';
import { FiZap, FiLoader, FiAlertCircle } from 'react-icons/fi';

const UrgentListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get('https://campus-plum.vercel.app/api/listings');
        setListings(response.data);
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

  // Loading
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
        <div className="flex flex-col items-center justify-center py-12 col-span-full">
          <FiLoader className="animate-spin text-orange-500 w-12 h-12 mb-4" />
          <p className="text-orange-600 font-medium">Loading urgent items...</p>
        </div>
      </ListingsLayout>
    );
  }

  // Error
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
        <div className="flex flex-col items-center justify-center py-12 col-span-full">
          <FiAlertCircle className="text-red-500 w-12 h-12 mb-4" />
          <p className="text-red-500 font-medium mb-2">Error loading listings</p>
          <p className="text-gray-600 text-center max-w-md">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-gradient-to-r from-red-500 to-orange-400 text-white py-2 px-6 rounded-lg font-medium transition-all"
          >
            Try Again
          </button>
        </div>
      </ListingsLayout>
    );
  }

  // Empty
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
        <div className="flex flex-col items-center justify-center py-12 col-span-full">
          <div className="bg-gradient-to-r from-red-100 to-orange-100 p-6 rounded-full mb-4">
            <FiZap className="text-orange-500 w-12 h-12" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">No Urgent Listings Available</h3>
          <p className="text-gray-600 text-center max-w-md">
            Currently there are no time-sensitive deals. Check back later for urgent sales.
          </p>
        </div>
      </ListingsLayout>
    );
  }

  // Success
  return (
    <ListingsLayout
      category={{
        title: "Urgent Sales",
        description: "Time-sensitive deals requiring quick action",
        icon: <FiZap className="w-8 h-8" />
      }}
      accentColor="from-red-500 to-orange-400"
      showSearch={true}
      onSearch={(term) => setSearchTerm(term)}
    >
      {filteredListings.length > 0 ? (
        filteredListings.map(item => (
          <ListingCard 
            key={item.id}
            item={item}
            accentColor="bg-gradient-to-r from-red-500 to-orange-400"
          />
        ))
      ) : (
        <p className="text-gray-600 text-center w-full col-span-full">No results match your search.</p>
      )}
    </ListingsLayout>
  );
};

export default UrgentListings;
