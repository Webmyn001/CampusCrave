import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdvertisementBanner = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

      // Ensure it's not the same as current
      if (advertisements.length > 1) {
        while (nextIndex === currentAdIndex) {
          nextIndex = Math.floor(Math.random() * advertisements.length);
        }
      }

      setCurrentAdIndex(nextIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [advertisements, currentAdIndex]);

  if (loading) return <p className="text-center mt-10">Loading featured listings...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (advertisements.length === 0) return <p className="text-center mt-10">No featured listings available.</p>;

  const currentAd = advertisements[currentAdIndex];

  return (
    <div className="mx-auto max-w-4xl p-4">
      <div className="relative shadow-lg rounded-md overflow-hidden">
        {/* Banner Image */}
        <Link to={`/business/${currentAd._id || currentAd.id}`}>
          <img
            src={currentAd.image || 'https://picsum.photos/1600/500?commerce'}
            alt={currentAd.title}
            className="w-full h-72 sm:h-80 md:h-96 lg:h-[500px] object-cover rounded-sm md:rounded-md hover:scale-105 transition-transform duration-300"
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://picsum.photos/1600/500?commerce'; }}
          />
        </Link>

        {/* Footer Extension */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 md:p-6 flex justify-between items-center mt-2 rounded-b-md shadow-lg">
          <div>
            <h3 className="text-white text-lg md:text-xl font-bold">{currentAd.title}</h3>
            <p className="text-white text-sm md:text-base">Member since: {currentAd.membersince}</p>
          </div>
          <Link
            to={`/business/${currentAd._id || currentAd.id}`}
            className="bg-white text-indigo-600 font-semibold px-4 py-2 rounded-full shadow hover:bg-gray-100 transition-colors"
          >
            Click for Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdvertisementBanner;
