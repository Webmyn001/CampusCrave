import { Link } from 'react-router-dom';
import { FiAlertTriangle, FiCheck, FiClock, FiEye, FiMapPin } from 'react-icons/fi';
import { motion } from 'framer-motion';

// Animation constants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 15,
    },
  },
};

const cardHoverVariants = {
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 25,
    },
  },
};

const UrgentListingsSection = ({
  listings,
  loading,
  error,
  renderLoadingSkeleton,
}) => {
  return (
    <section className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      {/* Enhanced Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500/10 to-orange-500/10 px-6 py-3 rounded-2xl border border-red-200/50 mb-4">
          <div className="bg-gradient-to-r from-red-500 to-orange-500 p-2 rounded-xl shadow-lg">
            <FiAlertTriangle className="text-2xl text-white" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Urgent Listings
          </h2>
        </div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Time-sensitive deals that need quick attention. Don't miss out on these urgent opportunities!
        </p>
      </motion.div>

      {/* Scrollable Cards Container */}
      <div className="relative">
        <motion.div
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-8 px-1 -mx-1"
          variants={containerVariants}
          initial="hidden"
          animate="show"
          style={{
            scrollBehavior: 'smooth',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {loading ? (
            renderLoadingSkeleton()
          ) : error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center w-full py-12"
            >
              <div className="bg-gradient-to-r from-red-100 to-orange-100 p-6 rounded-2xl inline-block mb-4">
                <FiAlertTriangle className="w-12 h-12 text-red-500" />
              </div>
              <p className="text-red-600 font-medium text-lg">Failed to load urgent listings</p>
              <p className="text-gray-600 mt-2">Please try again later</p>
            </motion.div>
          ) : (
            listings.slice(0, 6).map((item) => (
              <motion.div
                key={item._id}
                variants={itemVariants}
                whileHover="hover"
                className="flex-shrink-0 w-80 bg-white/80 backdrop-blur-sm rounded-3xl p-5 shadow-xl hover:shadow-2xl transition-all duration-300 group border border-white/20"
              >
                <motion.div
                  className="relative aspect-video rounded-2xl overflow-hidden mb-5"
                  variants={cardHoverVariants}
                >
                  <img
                    alt={item.title}
                    src={item.images[0].url || 'https://picsum.photos/536/354'}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Badges Container */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {/* Urgent Badge */}
                    <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1 w-fit">
                      <FiAlertTriangle className="w-3 h-3" />
                      URGENT
                    </span>
                    
                    {/* Verified Badge - Conditionally Rendered */}
                    {item.sellerInfo?.isVerified && (
                      <motion.span 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg w-fit flex items-center gap-1"
                      >
                        <FiCheck className="w-3 h-3" />
                        Verified
                      </motion.span>
                    )}
                  </div>

                  {/* Time-sensitive Indicator */}
                  <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <FiClock className="w-3 h-3" />
                    <span>24H Left</span>
                  </div>
                </motion.div>

                {/* Content Section */}
                <div className="space-y-4">
                  {/* Title and Price */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-red-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                      ₦{item.price}
                    </p>
                  </div>

                  {/* Meta Information */}
                  <div className="space-y-2">
                    {item.category && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FiMapPin className="w-4 h-4 text-red-500" />
                        <span className="bg-gray-100 px-2 py-1 rounded-md">{item.category}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <FiEye className="w-3 h-3" />
                        <span>{item.views || 0} views</span>
                      </div>
                      <span>{item.location || 'Campus Area'}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link
                    to={`/listing/${item._id}`}
                    state={{ item }}
                    className="block w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 text-center rounded-xl font-semibold hover:shadow-lg transition-all duration-200 group/btn hover:from-red-600 hover:to-orange-600"
                  >
                    <span className="flex items-center justify-center gap-2">
                      View Urgent Deal
                      <FiAlertTriangle className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </span>
                  </Link>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Enhanced Gradient fade effects */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent"></div>
      </div>

      {/* Enhanced Explore More Button */}
      {listings.length > 6 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <Link
            to="/urgentlistings"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-105 transform group"
          >
            <span>Explore All Urgent Listings</span>
            <FiAlertTriangle className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <p className="text-gray-500 text-sm mt-3">
            {listings.length} urgent deals waiting for you
          </p>
        </motion.div>
      )}
    </section>
  );
};

export default UrgentListingsSection;