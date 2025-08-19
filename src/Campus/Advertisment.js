import { useState, useEffect } from 'react';
import { FiCheckCircle, FiStar, FiZap, FiChevronLeft, FiChevronRight, FiShoppingBag } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdvertisementBanner = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [progress, setProgress] = useState(100);
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Fetch VIP listings from API
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get('https://campus-plum.vercel.app/api/vip-listings/');
        setAdvertisements(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to load featured listings. Please try again later.');
        console.error('Error fetching VIP listings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  const handleNext = () => {
    if (advertisements.length === 0) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentAdIndex(prev => (prev + 1) % advertisements.length);
      resetProgress();
      setIsAnimating(false);
    }, 300);
  };

  const handlePrev = () => {
    if (advertisements.length === 0) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentAdIndex(prev => (prev - 1 + advertisements.length) % advertisements.length);
      resetProgress();
      setIsAnimating(false);
    }, 300);
  };

  const resetProgress = () => {
    setProgress(100);
  };

  // Auto-rotation effect
  useEffect(() => {
    if (isPaused || advertisements.length === 0) return;

    const interval = setInterval(() => {
      handleNext();
    }, 8000);

    const progressInterval = setInterval(() => {
      setProgress(prev => Math.max(0, prev - (100 / 8)));
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [isPaused, advertisements]);

  // Reset index when advertisements change
  useEffect(() => {
    setCurrentAdIndex(0);
    resetProgress();
  }, [advertisements]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-gray-50 rounded-3xl shadow-sm min-h-[400px] flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
            <p className="text-lg text-gray-700">Loading featured listings...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl shadow-sm min-h-[400px] flex items-center justify-center p-8">
          <div className="text-center">
            <FiZap className="text-red-500 w-16 h-16 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Unable to Load Ads</h3>
            <p className="text-gray-700 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:from-indigo-700 hover:to-blue-600 transition-all"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (advertisements.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl shadow-sm min-h-[400px] flex items-center justify-center p-8">
          <div className="text-center">
            <FiShoppingBag className="text-indigo-600 w-16 h-16 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Featured Listings Available</h3>
            <p className="text-gray-700">Check back later for exclusive offers and promotions.</p>
          </div>
        </div>
      </div>
    );
  }

  const currentAd = advertisements[currentAdIndex];
  const bgGradients = [
    "from-amber-50 to-orange-50",
    "from-blue-50 to-indigo-50",
    "from-emerald-50 to-green-50",
    "from-violet-50 to-purple-50"
  ];
  const currentBg = bgGradients[currentAdIndex % bgGradients.length];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div 
        className={`relative rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group
          ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'} transition-all duration-300
          bg-gradient-to-br ${currentBg}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 h-1.5 bg-gray-200/50 w-full z-20">
          <div 
            className="h-full bg-gradient-to-r from-indigo-600 to-blue-500 transition-all duration-1000 ease-linear"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Navigation Arrows */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full px-4 flex justify-between z-10">
          <button
            onClick={handlePrev}
            className="p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg hover:bg-white transition-all transform hover:scale-105 active:scale-95"
            aria-label="Previous ad"
          >
            <FiChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={handleNext}
            className="p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg hover:bg-white transition-all transform hover:scale-105 active:scale-95"
            aria-label="Next ad"
          >
            <FiChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {advertisements.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAnimating(true);
                setTimeout(() => {
                  setCurrentAdIndex(index);
                  resetProgress();
                  setIsAnimating(false);
                }, 300);
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentAdIndex 
                  ? 'bg-indigo-600 scale-110' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to ad ${index + 1}`}
            />
          ))}
        </div>

        <div className="flex flex-col lg:flex-row min-h-[400px] md:min-h-[450px] lg:min-h-[350px]">
          {/* Image Section */}
          <div className="relative lg:w-1/2 h-64 md:h-80 lg:h-full group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
            <img 
              src={currentAd.image || 'https://picsum.photos/536/354/?commerce'}
              alt={currentAd.caption}
              className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://picsum.photos/536/354/?commerce';
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 z-20">
              <div className="flex items-center gap-2 mb-2">
                <FiZap className="text-amber-300 w-5 h-5 flex-shrink-0" />
                <span className="text-white text-sm font-medium bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  {currentAd.status || 'Featured Listing'}
                </span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {currentAd.tags?.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:w-1/2 flex flex-col justify-center p-6 lg:p-8">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                  <FiShoppingBag className="text-indigo-600 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900">
                    {currentAd.name || 'Featured Seller'}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded-full">
                      {currentAd.status || 'Verified'}
                    </span>
                    {currentAd.rating && (
                      <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2 py-1 rounded-full">
                        <FiStar className="w-4 h-4" />
                        <span className="text-sm font-medium">{currentAd.rating}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <h3 className="text-2xl md:text-3xl lg:text-[2rem] font-bold text-gray-900 mb-6 leading-tight">
                {currentAd.caption || 'Exclusive Offer for Students'}
              </h3>
            </div>

            <div className="flex flex-col gap-4">
              <Link to={`/listings/${currentAd.id}`} className="block">
                <button className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-8 py-4 rounded-xl hover:from-indigo-700 hover:to-blue-600 transition-all font-bold text-lg shadow-lg hover:shadow-indigo-200/50 active:scale-[0.98] flex items-center justify-center transform hover:-translate-y-0.5">
                  Explore Offer
                </button>
              </Link>
              <div className="flex items-center gap-2 text-gray-700 text-sm">
                <FiCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>Campus-Verified · 24/7 Support · Secure Payments</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertisementBanner;