import { Link } from 'react-router-dom';
import { MdWorkspacePremium } from 'react-icons/md';
import { FiCheckCircle } from 'react-icons/fi';
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
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
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
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 25,
    },
  },
};

const PremiumListingsSection = ({
  listings,
  loading,
  error,
  renderLoadingSkeleton,
}) => {
  return (
    <section className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-12">
        <motion.div
          className="flex items-center gap-4"
          variants={itemVariants}
        >
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-3 rounded-2xl shadow-lg">
            <MdWorkspacePremium className="text-2xl text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              Premium Listings
            </h2>
            <p className="text-gray-600 mt-1">Exclusive high-value items with premium services</p>
          </div>
        </motion.div>
      </div>

      {/* Scrollable Cards */}
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
              className="text-center w-full py-12"
              variants={itemVariants}
            >
              <div className="bg-gradient-to-r from-purple-100 to-indigo-100 p-6 rounded-2xl inline-block mb-4">
                <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-3 rounded-full">
                  <MdWorkspacePremium className="text-white text-2xl" />
                </div>
              </div>
              <p className="text-red-500 text-lg font-medium">Failed to load premium listings</p>
              <p className="text-gray-600 mt-1">Please try again later</p>
            </motion.div>
          ) : (
            listings.slice(0, 6).map((item) => (
              <motion.div
                key={item._id}
                variants={itemVariants}
                whileHover="hover"
                className="flex-shrink-0 w-80 bg-white rounded-3xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-100 relative"
              >
                {/* Verified Badge */}
                {item.user?.verified && (
                  <div className="absolute top-4 right-4 z-20">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-2 rounded-full shadow-lg">
                      <FiCheckCircle className="w-4 h-4" />
                    </div>
                    <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
                  </div>
                )}

                {/* Image Container */}
                <motion.div
                  className="relative aspect-video rounded-2xl overflow-hidden mb-5"
                  variants={cardHoverVariants}
                >
                  {console.log(item.images)}
                  <img
                    alt={item.title}
                    src={item.images[0].url || 'https://picsum.photos/536/354'}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                  />
                  <span className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                    Premium
                  </span>
                </motion.div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-900 line-clamp-2 leading-tight">
                    {item.title}
                  </h3>
                  
                  <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent">
                    ₦{item.price}
                  </p>

                  {/* Seller Info with Verified Badge */}
                  {item.sellerInfo?.name && (
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full flex items-center justify-center">
                          <span className="text-purple-600 text-sm font-bold">
                            {item.sellerInfo.name.charAt(0)}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900">
                            {item.sellerInfo.name}
                          </span>
                          {item.user?.verified && (
                            <FiCheckCircle className="w-4 h-4 text-green-500 ml-1.5 flex-shrink-0" />
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* View Details Button */}
                  <Link
                    to={`/listing/${item._id}`}
                    state={{ item }}
                    className="block w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white py-3 text-center rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl mt-4"
                  >
                    View Details
                    <svg className="w-4 h-4 inline-block ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Gradient fade effects for scroll indication */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10"></div>
      </div>

      {/* Explore More Button */}
      <motion.div 
        className="text-center mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Link
          to="/premiumlistings"
          className="inline-block bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white px-10 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
        >
          Explore Premium Listings
          <svg className="w-5 h-5 inline-block ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </motion.div>
    </section>
  );
};

export default PremiumListingsSection;