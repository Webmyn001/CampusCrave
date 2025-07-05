// PremiumListings.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ListingsLayout, ListingCard } from './ListingLayout';
import { FiStar, FiLoader, FiAlertCircle } from 'react-icons/fi';

const PremiumListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPremiumListings = async () => {
      try {
        const response = await axios.get('https://campus-plum.vercel.app/api/pro-listings');
        
        setListings(response.data);
      } catch (err) {
        setError(err.message || 'Failed to load premium listings');
        console.error('Error fetching premium listings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPremiumListings();
  }, []);

  if (loading) {
    return (
      <ListingsLayout
        category={{
          title: "Premium Listings",
          description: "Exclusive high-value items with premium services",
          icon: <FiStar className="w-8 h-8" />
        }}
        accentColor="from-purple-600 to-blue-500"
      >
        <div className="flex flex-col items-center justify-center py-12">
          <FiLoader className="animate-spin text-purple-600 w-12 h-12 mb-4" />
          <p className="text-purple-700 font-medium">Loading premium items...</p>
        </div>
      </ListingsLayout>
    );
  }

  if (error) {
    return (
      <ListingsLayout
        category={{
          title: "Premium Listings",
          description: "Exclusive high-value items with premium services",
          icon: <FiStar className="w-8 h-8" />
        }}
        accentColor="from-purple-600 to-blue-500"
      >
        <div className="flex flex-col items-center justify-center py-12">
          <FiAlertCircle className="text-red-500 w-12 h-12 mb-4" />
          <p className="text-red-500 font-medium mb-2">Error loading listings</p>
          <p className="text-gray-600 text-center max-w-md">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white py-2 px-6 rounded-lg font-medium transition-all"
          >
            Try Again
          </button>
        </div>
      </ListingsLayout>
    );
  }

  if (listings.length === 0) {
    return (
      <ListingsLayout
        category={{
          title: "Premium Listings",
          description: "Exclusive high-value items with premium services",
          icon: <FiStar className="w-8 h-8" />
        }}
        accentColor="from-purple-600 to-blue-500"
      >
        <div className="flex flex-col items-center justify-center py-12">
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-full mb-4">
            <FiStar className="text-purple-600 w-12 h-12" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">No Premium Listings Available</h3>
          <p className="text-gray-600 text-center max-w-md">
            Currently there are no premium listings. Check back later for exclusive items.
          </p>
        </div>
      </ListingsLayout>
    );
  }

  return (
    <ListingsLayout
      category={{
        title: "Premium Listings",
        description: "Exclusive high-value items with premium services",
        icon: <FiStar className="w-8 h-8" />
      }}
      accentColor="from-purple-600 to-blue-500"
    >
      {listings.map(item => (
        <ListingCard 
          key={item.id}
          item={item}
          accentColor="bg-gradient-to-r from-purple-600 to-blue-500"
        />
      ))}
    </ListingsLayout>
  );
};

export default PremiumListings;