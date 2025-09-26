import {
  FiArrowLeft,
  FiHeart,
  FiMail,
  FiMessageSquare,
  FiPhone,
  FiClock,
  FiUser,
  FiMapPin,
} from "react-icons/fi";
import { Link, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const ListingDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  const location = useLocation();
  const service = location.state?.item;

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading listing details...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiClock className="h-8 w-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Listing Not Found</h2>
          <p className="text-gray-600 mb-6">
            The listing you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/listings"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-6 rounded-xl font-medium transition-all shadow-md hover:shadow-lg"
          >
            <FiArrowLeft />
            Browse Listings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            to="/listings"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors group font-medium px-4 py-2 rounded-lg hover:bg-blue-50"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Back to Listings
          </Link>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {/* Gallery */}
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4">
              {(service.images && service.images.length > 0
                ? service.images
                : Array.from({ length: 3 }).map((_, i) => ({
                    id: `placeholder-${i}`,
                    url: `https://picsum.photos/seed/${i}/400/300`,
                  }))
              ).map((image, index) => (
                <div
                  key={image.id}
                  className={`rounded-xl overflow-hidden shadow-md relative group ${
                    index === 0 ? "md:col-span-2 md:row-span-2" : ""
                  }`}
                >
                  <img
                    src={image.url}
                    alt="Listing"
                    className="w-full h-64 md:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>
                </div>
              ))}
            </div>

            {/* Favorite Button */}
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`absolute top-6 right-6 p-3 rounded-full shadow-lg transition-all ${
                isFavorite
                  ? "bg-rose-500 text-white animate-pulse"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              <FiHeart className="w-6 h-6" />
            </button>
          </div>

          {/* Details */}
          <div className="p-6 space-y-8">
            {/* Title + Price */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{service.title}</h1>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm">
                    {service.condition || "Good"} Condition
                  </span>
                  <span className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                    Available Now
                  </span>
                </div>
              </div>
              <p className="text-3xl font-bold text-blue-600 bg-blue-50 px-5 py-2 rounded-xl shadow-sm">
                ₦{service.price || "0"}
              </p>
            </div>

            {/* Description */}
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <FiMessageSquare className="text-blue-600" /> Description
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {service.description || "No description available."}
              </p>
            </div>

            {/* Contact Info */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FiPhone className="text-blue-600" /> Contact Information
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
                  <FiMail className="text-blue-600 w-6 h-6" />
                  <div>
                    <p className="text-sm text-gray-500">Preferred Contact</p>
                    <p className="font-medium">{service.contactMethod || "Message"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
                  <FiClock className="text-amber-600 w-6 h-6" />
                  <div>
                    <p className="text-sm text-gray-500">Time left</p>
                    <p className="font-medium">{Math.floor(service.secondsLeft / 60) || 0} mins</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <Link to="/contactseller" state={{ service }}>
                  <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-md font-medium flex items-center gap-2 mx-auto">
                    <FiMessageSquare /> Contact Seller
                  </button>
                </Link>
              </div>
            </div>

            {/* Seller Info */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FiUser className="text-indigo-600" /> Seller Information
              </h2>
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">{service.sellerInfo?.email || "Unknown Seller"}</h3>
                  <p className="text-gray-700 flex items-center gap-2 mt-1">
                    <FiMapPin className="text-red-500" />
                    {service.sellerInfo?.hostel || "No Address"}
                  </p>
                  <p className="text-gray-600 text-sm mt-1">
                    Member since {service.sellerInfo?.formattedMemberSince || "Unknown"}
                  </p>
                  <div className="flex gap-2 mt-3">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs">
                      {service.sellerInfo?.course || "Unknown Department"}
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                      Part {service.sellerInfo?.year || "Unknown Level"}
                    </span>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-full font-bold text-xl mx-auto">
                    {service.sellerInfo?.email?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <p className="mt-2 text-xs text-gray-500">Seller Rating: 4.8★</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-2xl lg:hidden">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-3 rounded-full ${
                  isFavorite
                    ? "bg-rose-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                <FiHeart />
              </button>
              <div>
                <p className="font-bold text-blue-600 text-lg">₦{service.price}</p>
                <p className="text-sm text-gray-600">{service.title}</p>
              </div>
            </div>
            <Link to="/contactseller">
              <button className="px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold flex items-center gap-2 shadow-md">
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
