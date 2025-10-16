import { FiArrowLeft, FiMail, FiMessageSquare, FiPhone, FiClock, FiUser, FiMapPin, FiCheckCircle, FiTag } from "react-icons/fi";
import { Link, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const ListingDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  //const [isFavorite, setIsFavorite] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const location = useLocation();
  const service = location.state?.product;

  const isVerifiedSeller = service?.sellerInfo?.verified || Math.random() > 0.5;


  function formatNaira(value) {
  const cleaned = String(value ?? 0).replace(/[^0-9.-]+/g, ''); // remove currency/commas
  const num = Number(cleaned);
  if (Number.isNaN(num)) return String(value ?? '0');
  return new Intl.NumberFormat('en-NG', { maximumFractionDigits: 0 }).format(num);
}


const days = Math.floor(service.secondsLeft / (24 * 3600));
const hours = Math.floor((service.secondsLeft % (24 * 3600)) / 3600);
const minutes = Math.floor((service.secondsLeft % 3600) / 60);

function formatMonthYear(dateString) {
  if (!dateString) return "";
  const [day, month, year] = dateString.split(" ")[0].split("/");
  const date = new Date(`${year}-${month}-${day}`);
  const formatted = date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
  // Add comma manually
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
    : Array.from({ length: 1 }).map((_, i) => ({
        id: `placeholder-${i}`,
        url: `https://picsum.photos/seed/${service.title}-${i}/600/400`,
      }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
      
        {/* Main Card Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          {/* Image Gallery */}
          <div className="relative">
            <div className="flex flex-col sm:grid sm:grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 p-3 sm:p-6">
              {/* Main Image */}
             <div className={`${images.length > 1 ? 'lg:col-span-2' : 'lg:col-span-3'} relative group`}>
  <img
    src={images[activeImage].url}
    alt={service.title}
    className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover rounded-xl sm:rounded-2xl shadow-lg"
    onError={(e) => { 
      e.target.onerror = null; 
      e.target.src = 'https://picsum.photos/600/400?commerce'; 
    }}
  />

  {/* ✅ Sold Out Overlay */}
  {service.soldOut && (
    <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-xl sm:rounded-2xl">
      <span className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-widest uppercase drop-shadow-lg">
        Sold Out
      </span>
    </div>
  )}
</div>

              {/* Thumbnail Images - Only show if more than 1 image */}
              {images.length > 1 && (
                <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-1">
                  {images.slice(0, 2).map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => setActiveImage(index + 1)}
                      className={`relative group rounded-xl sm:rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ${
                        activeImage === index + 1 ? 'ring-2 ring-indigo-500 ring-offset-2' : ''
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={`${service.title} ${index + 2}`}
                        className="w-full h-20 sm:h-28 md:h-36 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Details Section */}
          <div className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
            {/* Title + Price + Actions - Stacked on mobile */}
            <div className="flex flex-col gap-4">
              {/* Title and Share Button */}
              <div className="flex items-start justify-between gap-3">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-indigo-900 bg-clip-text text-transparent break-words flex-1">
                  {service.title}
                </h1>
                {/* Work on this latter */}
                {/* <button className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors flex-shrink-0">
                  <FiShare2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                </button> */}
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 rounded-lg text-xs sm:text-sm font-semibold border border-blue-200">
                  <FiTag className="inline w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  {service.condition || "Excellent"} Condition
                </span>
                <span className="px-3 py-1.5 bg-gradient-to-r from-emerald-100 to-emerald-50 text-emerald-700 rounded-lg text-xs sm:text-sm font-semibold border border-emerald-200">
                  <FiCheckCircle className="inline w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  Available Now
                </span>
                {service.category && (
                  <span className="px-3 py-1.5 bg-gradient-to-r from-purple-100 to-purple-50 text-purple-700 rounded-lg text-xs sm:text-sm font-semibold border border-purple-200">
                    {service.category}
                  </span>
                )}
              </div>

              {/* Price - Full width on mobile */}
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-1 rounded-xl sm:rounded-2xl shadow-xl w-full sm:w-auto">
                <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 text-center">
                  <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                     ₦{formatNaira(service?.price)}
                 </p>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">Price Flexibility (Maybe)</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-sm sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                <FiMessageSquare className="text-indigo-600 w-4 h-4 sm:w-6 sm:h-6" /> 
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg break-words">
                {service.description || "No description available."}
              </p>
            </div>

            {/* Contact & Time Info - Stacked on mobile */}
            <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-100 shadow-sm">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                  <FiPhone className="text-blue-600 w-4 h-4 sm:w-6 sm:h-6" /> 
                  Contact Information
                </h2>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start gap-3 bg-white/80 p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-sm">
                    <div className="p-2 sm:p-3 bg-blue-100 rounded-lg sm:rounded-xl flex-shrink-0">
                      <FiMail className="text-blue-600 w-4 h-4 sm:w-6 sm:h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm text-gray-500">Preferred Contact</p>
                      <p className="font-semibold text-gray-900 text-sm sm:text-base break-words">
                        {service.contactMethod || "Message"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white/80 p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-sm">
                    <div className="p-2 sm:p-3 bg-amber-100 rounded-lg sm:rounded-xl flex-shrink-0">
                      <FiClock className="text-amber-600 w-4 h-4 sm:w-6 sm:h-6" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm text-gray-500">Time Left</p>
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">
                        {days}d {hours}h {minutes}m
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Action */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-green-100 shadow-sm flex flex-col justify-center">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 text-center">Ready to Buy?</h3>
                <Link to="/contactseller" state={{ service }}>
                  <button className="w-full py-3 sm:py-4 px-4 sm:px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg sm:rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base">
                    <FiMessageSquare className="w-4 h-4 sm:w-5 sm:h-5" /> 
                    Contact Seller Now
                  </button>
                </Link>
                <p className="text-center text-xs sm:text-sm text-gray-600 mt-2 sm:mt-3">Response usually within minutes</p>
              </div>
            </div>

            {/* Seller Information - Stacked on mobile */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200 shadow-sm">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3 flex-wrap">
                <FiUser className="text-indigo-600 w-4 h-4 sm:w-6 sm:h-6" /> 
                Seller Information
                {isVerifiedSeller && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-xs sm:text-sm font-semibold">
                    <FiCheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                    Verified Seller
                  </span>
                )}
              </h2>
              
              <div className="flex flex-col gap-4 sm:gap-6">
                <div className="flex-1">
                  <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3 flex-wrap">
                    <h3 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900 break-words flex-1">
                      {service.sellerInfo?.email || "Unknown Seller"}
                    </h3>
                  </div>
                  
                  <div className="space-y-2 sm:space-y-3">
                    <p className="text-gray-700 flex items-start gap-2 sm:gap-3 text-sm sm:text-base">
                      <FiMapPin className="text-red-500 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5" />
                      <span className="break-words">{service.sellerInfo?.hostel || "Campus Location"}</span>
                    </p>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      Member since: {formatMonthYear(service.sellerInfo.formattedMemberSince) || "2025"}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mt-3 sm:mt-4">
                      <span className="px-2 py-1 sm:px-3 sm:py-2 bg-indigo-100 text-indigo-700 rounded-lg text-xs sm:text-sm font-semibold break-words">
                        {service.sellerInfo?.course || "Not updated"}
                      </span>
                      <span className="px-2 py-1 sm:px-3 sm:py-2 bg-purple-100 text-purple-700 rounded-lg text-xs sm:text-sm font-semibold">
                        Part {service.sellerInfo?.year || "Not updated"}
                      </span>
                      
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-3 sm:p-4 rounded-xl sm:rounded-2xl text-center border border-indigo-100">
{console.log(service.title)}
                {service?.sellerInfo?.profilePhoto?.url ? (
                 <div className="relative">
         <img
            src={service?.sellerInfo?.profilePhoto?.url}
             alt={service?.title || "Seller"}
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full mx-auto object-cover shadow-lg"
              onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/150?text=Avatar";
            }}
          />
              </div>
          ) : (
        <div className="relative">
        <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-full font-bold text-xl sm:text-2xl mx-auto shadow-lg">
         {initials}
          </div>
      </div>
      )}
              <p className="mt-2 sm:mt-3 text-xs text-gray-600 font-semibold">{service?.sellerInfo?.name}</p>
                  
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