import { FiArrowLeft, FiMail, FiMessageSquare, FiPhone, FiClock, FiUser, FiMapPin, FiCheckCircle, FiTag, FiShare2, FiHeart } from "react-icons/fi";
import { Link, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const ListingDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const location = useLocation();
  const service = location.state?.product;

  const isVerifiedSeller = service?.sellerInfo?.verified || Math.random() > 0.5;

  function formatNaira(value) {
    const cleaned = String(value ?? 0).replace(/[^0-9.-]+/g, '');
    const num = Number(cleaned);
    if (Number.isNaN(num)) return String(value ?? '0');
    return new Intl.NumberFormat('en-NG', { maximumFractionDigits: 0 }).format(num);
  }

  const days = Math.floor(service?.secondsLeft / (24 * 3600)) || 0;
  const hours = Math.floor((service?.secondsLeft % (24 * 3600)) / 3600) || 0;
  const minutes = Math.floor((service?.secondsLeft % 3600) / 60) || 0;

  function formatMonthYear(dateString) {
    if (!dateString) return "";
    const [day, month, year] = dateString.split(" ")[0].split("/");
    const date = new Date(`${year}-${month}-${day}`);
    const formatted = date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
    return formatted.replace(" ", ", ");
  }

  const initials =
    service?.sellerInfo?.name
      ?.split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase() || "NA";

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading listing details...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="text-center p-8 bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl max-w-md border border-white/20">
          <div className="w-20 h-20 bg-gradient-to-r from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <FiClock className="h-10 w-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent mb-3">
            Listing Not Found
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            The listing you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/listings"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 px-8 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
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
    : Array.from({ length: 1 }).map((_, i) => ({
        id: `placeholder-${i}`,
        url: `https://picsum.photos/seed/${service.title}-${i}/600/400`,
      }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Main Card Container */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          {/* Image Gallery */}
          <div className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
              {/* Main Image */}
              <div className={`${images.length > 1 ? 'lg:col-span-2' : 'lg:col-span-3'} relative group`}>
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src={images[activeImage].url}
                    alt={service.title}
                    className="w-full h-64 sm:h-80 md:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => { 
                      e.target.onerror = null; 
                      e.target.src = 'https://picsum.photos/600/400?commerce'; 
                    }}
                  />
                  
                  {/* Sold Out Overlay */}
                  {service.soldOut && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-2xl">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                          <FiCheckCircle className="h-8 w-8 text-white" />
                        </div>
                        <span className="text-white text-3xl font-bold tracking-widest uppercase">
                          Sold Out
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Thumbnail Images */}
              {images.length > 1 && (
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-1 lg:gap-4">
                  {images.slice(0, 2).map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => setActiveImage(index + 1)}
                      className={`relative group rounded-xl overflow-hidden shadow-lg transition-all duration-300 transform hover:scale-105 ${
                        activeImage === index + 1 
                          ? 'ring-3 ring-indigo-500 ring-offset-2' 
                          : 'ring-1 ring-gray-200'
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={`${service.title} ${index + 2}`}
                        className="w-full h-24 sm:h-32 object-cover"
                      />
                      <div className={`absolute inset-0 transition-all duration-300 ${
                        activeImage === index + 1 ? 'bg-indigo-500/20' : 'bg-black/0 group-hover:bg-black/10'
                      }`}></div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Details Section */}
          <div className="p-6 md:p-8 space-y-8">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1 space-y-4">
                <div className="space-y-3">
                  <h1 className="text-xl sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-gray-900 to-indigo-900 bg-clip-text text-transparent leading-tight">
                    {service.title}
                  </h1>
                  
                  {/* Badges */}
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 rounded-xl text-sm font-semibold border border-blue-200 flex items-center gap-1">
                      <FiTag className="w-4 h-4" />
                      {service.condition || "Excellent"} Condition
                    </span>
                   {service.soldOut ? (
  <span className="px-3 py-1.5 bg-gradient-to-r from-red-100 to-red-50 text-red-700 rounded-xl text-sm font-semibold border border-red-200 flex items-center gap-1 animate-pulse transition-all duration-500">
    <FiCheckCircle className="w-4 h-4 text-red-600 animate-pulse" />
    Not Available
  </span>
) : (
  <span className="px-3 py-1.5 bg-gradient-to-r from-emerald-100 to-emerald-50 text-emerald-700 rounded-xl text-sm font-semibold border border-emerald-200 flex items-center gap-1 transition-all duration-500">
    <FiCheckCircle className="w-4 h-4 text-emerald-600" />
    Available Now
  </span>
)}
                    {service.type && (
                      <span className="px-3 py-1.5 bg-gradient-to-r from-purple-100 to-purple-50 text-purple-700 rounded-xl text-sm font-semibold border border-purple-200">
                        {service.type}
                      </span>
                    )}
                  </div>
                </div>

                {/* Price */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-1 rounded-2xl shadow-xl w-fit">
                  <div className="bg-white rounded-xl p-6 text-center min-w-[200px]">
                    <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      ₦{formatNaira(service?.price)}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">Negotiable</p>
                  </div>
                </div>
              </div>

             
            </div>

            {/* Description */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <FiMessageSquare className="text-indigo-600 w-5 h-5" />
                </div>
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm">
                {service.description || "No description available."}
              </p>
            </div>

            {/* Contact & Action Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Contact Information */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FiPhone className="text-blue-600 w-5 h-5" />
                  </div>
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 bg-white/80 p-4 rounded-xl shadow-sm">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <FiMail className="text-blue-600 w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Preferred Contact</p>
                      <p className="font-semibold text-gray-900 text-sm">
                        {service.contactMethod || "Message"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-white/80 p-4 rounded-xl shadow-sm">
                    <div className="p-3 bg-amber-100 rounded-xl">
                      <FiClock className="text-amber-600 w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Time Left</p>
                      <p className="font-semibold text-gray-900 text-lg">
                        {days}d {hours}h {minutes}m
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Action */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100 shadow-sm flex flex-col justify-center">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Buy?</h3>
                  <p className="text-gray-600">Connect with the seller directly</p>
                </div>
                <Link to="/contactseller" state={{ service }}>
                  <button className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 text-lg transform hover:scale-105">
                    <FiMessageSquare className="w-5 h-5" />
                    Contact Seller Now
                  </button>
                </Link>
                <p className="text-center text-sm text-gray-600 mt-3">
                  Response usually within minutes
                </p>
              </div>
            </div>

            {/* Seller Information */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <FiUser className="text-indigo-600 w-5 h-5" />
                  </div>
                  Seller Information
                </h2>
                {service.isUserVerified && (
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-sm font-semibold">
                    <FiCheckCircle className="w-4 h-4" />
                    Verified Seller
                  </span>
                )}
              </div>
              
              <div className="flex flex-col lg:flex-row gap-6 items-start">
                {/* Seller Avatar */}
                <div className="flex-shrink-0">
                  {service?.sellerInfo?.profilePhoto?.url ? (
                    <img
                      src={service.sellerInfo.profilePhoto.url}
                      alt={service.title}
                      className="w-20 h-20 rounded-2xl object-cover shadow-lg"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/150?text=Avatar";
                      }}
                    />
                  ) : (
                    <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-2xl font-bold text-2xl shadow-lg">
                      {initials}
                    </div>
                  )}
                </div>

                {/* Seller Details */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {service.sellerInfo?.name || "Unknown Seller"}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Member since: {formatMonthYear(service.sellerInfo?.formattedMemberSince) || "2025"}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <p className="text-gray-700 text-sm flex items-center gap-3">
                      <FiMapPin className="text-red-500 w-5 h-5 flex-shrink-0" />
                      {service.sellerInfo?.hostel || "Location not updated"}
                    </p>
                    <p className="text-gray-700 text-sm flex items-center gap-3">
                      <FiMail className="text-blue-500 w-5 h-5 flex-shrink-0" />
                      {service.sellerInfo?.email || "No email provided"}
                    </p>
                  </div>

                  <div className="flex text-sm flex-wrap gap-2">
                    <span className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-xl text-sm font-semibold">
                      {service.sellerInfo?.course || "Not updated"}
                    </span>
                    <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-xl text-sm font-semibold">
                      Part {service.sellerInfo?.year || "Not updated"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;