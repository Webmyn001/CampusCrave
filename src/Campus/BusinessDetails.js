import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiMail, FiUser, FiCalendar, FiMapPin } from 'react-icons/fi';
import axios from 'axios';

const BusinessDetails = () => {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const response = await axios.get(`https://campus-plum.vercel.app/api/vip-listings/${id}`);
        setBusiness(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to load business details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBusiness();
  }, [id]);

  if (loading) return <p className="text-center mt-10 text-gray-700">Loading business details...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!business) return <p className="text-center mt-10 text-gray-700">Business not found.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-10">
      <div className="max-w-5xl mx-auto px-4">
        <Link to="/" className="text-indigo-600 hover:underline mb-6 inline-block">
          &larr; Back to Listings
        </Link>

        {/* Business Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Header Image */}
          <div className="relative">
            <img
              src={business.image || 'https://picsum.photos/1200/600?commerce'}
              alt={business.title}
              className="w-full h-80 md:h-96 lg:h-[500px] object-cover"
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://picsum.photos/1200/600?commerce'; }}
            />
            {/* Overlay Title */}
            <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-6 md:p-10">
              <h1 className="text-white text-3xl md:text-4xl font-bold drop-shadow-lg">{business.title}</h1>
              <p className="text-white text-sm md:text-base mt-1 drop-shadow">{`Member since: ${business.membersince || 'N/A'}`}</p>
            </div>
          </div>

          {/* Business Info */}
          <div className="p-6 md:p-10 space-y-6">
            {/* Description */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">About the Business</h2>
              <p className="text-gray-700 text-base md:text-lg">{business.description || 'No description available.'}</p>
            </div>

            {/* Seller Info */}
            <div className="bg-indigo-50 rounded-xl p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-12 shadow-inner">
              <div className="flex items-center gap-3">
                <FiUser className="text-indigo-600 w-6 h-6" />
                <div>
                  <p className="text-gray-800 font-medium">Seller Name</p>
                  <p className="text-gray-700">{business.name || 'N/A'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FiMail className="text-indigo-600 w-6 h-6" />
                <div>
                  <p className="text-gray-800 font-medium">Email</p>
                  <p className="text-gray-700">{business.email || 'N/A'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FiCalendar className="text-indigo-600 w-6 h-6" />
                <div>
                  <p className="text-gray-800 font-medium">Member Since</p>
                  <p className="text-gray-700">{business.membersince || 'N/A'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FiMapPin className="text-indigo-600 w-6 h-6" />
                <div>
                  <p className="text-gray-800 font-medium">Address</p>
                  <p className="text-gray-700">{business.address || 'N/A'}</p>
                </div>
              </div>
            </div>

          {/* Contact Button */}
{business.id && (
  <div className="mt-6">
    <Link
    to="/contactseller" 
  state={{ service: business }}
      className="inline-block w-full md:w-auto bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-indigo-700 transition-colors"
    >
      Contact Business Owner
    </Link>
  </div>
)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetails;
