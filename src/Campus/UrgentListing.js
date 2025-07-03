// UrgentListings.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ListingsLayout, ListingCard } from './ListingLayout';
import { FiZap, FiLoader, FiAlertCircle } from 'react-icons/fi';

const UrgentListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/listings');
        setListings(response.data);
      } catch (err) {
        setError(err.message || 'Failed to load urgent listings');
        console.error('Error fetching listings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

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
        <div className="flex flex-col items-center justify-center py-12">
          <FiLoader className="animate-spin text-orange-500 w-12 h-12 mb-4" />
          <p className="text-orange-600 font-medium">Loading urgent items...</p>
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
        <div className="flex flex-col items-center justify-center py-12">
          <FiAlertCircle className="text-red-500 w-12 h-12 mb-4" />
          <p className="text-red-500 font-medium mb-2">Error loading listings</p>
          <p className="text-gray-600 text-center max-w-md">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-gradient-to-r from-red-500 to-orange-400 hover:from-red-600 hover:to-orange-500 text-white py-2 px-6 rounded-lg font-medium transition-all"
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
        <div className="flex flex-col items-center justify-center py-12">
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

  // Success State
  return (
    <ListingsLayout
      category={{
        title: "Urgent Sales",
        description: "Time-sensitive deals requiring quick action",
        icon: <FiZap className="w-8 h-8" />
      }}
      accentColor="from-red-500 to-orange-400"
    >
      {listings.map(item => (
        <ListingCard 
          key={item.id}
          item={item}
          accentColor="bg-gradient-to-r from-red-500 to-orange-400"
        />
      ))}
    </ListingsLayout>
  );
};

export default UrgentListings;