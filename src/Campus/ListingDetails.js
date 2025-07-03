import { FiArrowLeft, FiHeart, FiMail, FiMessageSquare, FiPhone, FiClock, FiUser } from 'react-icons/fi';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ListingDetails = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (state?.item) {
      setListing(state.item);
      setLoading(false);
    } else {
      // Fallback to fetch data by ID if state isn't available
      fetchListingById();
    }
  }, [id, state]);

  const fetchListingById = async () => {
    try {
      // Simulating API call
      setTimeout(() => {
        setListing({
          id: id,
          title: "MacBook Pro 2020 (16GB/512GB)",
          price: "₦280,000",
          condition: "Excellent",
          description: "Like-new condition, purchased 6 months ago. Comes with original box and accessories. Battery health 98%. This laptop is perfect for students, developers, and creative professionals.",
          images: [
            "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
          ],
          contactMethod: "WhatsApp",
          responseTime: "Usually within 1 hour",
          seller: {
            name: "Sarah Johnson",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            department: "Computer Science",
            level: "400 Level"
          }
        });
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error("Error fetching listing:", error);
      setLoading(false);
    }
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Here you would typically update the backend as well
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading listing details...</p>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Listing Not Found</h2>
          <p className="text-gray-600 mb-6">The listing you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/listings" 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-6 rounded-xl font-medium transition-all shadow-md hover:shadow-lg"
          >
            <FiArrowLeft className="inline-block" />
            Browse Listings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link 
            to="/listings" 
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors group"
          >
            <FiArrowLeft className="transition-transform group-hover:-translate-x-1" />
            <span className="font-medium">Back to Listings</span>
          </Link>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Image Gallery Section */}
          <div className="relative">
            <div className="relative h-96 bg-gray-100">
              <img 
                src={listing.images[selectedImage]} 
                alt={listing.title} 
                className="w-full h-full object-cover transition-opacity duration-300"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "https://via.placeholder.com/800x600?text=Image+Not+Available";
                }}
              />
              
              {/* Favorite Button */}
              <button 
                onClick={handleFavorite}
                className={`absolute top-4 right-4 p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
                  isFavorite 
                    ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white' 
                    : 'bg-white hover:bg-rose-50 text-gray-500'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={isFavorite ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            {/* Image Thumbnails */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50">
              {listing.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-xl overflow-hidden transition-all duration-300 border-2 ${
                    selectedImage === index 
                      ? 'border-blue-500 transform scale-105 shadow-md' 
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img 
                    src={img} 
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = "https://via.placeholder.com/200x200?text=Image";
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="p-6">
            {/* Title and Price */}
            <div className="flex justify-between items-start gap-4 mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{listing.title}</h1>
                <div className="inline-flex items-center mt-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                  {listing.condition} Condition
                </div>
              </div>
              <p className="text-3xl font-bold text-blue-600">{listing.price}</p>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Description</h2>
              <p className="text-gray-600 leading-relaxed">{listing.description}</p>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 rounded-xl p-5 mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <FiMessageSquare className="text-blue-600 w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Preferred Contact</p>
                    <p className="font-medium">{listing.contactMethod}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-amber-100 p-3 rounded-lg">
                    <FiClock className="text-amber-600 w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Response Time</p>
                    <p className="font-medium">{listing.responseTime}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Seller Information */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Seller Information</h2>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-white shadow-md">
                  <img 
                    src={listing.seller.avatar} 
                    alt={listing.seller.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = "https://via.placeholder.com/100x100?text=Avatar";
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{listing.seller.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="bg-indigo-100 text-indigo-700 px-2.5 py-0.5 rounded-full text-xs font-medium">
                      {listing.seller.department}
                    </span>
                    <span className="bg-purple-100 text-purple-700 px-2.5 py-0.5 rounded-full text-xs font-medium">
                      {listing.seller.level}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 py-3 px-4 rounded-lg font-medium transition-colors border border-gray-200">
                  <FiMail className="text-blue-500" />
                  Message
                </button>
                <button className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 py-3 px-4 rounded-lg font-medium transition-colors border border-gray-200">
                  <FiPhone className="text-green-500" />
                  Call
                </button>
                <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition-all shadow-md">
                  <FiUser className="text-white" />
                  View Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-2xl lg:hidden">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div 
                onClick={handleFavorite}
                className={`p-2 rounded-full ${isFavorite ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white' : 'bg-gray-100 text-gray-500'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={isFavorite ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="font-bold text-blue-600 text-lg truncate">{listing.price}</p>
                <p className="text-gray-600 text-sm truncate">{listing.title}</p>
              </div>
            </div>
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-3 rounded-xl font-bold whitespace-nowrap transition-all shadow-md flex items-center gap-2">
              <FiMessageSquare className="w-4 h-4" />
              Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;