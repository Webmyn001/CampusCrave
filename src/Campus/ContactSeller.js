import { useEffect, useState } from "react";
import {
  FiArrowLeft,
  FiMail,
  FiPhone,
  FiUser,
  FiAlertCircle,
  FiMessageSquare,
  FiPackage,
  FiMapPin,
  FiInfo,
  FiCheckCircle,
  FiShield,
  FiClock,
  FiTag,
  FiBriefcase
} from "react-icons/fi";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";

const ContactSeller = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const [listing, setListing] = useState(location.state?.product || location.state?.service || null);
  const [loading, setLoading] = useState(!listing);
  const [error, setError] = useState(null);

  // Fetch listing if not passed via location.state
  useEffect(() => {
    const fetchListing = async () => {
      if (!listing && id) {
        try {
          setLoading(true);
          // Try multiple endpoints
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
          console.error(err);
          setError("Failed to load listing details.");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchListing();
  }, [id, listing]);

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm sm:text-base">Loading contact details...</p>
        </div>
      </div>
    );
    
  if (error)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-lg shadow-sm p-6 max-w-sm w-full border border-gray-200">
          <FiAlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-500 font-medium mb-4 text-sm sm:text-base">{error}</p>
          <button 
            onClick={() => navigate(-1)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm sm:text-base"
          >
            Go Back
          </button>
        </div>
      </div>
    );
    
  if (!listing)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <p className="text-gray-700 text-sm sm:text-base">Listing not found.</p>
        </div>
      </div>
    );

  // Handle different data structures for business vs product listings
  const isBusiness = !!listing.businessName;
  
  // Safe values - handle both business and product structures
  const sellerInfo = listing.sellerInfo || {};
  const phone = sellerInfo.phone || listing.phone || "";
  const cleanPhone = phone ? phone.replace(/[^0-9]/g, "") : "";
  const email = sellerInfo.email || listing.businessEmail || listing.email || "N/A";
  const sellerName = sellerInfo.name || listing.ownerName || "Anonymous Seller";
  const locationInfo = sellerInfo.hostel || listing.address || listing.location || "N/A";
  const course = sellerInfo.course || "Student";
  const year = sellerInfo.year || "Not specified";
  
  // Check if user is verified
  const isVerified = sellerInfo.verified || listing.verified || false;

  // Avatar initials fallback
  const initials = sellerName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase() || "NA";

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6">
      <div className="max-w-4xl mx-auto px-3 sm:px-6">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4 text-sm sm:text-base"
          >
            <FiArrowLeft className="w-4 h-4" />
            <span className="font-medium">Back to Listing</span>
          </button>

          <div className="text-center">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Contact {isBusiness ? "Business" : "Seller"}
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Get in touch to discuss this {isBusiness ? "service" : "item"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Column - Contact Info */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Seller/Business Profile Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                {/* Avatar */}
                {sellerInfo?.profilePhoto?.url ? (
                  <img
                    src={sellerInfo.profilePhoto.url}
                    alt={sellerName}
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border border-gray-200"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/150?text=S";
                    }}
                  />
                ) : (
                  <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center bg-blue-500 text-white rounded-full font-semibold text-sm sm:text-lg">
                    {initials}
                  </div>
                )}
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                      {sellerName}
                    </h2>
                    {isVerified && (
                      <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded text-xs flex-shrink-0">
                        <FiCheckCircle className="w-3 h-3" />
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    {course} • Year {year}
                  </p>
                  {isBusiness && (
                    <p className="text-blue-600 text-xs sm:text-sm font-medium mt-1">
                      Business Account
                    </p>
                  )}
                </div>
              </div>

              {/* Contact Methods */}
              <div className="space-y-3 sm:space-y-4">
                {/* WhatsApp */}
                {cleanPhone && (
                  <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-green-50 rounded-lg border border-green-100">
                    <div className="p-2 sm:p-3 bg-green-500 text-white rounded-lg flex-shrink-0">
                      <FiMessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">WhatsApp</p>
                      <a
                        href={`https://wa.me/${cleanPhone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base sm:text-lg font-semibold text-gray-900 hover:text-green-600 transition-colors break-all"
                      >
                        {phone}
                      </a>
                      <p className="text-xs text-green-600 mt-1">Recommended • Fast response</p>
                    </div>
                  </div>
                )}

                {/* Phone */}
                {phone && (
                  <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="p-2 sm:p-3 bg-blue-500 text-white rounded-lg flex-shrink-0">
                      <FiPhone className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">Phone Call</p>
                      <a
                        href={`tel:${phone}`}
                        className="text-base sm:text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors break-all"
                      >
                        {phone}
                      </a>
                    </div>
                  </div>
                )}

                {/* Email */}
                {email && email !== "N/A" && (
                  <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-purple-50 rounded-lg border border-purple-100">
                    <div className="p-2 sm:p-3 bg-purple-500 text-white rounded-lg flex-shrink-0">
                      <FiMail className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">Email</p>
                      <a
                        href={`mailto:${email}`}
                        className="text-base sm:text-lg font-semibold text-gray-900 hover:text-purple-600 transition-colors break-all text-sm sm:text-base"
                      >
                        {email}
                      </a>
                    </div>
                  </div>
                )}

                {/* Location */}
                {locationInfo && locationInfo !== "N/A" && (
                  <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-orange-50 rounded-lg border border-orange-100">
                    <div className="p-2 sm:p-3 bg-orange-500 text-white rounded-lg flex-shrink-0">
                      <FiMapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">Location</p>
                      <p className="text-base sm:text-lg font-semibold text-gray-900 break-words">
                        {locationInfo}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Safety Tips */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                <FiShield className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
                Safety Tips
              </h3>
              <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-700">
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Always meet in public campus locations</span>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Never send payments in advance without verification</span>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Check {isBusiness ? "service details" : "item condition"} before committing</span>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Report suspicious activity to Campus Security</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Listing Info */}
          <div className="space-y-4 sm:space-y-6">
            {/* Listing Details Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                {isBusiness ? (
                  <>
                    <FiBriefcase className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                    Service Details
                  </>
                ) : (
                  <>
                    <FiPackage className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                    Item Details
                  </>
                )}
              </h3>

              {/* Listing Image */}
             {/* Listing Image with Sold Out Overlay */}
{listing?.images?.[0]?.url && (
  <div className="mb-3 sm:mb-4 relative">
    <img
      src={listing.images[0].url}
      alt={isBusiness ? listing.businessName : listing.title}
      className="w-full h-24 sm:h-32 object-cover rounded-lg bg-gray-100"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = "https://via.placeholder.com/300x150?text=No+Image";
      }}
    />
    {/* Sold Out Overlay */}
    {listing.soldOut && (
      <div className="absolute inset-0 bg-black bg-opacity-70 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-2">
            <FiCheckCircle className="h-5 w-5 text-white" />
          </div>
          <span className="text-white font-bold text-lg tracking-wide uppercase">
            Sold Out
          </span>
        </div>
      </div>
    )}
  </div>
)}

              <div className="space-y-2 sm:space-y-3">
                {/* Title/Business Name */}
                <div>
                  <p className="text-xs sm:text-sm text-gray-600 mb-1">
                    {isBusiness ? "Business" : "Item"}
                  </p>
                  <p className="font-semibold text-gray-900 text-sm sm:text-base leading-tight break-words">
                    {isBusiness ? listing.businessName : listing.title}
                  </p>
                </div>

                {/* Price */}
                {listing?.price && (
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">Price</p>
                    <p className="text-lg sm:text-xl font-bold text-gray-900">
                      ₦{Number(listing.price).toLocaleString()}
                    </p>
                  </div>
                )}

                {/* Condition - for products */}
                {!isBusiness && listing?.condition && (
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">Condition</p>
                    <div className="flex items-center gap-2">
                      <FiTag className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                      <span className="font-medium text-gray-900 text-sm sm:text-base">{listing.condition}</span>
                    </div>
                  </div>
                )}

                {/* Working Hours - for businesses */}
                {isBusiness && listing?.workingHours && (
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">Working Hours</p>
                    <div className="flex items-center gap-2">
                      <FiClock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                      <span className="font-medium text-gray-900 text-sm sm:text-base">{listing.workingHours}</span>
                    </div>
                  </div>
                )}

                {/* Category */}
                {listing?.category && (
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">Category</p>
                    <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs sm:text-sm">
                      {listing.category}
                    </span>
                  </div>
                )}

                {/* Contact Method */}
                {listing?.contactMethod && (
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">Preferred Contact</p>
                    <span className="font-medium text-gray-900 text-sm sm:text-base capitalize">
                      {listing.contactMethod}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3 sm:mb-4">Quick Actions</h3>
              <div className="space-y-2 sm:space-y-3">
                {cleanPhone && (
                  <a
                    href={`https://wa.me/${cleanPhone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-2 sm:py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors text-sm sm:text-base"
                  >
                    <FiMessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
                    WhatsApp {isBusiness ? "Business" : "Seller"}
                  </a>
                )}
                {phone && (
                  <a
                    href={`tel:${phone}`}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 sm:py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors text-sm sm:text-base"
                  >
                    <FiPhone className="w-4 h-4 sm:w-5 sm:h-5" />
                    Call {isBusiness ? "Business" : "Seller"}
                  </a>
                )}
                {email && email !== "N/A" && (
                  <a
                    href={`mailto:${email}`}
                    className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 sm:py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors text-sm sm:text-base"
                  >
                    <FiMail className="w-4 h-4 sm:w-5 sm:h-5" />
                    Email {isBusiness ? "Business" : "Seller"}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Buttons for Mobile */}
        {(cleanPhone || phone) && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 lg:hidden">
            <div className="flex gap-2">
              {cleanPhone && (
                <a
                  href={`https://wa.me/${cleanPhone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors text-sm"
                >
                  <FiMessageSquare className="w-4 h-4" />
                  WhatsApp
                </a>
              )}
              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors text-sm"
                >
                  <FiPhone className="w-4 h-4" />
                  Call
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactSeller;