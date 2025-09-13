// VipServicesListings.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FiSearch, FiLoader, FiAlertCircle, FiShoppingBag } from "react-icons/fi";

const VipServicesListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchListings = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://campus-plum.vercel.app/api/vip-listings/");
        if (!cancelled) {
          setListings(Array.isArray(response.data) ? response.data : []);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.response?.data?.message || err.message || "Failed to load VIP services.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchListings();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredListings = listings.filter((item) =>
    (item.title || "").toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  // Loading state
  if (loading) {
    return (
      <div className="mx-auto max-w-7xl p-4">
        <div className="flex flex-col items-center justify-center py-20">
          <FiLoader className="animate-spin w-12 h-12 text-amber-500 mb-4" />
          <p className="text-amber-600 font-medium">Loading premium services...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="mx-auto max-w-7xl p-4">
        <div className="flex flex-col items-center justify-center py-20">
          <FiAlertCircle className="w-12 h-12 text-red-500 mb-4" />
          <p className="text-red-600 font-semibold mb-2">Error loading services</p>
          <p className="text-gray-600 text-center max-w-2xl mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-amber-600 text-white px-4 py-2 rounded-md"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  // Main UI
  return (
    <div className="mx-auto max-w-7xl p-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-lg shadow mb-6">
        <div className="flex items-center space-x-3">
          <FiShoppingBag className="w-8 h-8 text-white" />
          <div>
            <h2 className="text-2xl font-bold text-white">VIP Services</h2>
            <p className="text-sm text-indigo-100">
              Exclusive premium services for discerning clients
            </p>
          </div>
        </div>
      </div>

      {/* Search bar (now below header) */}
      <div className="mb-6">
        <label className="relative block">
          <span className="sr-only">Search VIP services</span>
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FiSearch className="w-4 h-4 text-gray-400" />
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title..."
            className="placeholder-gray-400 pl-10 pr-4 py-2 w-full sm:w-[350px] border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </label>
      </div>

      {/* Empty list */}
      {listings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="bg-amber-100 p-6 rounded-full mb-4">
            <FiShoppingBag className="w-12 h-12 text-amber-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">No Premium Services Available</h3>
          <p className="text-gray-600 text-center max-w-2xl">
            Currently there are no VIP services listed. Check back later or contact us to feature your premium service.
          </p>
        </div>
      ) : (
        <>
          {/* Search empty result */}
          {filteredListings.length === 0 && (
            <p className="text-gray-600 mb-4">No results match your search.</p>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredListings.map((item) => (
              <article
                key={item._id || item.id}
                className="w-full shadow-lg rounded-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300"
              >
                <Link to={`/business/${item._id || item.id}`} className="block w-full">
                  <img
                    src={
                      item.image ||
                      (item.photos && item.photos[0]) ||
                      `https://picsum.photos/800/600?random=${encodeURIComponent(
                        item._id || item.id || item.title
                      )}`
                    }
                    alt={item.title || "VIP service"}
                    className="w-full h-56 sm:h-64 md:h-72 lg:h-80 xl:h-96 object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://picsum.photos/800/600?commerce";
                    }}
                  />
                </Link>

                <div className="p-4 flex items-center justify-between">
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {item.title || "Untitled"}
                    </h3>
                    {item.category || item.tag ? (
                      <p className="text-sm text-gray-500 truncate">
                        {item.category || item.tag}
                      </p>
                    ) : null}
                    <p className="text-sm text-gray-500">
                      Member since: {item.membersince || "N/A"}
                    </p>
                  </div>

                  <Link
                    to={`/business/${item._id || item.id}`}
                    className="ml-4 bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-indigo-700 transition-colors"
                  >
                    Details
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default VipServicesListings;
