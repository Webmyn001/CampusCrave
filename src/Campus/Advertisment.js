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
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-600 font-medium text-lg">Loading featured listings...</p>
      </div>
    );
  }

  if (error) return (
    <div className="flex justify-center mt-10 px-4">
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center max-w-md w-full">
        <p className="text-red-600 font-medium text-lg">{error}</p>
      </div>
    </div>
  );
  
  if (advertisements.length === 0) {
    return (
      <div className="flex justify-center mt-3 mb-5 px-4">
        <div className="max-w-md w-full bg-gradient-to-br from-gray-50 to-gray-100 shadow-xl rounded-3xl p-8 text-center border border-gray-200">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">No Featured Listings</h2>
          <p className="text-gray-600 text-lg">Check back later for new featured listings</p>
        </div>
      </div>
    );
  }

  const currentAd = advertisements[currentAdIndex];

  return (
    <div className="mx-auto max-w-6xl p-4 md:p-6">
      <div className="relative group">
        {/* Banner Image Container */}
        <div className="relative overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl">
          <Link to={`/business/${currentAd._id}`} className="block relative">
            <img
              src={currentAd.images?.[0]?.url || 'https://picsum.photos/1600/500?commerce'}
              alt={currentAd.businessName}
              className="w-full h-64 sm:h-72 md:h-80 lg:h-96 xl:h-[500px] object-cover transition-all duration-500 ease-in-out transform hover:scale-105"
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://picsum.photos/1600/500?commerce'; }}
            />
          </Link>
        </div>

        {/* Simple Compact Footer */}
        <div className="bg-white rounded-b-2xl md:rounded-b-3xl shadow-lg -mt-2 relative z-10 border-t border-gray-100">
          <div className="p-2 md:p-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              {/* Business Info - Compact */}
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  {/* Small Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                      <span className="text-white font-bold text-sm">
                        {currentAd.businessName?.charAt(0) || 'B'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 truncate">
                      {currentAd.businessName}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <svg className="w-3 h-3 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      <span>Since {formatDate(currentAd.sellerInfo?.formattedMemberSince)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Compact CTA Button */}
              <div className="flex-shrink-0">
                <Link
                  to={`/business/${currentAd._id}`}
                  className="inline-flex items-center justify-center px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-sm rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 hover:from-blue-700 hover:to-purple-700"
                >
                  View Details
                  <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertisementBanner;