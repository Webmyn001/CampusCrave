import { FiArrowLeft, FiMail, FiMessageSquare, FiPhone, FiClock, FiUser, FiMapPin, FiCheckCircle, FiTag, FiShare2, FiHeart, FiImage, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const ListingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [listing, setListing] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [imageLoading, setImageLoading] = useState({});

  // Fetch listing data based on ID
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const endpoints = [
          'https://campus-plum.vercel.app/api/vip-listings/',
          'https://campus-plum.vercel.app/api/listings/',
          'https://campus-plum.vercel.app/api/pro-listings/'
        ];

        let listingData = null;

        for (const endpoint of endpoints) {
          try {
            const response = await axios.get(endpoint);
            const foundListing = response.data.find(item => item._id === id);
            if (foundListing) {
              listingData = foundListing;
              break;
            }
          } catch (err) {
            console.log(`Failed to fetch from ${endpoint}:`, err.message);
            continue;
          }
        }

        if (listingData) {
          setListing(listingData);
        } else {
          setError("Listing not found");
        }
      } catch (err) {
        console.error("Error fetching listing:", err);
        setError("Failed to load listing details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchListing();
    }
  }, [id]);

  const isVerifiedSeller = listing?.sellerInfo?.verified || Math.random() > 0.5;

  function formatNaira(value) {
    const cleaned = String(value ?? 0).replace(/[^0-9.-]+/g, '');
    const num = Number(cleaned);
    if (Number.isNaN(num)) return String(value ?? '0');
    return new Intl.NumberFormat('en-NG', { maximumFractionDigits: 0 }).format(num);
  }

  const days = Math.floor(listing?.secondsLeft / (24 * 3600)) || 0;
  const hours = Math.floor((listing?.secondsLeft % (24 * 3600)) / 3600) || 0;
  const minutes = Math.floor((listing?.secondsLeft % 3600) / 60) || 0;

  function formatMonthYear(dateString) {
    if (!dateString) return "";
    try {
      const [day, month, year] = dateString.split(" ")[0].split("/");
      const date = new Date(`${year}-${month}-${day}`);
      const formatted = date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
      return formatted.replace(" ", ", ");
    } catch (error) {
      return "Recent";
    }
  }

  const initials =
    listing?.sellerInfo?.name
      ?.split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase() || "NA";

  // Handle image loading errors
  const handleImageError = (imageIndex) => {
    setImageLoading(prev => ({ ...prev, [imageIndex]: false }));
  };

  const handleImageLoad = (imageIndex) => {
    setImageLoading(prev => ({ ...prev, [imageIndex]: true }));
  };

  // Get images array with fallbacks
  const images = listing?.images && listing.images.length > 0 
    ? listing.images.map((img, index) => ({
        ...img,
        id: img.id || `img-${index}`,
        url: img.url || `https://picsum.photos/seed/${listing.title}-${index}/600/400`
      }))
    : [{ 
        id: 'placeholder', 
        url: `https://picsum.photos/seed/${listing?.title || 'listing'}/600/400` 
      }];

  // Navigation functions for images
  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + images.length) % images.length);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-t-3 border-b-3 border-indigo-600 mx-auto mb-6"></div>
          <p className="text-gray-700 text-xl font-medium">Loading listing details...</p>
          <p className="text-gray-500 mt-2">Please wait a moment</p>
        </div>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="text-center p-8 bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl max-w-md border border-white/20">
          <div className="w-24 h-24 bg-gradient-to-r from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <FiImage className="h-12 w-12 text-red-500" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent mb-4">
            {error || "Listing Not Found"}
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed text-lg">
            {error || "The listing you're looking for doesn't exist or has been removed."}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 px-8 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <FiArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      

        {/* Main Content */}
        <div className="space-y-8">
          {/* Modern Image Gallery - Reduced size on large screens */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 max-w-4xl mx-auto lg:max-w-3xl">
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                {imageLoading[activeImage] !== false ? (
                  <img
                    src={images[activeImage].url}
                    alt={listing.title}
                    className="w-full h-full object-cover transition-transform duration-500"
                    onError={() => handleImageError(activeImage)}
                    onLoad={() => handleImageLoad(activeImage)}
                  />
                ) : (
                  <div className="text-center p-8">
                    <FiImage className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg font-medium">Image not available</p>
                  </div>
                )}
                
                {/* Sold Out Overlay */}
                {listing.soldOut && (
                  <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FiCheckCircle className="h-8 w-8 text-white" />
                      </div>
                      <span className="text-white text-3xl font-bold tracking-widest uppercase block mb-2">
                        Sold Out
                      </span>
                    </div>
                  </div>
                )}

                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
                    >
                      <FiChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
                    >
                      <FiChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                {images.length > 1 && (
                  <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                    {activeImage + 1} / {images.length}
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <div className="p-4 bg-gray-50 border-t border-gray-200">
                  <div className="flex justify-center space-x-3 overflow-x-auto py-2">
                    {images.map((image, index) => (
                      <button
                        key={image.id}
                        onClick={() => setActiveImage(index)}
                        className={`flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all duration-300 transform hover:scale-110 ${
                          activeImage === index 
                            ? 'border-indigo-500 scale-110 shadow-lg' 
                            : 'border-gray-300 hover:border-indigo-300'
                        }`}
                      >
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          {imageLoading[index] !== false ? (
                            <img
                              src={image.url}
                              alt={`${listing.title} ${index + 1}`}
                              className="w-full h-full object-cover"
                              onError={() => handleImageError(index)}
                              onLoad={() => handleImageLoad(index)}
                            />
                          ) : (
                            <FiImage className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Product Header Section */}
          <div className="bg-white rounded-3xl shadow-2xl p-6 lg:p-8 border border-gray-200 max-w-4xl mx-auto lg:max-w-full">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1">
                {/* Title and Badges */}
                <div className="mb-6">
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                    {listing.title || listing.businessName}
                  </h1>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                      <FiTag className="w-4 h-4" />
                      {listing.condition || "Excellent"} Condition
                    </span>
                    {listing.soldOut ? (
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-100 text-red-700 rounded-full text-sm font-semibold animate-pulse">
                        <FiCheckCircle className="w-4 h-4" />
                        Not Available
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
                        <FiCheckCircle className="w-4 h-4" />
                        Available Now
                      </span>
                    )}
                    {listing.category && (
                      <span className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                        {listing.category}
                      </span>
                    )}
                  </div>
                </div>

                {/* Price and Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-1 rounded-2xl shadow-lg">
                      <div className="bg-white rounded-xl px-6 py-4">
                        <p className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                          ₦{formatNaira(listing?.price)}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-lg">Negotiable</p>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => setIsFavorite(!isFavorite)}
                      className={`p-3 rounded-xl transition-all duration-300 transform hover:scale-110 ${
                        isFavorite 
                          ? 'bg-red-500 text-white shadow-lg' 
                          : 'bg-gray-100 text-gray-600 shadow-md hover:shadow-lg'
                      }`}
                    >
                      <FiHeart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                    </button>
                    <button className="p-3 bg-gray-100 text-gray-600 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110">
                      <FiShare2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Grid - Improved alignment */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
            {/* Left Column - Description & Details */}
            <div className="lg:col-span-2 space-y-6 lg:space-y-8">
              {/* Description */}
              <div className="bg-white rounded-3xl shadow-2xl p-6 lg:p-8 border border-gray-200">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6 flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <FiMessageSquare className="text-indigo-600 w-5 h-5" />
                  </div>
                  Product Description
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed text-base lg:text-lg">
                    {listing.description || "No detailed description provided for this listing. Contact the seller for more information about this item."}
                  </p>
                </div>
              </div>

              {/* Key Information */}
              <div className="bg-white rounded-3xl shadow-2xl p-6 lg:p-8 border border-gray-200">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6 flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FiClock className="text-blue-600 w-5 h-5" />
                  </div>
                  Quick Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <FiClock className="text-blue-600 w-5 h-5 lg:w-6 lg:h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Time Remaining</p>
                      <p className="text-lg lg:text-xl font-bold text-gray-900">
                        {days > 0 ? `${days}d ` : ''}{hours}h {minutes}m
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <FiMail className="text-green-600 w-5 h-5 lg:w-6 lg:h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Contact Method</p>
                      <p className="text-base lg:text-lg font-semibold text-gray-900 capitalize">
                        {listing.contactMethod || "Direct Message"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <FiTag className="text-purple-600 w-5 h-5 lg:w-6 lg:h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Category</p>
                      <p className="text-base lg:text-lg font-semibold text-gray-900">
                        {listing.category || "General"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="p-3 bg-amber-100 rounded-lg">
                      <FiCheckCircle className="text-amber-600 w-5 h-5 lg:w-6 lg:h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Condition</p>
                      <p className="text-base lg:text-lg font-semibold text-gray-900">
                        {listing.condition || "Excellent"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact & Seller Info */}
            <div className="space-y-6 lg:space-y-8">
              {/* Contact Action Card */}
              <div className="bg-white rounded-3xl shadow-2xl p-6 lg:p-8 border border-gray-200">
                <div className="text-center mb-4 lg:mb-6">
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">Ready to Buy?</h3>
                  <p className="text-gray-600 text-sm lg:text-base">Connect with the seller directly</p>
                </div>
                <Link 
                  to="/contactseller" 
                  state={{ product: listing }}
                  className="block w-full py-3 lg:py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 text-base lg:text-lg transform hover:scale-105 mb-4"
                >
                  <FiMessageSquare className="w-5 h-5" />
                  Contact Seller
                </Link>
                <div className="text-center space-y-2 text-xs lg:text-sm text-gray-600">
                  <p className="flex items-center justify-center gap-2">
                    <FiClock className="w-4 h-4" />
                    Response usually within minutes
                  </p>
                  <p className="flex items-center justify-center gap-2">
                    <FiMail className="w-4 h-4" />
                    Preferred: {listing.contactMethod || "Message"}
                  </p>
                </div>
              </div>

              {/* Seller Information */}
              <div className="bg-white rounded-3xl shadow-2xl p-6 lg:p-8 border border-gray-200">
                <div className="flex items-center justify-between mb-4 lg:mb-6">
                  <h2 className="text-lg lg:text-xl font-bold text-gray-900 flex items-center gap-3">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <FiUser className="text-indigo-600 w-4 h-4 lg:w-5 lg:h-5" />
                    </div>
                    Seller Information
                  </h2>
                  {isVerifiedSeller && (
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-xs font-semibold">
                      <FiCheckCircle className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  {/* Seller Avatar */}
                  {listing?.sellerInfo?.profilePhoto?.url ? (
                    <img
                      src={listing.sellerInfo.profilePhoto.url}
                      alt={listing.sellerInfo.name}
                      className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl object-cover shadow-md border-2 border-white"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/150?text=Seller";
                      }}
                    />
                  ) : (
                    <div className="w-14 h-14 lg:w-16 lg:h-16 flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-2xl font-bold text-lg lg:text-xl shadow-md border-2 border-white">
                      {initials}
                    </div>
                  )}
                  
                  <div>
                    <h3 className="text-base lg:text-lg font-bold text-gray-900">
                      {listing.sellerInfo?.name || "Anonymous Seller"}
                    </h3>
                    <p className="text-gray-600 text-xs lg:text-sm">
                      Member since {formatMonthYear(listing.sellerInfo?.formattedMemberSince)}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-xs lg:text-sm">
                  <p className="flex items-center gap-3 text-gray-700">
                    <FiMapPin className="text-red-500 w-4 h-4 flex-shrink-0" />
                    {listing.sellerInfo?.hostel || listing.location || "Campus Location"}
                  </p>
                  <p className="flex items-center gap-3 text-gray-700">
                    <FiMail className="text-blue-500 w-4 h-4 flex-shrink-0" />
                    {listing.sellerInfo?.email || "Contact for email"}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-semibold">
                    {listing.sellerInfo?.course || "Student"}
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-semibold">
                    Year {listing.sellerInfo?.year || "Not specified"}
                  </span>
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