import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdvertisementBanner = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to format backend date
  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    // dateStr format: "22/08/2025 18:25"
    const [datePart] = dateStr.split(' ');
    const [day, month, year] = datePart.split('/');
    const dateObj = new Date(`${year}-${month}-${day}`);
    return dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Fetch advertisements
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get('https://campus-plum.vercel.app/api/vip-listings/');
        setAdvertisements(response.data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Failed to load featured listings.');
      } finally {
        setLoading(false);
      }
    };
    fetchAds();
  }, []);

  // Auto-rotate randomly every 5 seconds
  useEffect(() => {
    if (advertisements.length === 0) return;

    const interval = setInterval(() => {
      let nextIndex = Math.floor(Math.random() * advertisements.length);

      if (advertisements.length > 1) {
        while (nextIndex === currentAdIndex) {
          nextIndex = Math.floor(Math.random() * advertisements.length);
        }
      }

      setCurrentAdIndex(nextIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [advertisements, currentAdIndex]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center mt-2 space-y-3">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-600 font-medium">Loading featured listings...</p>
      </div>
    );
  }

  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (advertisements.length === 0) {
    return (
      <div className="flex justify-center mt-3 mb-5 px-4">
        <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-6 text-center border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No Featured Listings</h2>
          <p className="text-gray-500">Please check back later, new featured listings will appear here soon.</p>
        </div>
      </div>
    );
  }

  const currentAd = advertisements[currentAdIndex];

  return (
    <div className="mx-auto max-w-4xl p-4">
      <div className="relative shadow-lg rounded-md overflow-hidden">
        {/* Banner Image */}
        <Link to={`/business/${currentAd._id}`}>
          <img
            src={currentAd.images?.[0]?.url || 'https://picsum.photos/1600/500?commerce'}
            alt={currentAd.businessName}
            className="w-full h-72 sm:h-80 md:h-96 lg:h-[420px] object-cover rounded-sm md:rounded-md hover:scale-105 transition-transform duration-300"
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://picsum.photos/1600/500?commerce'; }}
          />
        </Link>

        {/* Footer Extension */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center mt-2 rounded-b-xl shadow-lg">
          {/* Business Info */}
          <div className="mb-3 md:mb-0">
            <h3 className="text-white text-lg md:text-2xl font-extrabold drop-shadow-md">{currentAd.businessName}</h3>
            <p className="text-white text-sm md:text-base mt-1 drop-shadow">
              Member since: {formatDate(currentAd.sellerInfo?.formattedMemberSince)}
            </p>
          </div>

          {/* CTA Button */}
          <Link
            to={`/business/${currentAd._id}`}
            className="bg-white text-indigo-600 font-semibold px-5 py-2 md:py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdvertisementBanner;
