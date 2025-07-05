// VipServicesListings.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ListingsLayout, ListingCard } from './ListingLayout';
import { FiShoppingBag, FiLoader, FiAlertCircle } from 'react-icons/fi';

const VipServicesListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVipServices = async () => {
      try {
        const response = await axios.get('https://campus-plum.vercel.app/api/vip-listings');
        
       
        
        setListings(response.data);
      } catch (err) {
        setError(err.message || 'Failed to load VIP services');
        console.error('Error fetching VIP services:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVipServices();
  }, []);

  if (loading) {
    return (
      <ListingsLayout
        category={{
          title: "VIP Services",
          description: "Exclusive premium services for discerning clients",
          icon: <FiShoppingBag className="w-8 h-8" />
        }}
        accentColor="from-amber-600 to-yellow-400"
      >
        <div className="flex flex-col items-center justify-center py-12">
          <FiLoader className="animate-spin text-amber-500 w-12 h-12 mb-4" />
          <p className="text-amber-600 font-medium">Loading premium services...</p>
        </div>
      </ListingsLayout>
    );
  }

  if (error) {
    return (
      <ListingsLayout
        category={{
          title: "VIP Services",
          description: "Exclusive premium services for discerning clients",
          icon: <FiShoppingBag className="w-8 h-8" />
        }}
        accentColor="from-amber-600 to-yellow-400"
      >
        <div className="flex flex-col items-center justify-center py-12">
          <FiAlertCircle className="text-red-500 w-12 h-12 mb-4" />
          <p className="text-red-500 font-medium mb-2">Error loading services</p>
          <p className="text-gray-600 text-center max-w-md">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-700 hover:to-yellow-600 text-white py-2 px-6 rounded-lg font-medium transition-all"
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
          title: "VIP Services",
          description: "Exclusive premium services for discerning clients",
          icon: <FiShoppingBag className="w-8 h-8" />
        }}
        accentColor="from-amber-600 to-yellow-400"
      >
        <div className="flex flex-col items-center justify-center py-12">
          <div className="bg-gradient-to-r from-amber-100 to-yellow-100 p-6 rounded-full mb-4">
            <FiShoppingBag className="text-amber-600 w-12 h-12" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">No Premium Services Available</h3>
          <p className="text-gray-600 text-center max-w-md mb-4">
            Currently there are no VIP services listed. Check back later or contact us to feature your premium service.
          </p>
          <button className="bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-700 hover:to-yellow-600 text-white py-2 px-6 rounded-lg font-medium transition-all">
            Suggest a Service
          </button>
        </div>
      </ListingsLayout>
    );
  }

  return (
    <ListingsLayout
      category={{
        title: "VIP Services",
        description: "Exclusive premium services for discerning clients",
        icon: <FiShoppingBag className="w-8 h-8" />
      }}
      accentColor="from-amber-600 to-yellow-400"
    >
      {listings.map(item => (
        <ListingCard 
          key={item.id}
          item={item}
          accentColor="bg-gradient-to-r from-amber-600 to-yellow-400"
        />
      ))}
    </ListingsLayout>
  );
};

export default VipServicesListings;