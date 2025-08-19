import { Link } from 'react-router-dom';
import { FiRepeat, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

// Animation constants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: 'spring', 
      stiffness: 120 
    } 
  }
};

const cardHoverVariants = {
  hover: { 
    y: -8,
    transition: { 
      type: 'spring', 
      stiffness: 400 
    }
  }
};

const RecurringServicesSection = ({ 
  listings, 
  loading, 
  error, 
  sliderRef, 
  scrollSlider,
  renderLoadingSkeleton 
}) => {
  return (
    <section className="max-w-7xl mx-auto py-12 px-4">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-r from-amber-500 to-yellow-400 p-2 rounded-lg shadow-md">
            <FiRepeat className="text-2xl text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Recurring Services</h2>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => scrollSlider(sliderRef, 'prev')}
            className="p-2 bg-white border border-gray-200 hover:bg-amber-50 rounded-full text-amber-500 transition-colors shadow-sm"
          >
            <FiChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => scrollSlider(sliderRef, 'next')}
            className="p-2 bg-white border border-gray-200 hover:bg-amber-50 rounded-full text-amber-500 transition-colors shadow-sm"
          >
            <FiChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="relative">
        <motion.div 
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-6 px-1 -mx-1"
          variants={containerVariants}
          initial="hidden"
          animate="show"
          style={{ 
            scrollBehavior: 'smooth',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {loading ? renderLoadingSkeleton() : (
            <>
              {error ? (
                <div className="text-center w-full py-8 text-red-500">
                  Failed to load services. Please try again later.
                </div>
              ) : (
                listings.map((service) => (
                  <motion.div 
                    key={service._id}
                    variants={itemVariants}
                    whileHover="hover"
                    className="flex-shrink-0 w-72 bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow group border border-gray-100"
                  >
                    <motion.div 
                      className="relative aspect-square rounded-xl overflow-hidden mb-4"
                      variants={cardHoverVariants}
                    >
                      <img 
                        alt={service.title} 
                        src={service.image || "https://picsum.photos/536/354"} 
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                      />
                      <span className="absolute top-3 left-3 bg-amber-100 text-amber-600 px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                        Recurring
                      </span>
                    </motion.div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">{service.title}</h3>
                    <p className="text-xl font-bold text-amber-600 mb-2">₦{service.price}</p>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {service.description || 'Service description not available'}
                    </p>
                    <Link
                      to={`/listing/${service._id}`}
                      className="block w-full bg-gradient-to-r from-amber-500 to-yellow-400 text-white py-3 text-center rounded-lg hover:opacity-90 transition-opacity font-medium"
                    >
                      Subscribe Now
                    </Link>
                  </motion.div>
                ))
              )}
            </>
          )}
        </motion.div>
        
        {/* Gradient fade effects for scroll indication */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-amber-50 to-transparent"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-amber-50 to-transparent"></div>
      </div>

      <div className="text-center mt-8">
        <Link 
          to="/viplistings" 
          className="inline-block bg-gradient-to-r from-amber-500 to-yellow-400 text-white px-8 py-3 rounded-full font-medium shadow-md hover:shadow-lg transition-shadow hover:scale-105 transform"
        >
          Browse Services →
        </Link>
      </div>
    </section>
  );
};

export default RecurringServicesSection;