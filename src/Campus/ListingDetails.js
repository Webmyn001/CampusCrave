import {
  FiArrowLeft,
  FiHeart,
  FiMail,
  FiMessageSquare,
  FiPhone,
  FiClock,
  FiUser,
  FiMapPin,
  FiCheckCircle,
  FiStar,
  FiShare2,
  FiEye,
  FiTag
} from "react-icons/fi";
import { Link, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const ListingDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const location = useLocation();
  const service = location.state?.item;

  // Mock verification status - in real app, this would come from the service data
  const isVerifiedSeller = service?.sellerInfo?.verified || Math.random() > 0.5;

  useEffect(() => {
    if (service) {
      setLoading(false);
    } else {
      console.log("No service data passed, fetch with id:", id);
      setLoading(false);
    }
  }, [service, id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading listing details...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl max-w-md border border-white/20">
          <div className="w-20 h-20 bg-gradient-to-r from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <FiClock className="h-10 w-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent mb-2">
            Listing Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The listing you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/listings"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 px-6 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <FiArrowLeft className="w-5 h-5" />
            Browse Listings
          </Link>
        </div>
      </div>
    );
  }

  const images = service.images && service.images.length > 0 
    ? service.images 
    : Array.from({ length: 3 }).map((_, i) => ({
        id: `placeholder-${i}`,
        url: `https://picsum.photos/seed/${service.title}-${i}/600/400`,
      }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            to="/listings"
            className="inline-flex items-center gap-3 text-indigo-600 hover:text-indigo-700 transition-all group font-semibold px-5 py-3 rounded-2xl hover:bg-white/50 backdrop-blur-sm border border-transparent hover:border-white/20"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Listings
          </Link>
        </div>

        {/* Main Card Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          {/* Image Gallery */}
          <div className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-6">
              {/* Main Image */}
              <div className="lg:col-span-2 relative group">
                <img
                  src={images[activeImage].url}
                  alt={service.title}
                  className="w-full h-80 lg:h-96 object-cover rounded-2xl shadow-lg transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <span className="px-3 py-1.5 bg-black/70 text-white rounded-full text-sm backdrop-blur-sm">
                    <FiEye className="inline w-4 h-4 mr-1" />
                    {Math.floor(Math.random() * 100) + 50} views
                  </span>
                </div>
                
                {/* Favorite Button */}
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`absolute top-6 right-6 p-3 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-110 ${
                    isFavorite
                      ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white animate-pulse"
                      : "bg-white/90 backdrop-blur-sm text-gray-600 hover:bg-white"
                  }`}
                >
                  <FiHeart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
                {images.slice(0, 2).map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setActiveImage(index + 1)}
                    className={`relative group rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ${
                      activeImage === index + 1 ? 'ring-2 ring-indigo-500 ring-offset-2' : ''
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={`${service.title} ${index + 2}`}
                      className="w-full h-36 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-8 space-y-8">
            {/* Title + Price + Actions */}
            <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-indigo-900 bg-clip-text text-transparent">
                    {service.title}
                  </h1>
                  <button className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors">
                    <FiShare2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 rounded-xl text-sm font-semibold border border-blue-200">
                    <FiTag className="inline w-4 h-4 mr-2" />
                    {service.condition || "Excellent"} Condition
                  </span>
                  <span className="px-4 py-2 bg-gradient-to-r from-emerald-100 to-emerald-50 text-emerald-700 rounded-xl text-sm font-semibold border border-emerald-200">
                    <FiCheckCircle className="inline w-4 h-4 mr-2" />
                    Available Now
                  </span>
                  {service.category && (
                    <span className="px-4 py-2 bg-gradient-to-r from-purple-100 to-purple-50 text-purple-700 rounded-xl text-sm font-semibold border border-purple-200">
                      {service.category}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-1 rounded-2xl shadow-2xl">
                <div className="bg-white rounded-xl p-6 text-center min-w-[140px]">
                  <p className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    ₦{service.price || "0"}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">Negotiable</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                <FiMessageSquare className="text-indigo-600 w-6 h-6" /> 
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {service.description || "No description available."}
              </p>
            </div>

            {/* Contact & Time Info */}
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                  <FiPhone className="text-blue-600 w-6 h-6" /> 
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 bg-white/80 p-4 rounded-xl shadow-sm">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <FiMail className="text-blue-600 w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Preferred Contact</p>
                      <p className="font-semibold text-gray-900">{service.contactMethod || "Message"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-white/80 p-4 rounded-xl shadow-sm">
                    <div className="p-3 bg-amber-100 rounded-xl">
                      <FiClock className="text-amber-600 w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Time Left</p>
                      <p className="font-semibold text-gray-900">
                        {Math.floor(service.secondsLeft / 3600)}h {Math.floor((service.secondsLeft % 3600) / 60)}m
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Action */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100 shadow-sm flex flex-col justify-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Ready to Buy?</h3>
                <Link to="/contactseller" state={{ service }}>
                  <button className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3">
                    <FiMessageSquare className="w-5 h-5" /> 
                    Contact Seller Now
                  </button>
                </Link>
                <p className="text-center text-sm text-gray-600 mt-3">Response usually within minutes</p>
              </div>
            </div>

            {/* Seller Information */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                <FiUser className="text-indigo-600 w-6 h-6" /> 
                Seller Information
                {isVerifiedSeller && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-sm font-semibold">
                    <FiCheckCircle className="w-4 h-4" />
                    Verified Seller
                  </span>
                )}
              </h2>
              
              <div className="flex flex-col lg:flex-row gap-6 items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {service.sellerInfo?.email || "Unknown Seller"}
                    </h3>
                    {isVerifiedSeller && (
                      <FiCheckCircle className="w-6 h-6 text-green-500" />
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <p className="text-gray-700 flex items-center gap-3">
                      <FiMapPin className="text-red-500 w-5 h-5" />
                      {service.sellerInfo?.hostel || "Campus Location"}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Member since {service.sellerInfo?.formattedMemberSince || "2024"}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      <span className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-xl text-sm font-semibold">
                        {service.sellerInfo?.course || "Student"}
                      </span>
                      <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-xl text-sm font-semibold">
                        Part {service.sellerInfo?.year || "Unknown"}
                      </span>
                      <span className="px-4 py-2 bg-amber-100 text-amber-700 rounded-xl text-sm font-semibold flex items-center gap-1">
                        <FiStar className="w-4 h-4 fill-amber-400 text-amber-400" />
                        4.8 (24 reviews)
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-2xl text-center min-w-[120px] border border-indigo-100">
                  <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-2xl font-bold text-2xl mx-auto shadow-lg">
                    {service.sellerInfo?.email?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <p className="mt-3 text-xs text-gray-600 font-semibold">Seller Rating</p>
                  <div className="flex justify-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className={`w-4 h-4 ${i < 4 ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-4 shadow-2xl lg:hidden">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-3 rounded-xl shadow-lg transition-all ${
                  isFavorite
                    ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                <FiHeart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
              <div>
                <p className="font-bold text-indigo-600 text-lg">₦{service.price}</p>
                <p className="text-sm text-gray-600 line-clamp-1">{service.title}</p>
              </div>
            </div>
            <Link to="/contactseller" state={{ service }}>
              <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all">
                <FiMessageSquare className="w-4 h-4" /> Contact
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;