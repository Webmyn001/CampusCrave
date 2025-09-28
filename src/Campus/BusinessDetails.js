import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiMail, FiUser, FiCalendar, FiMapPin, FiClock, FiPhone, FiCheckCircle, FiStar, FiShare2, FiHeart } from 'react-icons/fi';
import axios from 'axios';

const BusinessDetails = () => {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [hoveredField, setHoveredField] = useState(null);

  // Format date from "DD/MM/YYYY HH:mm" to "MMM DD, YYYY"
  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const [day, month, year] = dateStr.split(' ')[0].split('/');
    const date = new Date(`${year}-${month}-${day}`);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Truncate text function
  const truncateText = (text, maxLength = 25) => {
  if (!text || text === 'N/A') return 'N/A';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};
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

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-700 text-lg font-medium">Loading business details...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
      <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20">
        <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <FiStar className="w-8 h-8 text-red-600" />
        </div>
        <p className="text-red-500 text-xl font-semibold">{error}</p>
        <Link to="/" className="inline-block mt-4 bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors">
          Back to Home
        </Link>
      </div>
    </div>
  );
  
  if (!business) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
      <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20">
        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <FiUser className="w-8 h-8 text-gray-600" />
        </div>
        <p className="text-gray-700 text-xl font-semibold">Business not found</p>
        <Link to="/" className="inline-block mt-4 bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors">
          Browse Other Businesses
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link 
            to="/" 
            className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm border border-white/20"
          >
            ← Back to listings
          </Link>
        </nav>

        {/* Business Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          {/* Main Header Image */}
          <div className="relative">
            <img
              src={business.images?.[0]?.url || 'https://picsum.photos/1200/600?commerce'}
              alt={business.businessName}
              className="w-full h-80 md:h-96 lg:h-[500px] object-cover"
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://picsum.photos/1200/600?commerce'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-10">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold drop-shadow-2xl">
                      {business.businessName}
                    </h1>
                    {/* Verified Badge */}
                    {business.sellerInfo?.verified && (
                      <div className="flex items-center gap-1 bg-green-500/20 backdrop-blur-sm px-3 py-1 rounded-full border border-green-400/30">
                        <FiCheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-green-300 text-sm font-medium">Verified</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-white/90 text-sm md:text-base drop-shadow">
                    <span className="flex items-center gap-1">
                      <FiCalendar className="w-4 h-4" />
                      Member since: {formatDate(business.sellerInfo?.formattedMemberSince)}
                    </span>
                    {/* Rating Badge */}
                    <span className="flex items-center gap-1 bg-yellow-500/20 backdrop-blur-sm px-2 py-1 rounded-full">
                      <FiStar className="w-3 h-3 text-yellow-400" />
                      <span>4.8</span>
                    </span>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button 
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-3 rounded-xl backdrop-blur-sm border transition-all ${
                      isLiked 
                        ? 'bg-red-500/20 border-red-400/30 text-red-400' 
                        : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                    }`}
                  >
                    <FiHeart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-3 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all">
                    <FiShare2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          {business.images && business.images.length > 1 && (
            <div className="py-8 md:py-12 px-6 md:px-12 border-b border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Gallery
                </h2>
                <span className="text-gray-500 text-sm">
                  {business.images.length} photos
                </span>
              </div>
              <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
                {business.images.map((img, index) => (
                  <div key={index} className="relative group flex-shrink-0">
                    <img
                      src={img.url || 'https://picsum.photos/300/200'}
                      alt={`Business ${index + 1}`}
                      className="w-64 h-40 object-cover rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => { e.target.onerror = null; e.target.src = 'https://picsum.photos/300/200'; }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-2xl transition-all duration-300"></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Business Info */}
          <div className="p-6 md:p-12 space-y-8">
            {/* About Section */}
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                About the Business
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                {business.fullDescription || 'No description available.'}
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Email */}
<div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 shadow-sm border border-indigo-100 group hover:shadow-md transition-all">
  <div className="flex items-center gap-4">
    <div className="p-3 bg-indigo-100 rounded-xl group-hover:scale-110 transition-transform">
      <FiMail className="text-indigo-600 w-6 h-6" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-gray-600 text-sm font-medium">Email</p>
      <div 
        className="relative"
        onMouseEnter={() => setHoveredField('email')}
        onMouseLeave={() => setHoveredField(null)}
      >
        <p className={`text-gray-800 font-semibold ${business.businessEmail && business.businessEmail.length > 22 ? 'truncate' : ''}`}>
          {business.businessEmail || 'N/A'}
        </p>
        {/* Tooltip */}
        {hoveredField === 'email' && business.businessEmail && business.businessEmail.length > 22 && (
          <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-10 whitespace-nowrap">
            {business.businessEmail}
            <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
          </div>
        )}
      </div>
    </div>
  </div>
</div>

{/* Contact Method */}
<div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 shadow-sm border border-green-100 group hover:shadow-md transition-all">
  <div className="flex items-center gap-4">
    <div className="p-3 bg-green-100 rounded-xl group-hover:scale-110 transition-transform">
      <FiPhone className="text-green-600 w-6 h-6" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-gray-600 text-sm font-medium">Contact Method</p>
      <div 
        className="relative"
        onMouseEnter={() => setHoveredField('contactMethod')}
        onMouseLeave={() => setHoveredField(null)}
      >
        <p className={`text-gray-800 font-semibold ${business.contactMethod && business.contactMethod.length > 22 ? 'truncate' : ''}`}>
          {business.contactMethod || 'N/A'}
        </p>
        {/* Tooltip */}
        {hoveredField === 'contactMethod' && business.contactMethod && business.contactMethod.length > 22 && (
          <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-10 whitespace-nowrap">
            {business.contactMethod}
            <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
          </div>
        )}
      </div>
    </div>
  </div>
</div>

{/* Working Hours */}
<div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 shadow-sm border border-amber-100 group hover:shadow-md transition-all">
  <div className="flex items-center gap-4">
    <div className="p-3 bg-amber-100 rounded-xl group-hover:scale-110 transition-transform">
      <FiClock className="text-amber-600 w-6 h-6" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-gray-600 text-sm font-medium">Working Hours</p>
      <div 
        className="relative"
        onMouseEnter={() => setHoveredField('workingHours')}
        onMouseLeave={() => setHoveredField(null)}
      >
        <p className={`text-gray-800 font-semibold ${business.workingHours && business.workingHours.length > 22 ? 'truncate' : ''}`}>
          {business.workingHours || 'N/A'}
        </p>
        {/* Tooltip */}
        {hoveredField === 'workingHours' && business.workingHours && business.workingHours.length > 22 && (
          <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-10 whitespace-nowrap">
            {business.workingHours}
            <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
          </div>
        )}
      </div>
    </div>
  </div>
</div>

{/* Business Address */}
<div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 shadow-sm border border-purple-100 group hover:shadow-md transition-all">
  <div className="flex items-center gap-4">
    <div className="p-3 bg-purple-100 rounded-xl group-hover:scale-110 transition-transform">
      <FiMapPin className="text-purple-600 w-6 h-6" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-gray-600 text-sm font-medium">Business Address</p>
      <div 
        className="relative"
        onMouseEnter={() => setHoveredField('address')}
        onMouseLeave={() => setHoveredField(null)}
      >
        <p className={`text-gray-800 font-semibold ${business.address && business.address.length > 22 ? 'truncate' : ''}`}>
          {business.address || 'N/A'}
        </p>
        {/* Tooltip */}
        {hoveredField === 'address' && business.address && business.address.length > 22 && (
          <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-10 max-w-xs break-words whitespace-normal">
            {business.address}
            <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
          </div>
        )}
      </div>
    </div>
  </div>
</div>

{/* Business Owner */}
<div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 shadow-sm border border-blue-100 group hover:shadow-md transition-all">
  <div className="flex items-center gap-4">
    <div className="p-3 bg-blue-100 rounded-xl group-hover:scale-110 transition-transform">
      <FiUser className="text-blue-600 w-6 h-6" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-gray-600 text-sm font-medium">Business Owner</p>
      <div className="flex items-center gap-2">
        <div 
          className="relative"
          onMouseEnter={() => setHoveredField('owner')}
          onMouseLeave={() => setHoveredField(null)}
        >
          <p className={`text-gray-800 font-semibold ${business.sellerInfo?.name && business.sellerInfo.name.length > 18 ? 'truncate' : ''}`}>
            {business.sellerInfo?.name || 'N/A'}
          </p>
          {/* Tooltip */}
          {hoveredField === 'owner' && business.sellerInfo?.name && business.sellerInfo.name.length > 18 && (
            <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-10 whitespace-nowrap">
              {business.sellerInfo.name}
              <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
            </div>
          )}
        </div>
        {/* Owner Verified Badge */}
        {business.sellerInfo?.verified && (
          <FiCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
        )}
      </div>
    </div>
  </div>
</div>
              {/* Additional Info Card */}
              <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-6 shadow-sm border border-gray-100 group hover:shadow-md transition-all">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gray-100 rounded-xl group-hover:scale-110 transition-transform">
                    <FiStar className="text-gray-600 w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Business Status</p>
                    <p className="text-gray-800 font-semibold">Active & Operating</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Button */}
            {business.id && (
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
                <Link
                  to="/contactseller"
                  state={{ service: business }}
                  className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl hover:shadow-indigo-500/25 hover:scale-105"
                >
                  <FiMail className="w-5 h-5" />
                  Contact Business Owner
                </Link>
                
                <button className="inline-flex items-center justify-center gap-3 bg-white text-gray-700 px-8 py-4 rounded-2xl font-semibold border-2 border-gray-200 hover:border-indigo-300 hover:bg-gray-50 transition-all">
                  <FiPhone className="w-5 h-5" />
                  Call Now
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Trust Badges Section */}
        <div className="mt-8 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
          <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Why Choose This Business?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <FiCheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Verified Business</h4>
              <p className="text-gray-600 text-sm">Thoroughly checked and approved</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <FiStar className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Premium Quality</h4>
              <p className="text-gray-600 text-sm">High standards guaranteed</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <FiUser className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Trusted Owner</h4>
              <p className="text-gray-600 text-sm">Reliable and professional service</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetails;