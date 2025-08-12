import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiArrowRight, 
  FiAlertTriangle, 
  FiRepeat, 
  FiStar, 
  FiHelpCircle, 
  FiMapPin, 
  FiShoppingBag, 
  FiUsers, 
  FiChevronLeft, 
  FiChevronRight, 
  FiEdit,
  FiLoader
} from 'react-icons/fi';
import { MdWorkspacePremium } from 'react-icons/md';
import AdvertisementBanner from './Advertisment';
import ReportButton from './ReportButton';
import axios from 'axios';
import { motion } from 'framer-motion';
import LandingPageSection from './LandingPageSection';

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

const HomePage = () => {
  const premiumSliderRef = useRef(null);
  const urgentSliderRef = useRef(null);
  const servicesSliderRef = useRef(null);

  // State for API data
  const [vipListings, setVipListings] = useState([]);
  const [proListings, setProListings] = useState([]);
  const [normalListings, setNormalListings] = useState([]);
  const [loading, setLoading] = useState({
    vip: true,
    pro: true,
    normal: true
  });
  const [error, setError] = useState({
    vip: null,
    pro: null,
    normal: null
  });

  // Fetch data from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch VIP listings
        const vipResponse = await axios.get('https://campus-plum.vercel.app/api/vip-listings/');
        setVipListings(vipResponse.data);
        setLoading(prev => ({ ...prev, vip: false }));
        
        // Fetch Pro listings
        const proResponse = await axios.get('https://campus-plum.vercel.app/api/pro-listings/');
        setProListings(proResponse.data);
        setLoading(prev => ({ ...prev, pro: false }));
        
        // Fetch Normal listings
        const normalResponse = await axios.get('https://campus-plum.vercel.app/api/listings/');
        setNormalListings(normalResponse.data);
        setLoading(prev => ({ ...prev, normal: false }));
        
      } catch (err) {
        setError({
          vip: 'Failed to load VIP listings',
          pro: 'Failed to load Pro listings',
          normal: 'Failed to load Normal listings'
        });
        setLoading({ vip: false, pro: false, normal: false });
        console.error('API Error:', err);
      }
    };

    fetchData();
  }, []);

  // Generate urgent listings from normal listings
  const urgentListings = normalListings
   

  // Slider scroll functionality
  const scrollSlider = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = ref.current.offsetWidth * 0.8;
      ref.current.scrollBy({
        left: direction === 'next' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Reviews state management
  const [reviews, setReviews] = useState([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [reviewsError, setReviewsError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('https://campus-plum.vercel.app/api/reviews/');
        setReviews(response.data);
        setReviewsError(null);
      } catch (err) {
        setReviewsError(err.message || 'Failed to fetch reviews');
      } finally {
        setIsLoadingReviews(false);
      }
    };

    fetchReviews();
  }, []);

  // Food items data
  const foodItems = [
    { id: 1, name: "Premium Rice", price: "500/cup", image: "https://picsum.photos/536/354" },
    { id: 2, name: "Brown Beans", price: "700/cup", image: "https://picsum.photos/536/354" },
    { id: 3, name: "Quality Garri", price: "300/cup", image: "https://picsum.photos/536/354" },
    { id: 4, name: "Golden Spaghetti", price: "400/pack", image: "https://picsum.photos/536/354" },
  ];

  const faqs = [
  {
    question: "What is Campus Crave?",
    answer:
      "Campus Crave is an exclusive online marketplace for Obafemi Awolowo University students to buy and sell products and services easily within the campus."
  },
  {
    question: "Who can use Campus Crave?",
    answer:
      "Only students of Obafemi Awolowo University can use the platform. Registration is done using a valid school email address to ensure security and trust."
  },
  {
    question: "How does Campus Crave keep transactions safe?",
    answer:
      "All users are verified through their school email, and the platform includes a built-in reporting system for scams or fake products. Reported cases are reviewed promptly by the support team."
  },
  {
    question: "Can I sell services as well as products?",
    answer:
      "Yes. Campus Crave supports both product sales and service offerings, making it a one-stop shop for all campus transactions."
  },
  {
    question: "How do I report a scam or suspicious activity?",
    answer:
      "Simply use the 'Report' option available on product or user profiles, or contact the Campus Crave support team directly. Your report will be reviewed quickly."
  },
  {
    question: "Why was Campus Crave created?",
    answer:
      "Campus Crave was built to solve the challenge of students struggling to buy or sell items on campus quickly, safely, and without gender or hostel restrictions."
  },
  {
    question: "Can non-students use Campus Crave?",
    answer:
      "No. To keep the marketplace safe and trustworthy, only verified OAU students with a school email can access the platform."
  },
  {
    question: "What should I do if I have a problem with a transaction?",
    answer:
      "Contact the Campus Crave support team through the help center or submit a report directly from the platform for assistance."
  }
];


  // Loading skeleton for cards
  const renderLoadingSkeleton = (count = 4) => {
    return Array.from({ length: count }).map((_, index) => (
      <motion.div 
        key={index}
        variants={itemVariants}
        className="flex-shrink-0 w-72 bg-white rounded-2xl p-4 shadow-lg"
      >
        <div className="animate-pulse">
          <div className="bg-gray-200 rounded-xl aspect-square mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-10 bg-gray-200 rounded-lg"></div>
        </div>
      </motion.div>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <LandingPageSection/>

      <AdvertisementBanner />

      {/* Premium Listings Section */}
      <section className="max-w-7xl mx-auto py-12 px-4">
        <div className="flex items-center justify-between mb-8">
          <motion.div className="flex items-center gap-4" variants={itemVariants}>
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-2 rounded-lg shadow-md">
              <MdWorkspacePremium className="text-2xl text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Premium Listings</h2>
          </motion.div>
          <div className="hidden md:flex gap-2">
            <button 
              onClick={() => scrollSlider(premiumSliderRef, 'prev')}
              className="p-2 hover:bg-purple-100 rounded-full text-purple-600"
            >
              <FiChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={() => scrollSlider(premiumSliderRef, 'next')}
              className="p-2 hover:bg-purple-100 rounded-full text-purple-600"
            >
              <FiChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <motion.div 
          ref={premiumSliderRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {loading.vip ? renderLoadingSkeleton() : (
            <>
              {error.vip ? (
                <div className="text-center w-full py-8 text-red-500">
                  Failed to load premium listings. Please try again later.
                </div>
              ) : (
                vipListings.map((item) => (
                  <motion.div 
                    key={item._id}
                    variants={itemVariants}
                    whileHover="hover"
                    className="flex-shrink-0 w-72 bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow group"
                  >
                    <motion.div 
                      className="relative aspect-square rounded-xl overflow-hidden mb-4"
                      variants={cardHoverVariants}
                    >
                      <img 
                        alt={item.title} 
                        src={item.image || "https://picsum.photos/536/354"} 
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                      />
                      <span className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-3 py-1 rounded-full text-sm shadow-sm">
                        Premium
                      </span>
                    </motion.div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">{item.title}</h3>
                    <p className="text-xl font-bold text-purple-600 mb-4">₦{item.price}</p>
                    <Link
                      to={`/listing/${item._id}`}
                      className="block w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 text-center rounded-lg hover:opacity-90 transition-opacity font-medium"
                    >
                      View Details
                    </Link>
                  </motion.div>
                ))
              )}
            </>
          )}
        </motion.div>

        <div className="text-center mt-8">
          <Link 
            to="/premiumlistings" 
            className="inline-block bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-8 py-3 rounded-full font-medium shadow-md hover:shadow-lg transition-shadow"
          >
            Explore Premium Listings →
          </Link>
        </div>
      </section>

      {/* Urgent Listings Section */}
      <section className="max-w-7xl mx-auto py-12 px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-red-500 to-orange-400 p-2 rounded-lg shadow-md">
              <FiAlertTriangle className="text-2xl text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Urgent Listings</h2>
          </div>
          <div className="hidden md:flex gap-2">
            <button 
              onClick={() => scrollSlider(urgentSliderRef, 'prev')}
              className="p-2 hover:bg-red-100 rounded-full text-red-500"
            >
              <FiChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={() => scrollSlider(urgentSliderRef, 'next')}
              className="p-2 hover:bg-red-100 rounded-full text-red-500"
            >
              <FiChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <motion.div 
          ref={urgentSliderRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {loading.normal ? renderLoadingSkeleton() : (
            <>
              {error.normal ? (
                <div className="text-center w-full py-8 text-red-500">
                  Failed to load urgent listings. Please try again later.
                </div>
              ) : (
                urgentListings.map((item) => (
                  <motion.div 
                    key={item._id}
                    variants={itemVariants}
                    whileHover="hover"
                    className="flex-shrink-0 w-72 bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow group"
                  >
                    <motion.div 
                      className="relative aspect-square rounded-xl overflow-hidden mb-4"
                      variants={cardHoverVariants}
                    >
                      <img 
                        alt={item.title} 
                        src={item.image || "https://picsum.photos/536/354"} 
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                      />
                      <span className="absolute top-3 left-3 bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm flex items-center gap-1 shadow-sm">
                        <FiAlertTriangle className="w-4 h-4" /> {item.urgency}
                      </span>
                    </motion.div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">{item.title}</h3>
                    <p className="text-xl font-bold text-red-600 mb-4">₦{item.price}</p>
                    <Link
                      to={`/listing/${item._id}`}
                      className="block w-full bg-gradient-to-r from-red-500 to-orange-400 text-white py-3 text-center rounded-lg hover:opacity-90 transition-opacity font-medium"
                    >
                      View Details
                    </Link>
                  </motion.div>
                ))
              )}
            </>
          )}
        </motion.div>

        <div className="text-center mt-8">
          <Link 
            to="/urgentlistings" 
            className="inline-block bg-gradient-to-r from-red-500 to-orange-400 text-white px-8 py-3 rounded-full font-medium shadow-md hover:shadow-lg transition-shadow"
          >
            View Urgent Listings →
          </Link>
        </div>
      </section>

      {/* Report Button */}
      <ReportButton />

      {/* Recurring Services Section */}
      <section className="max-w-7xl mx-auto py-12 px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-amber-500 to-yellow-400 p-2 rounded-lg shadow-md">
              <FiRepeat className="text-2xl text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Recurring Services</h2>
          </div>
          <div className="hidden md:flex gap-2">
            <button 
              onClick={() => scrollSlider(servicesSliderRef, 'prev')}
              className="p-2 hover:bg-amber-100 rounded-full text-amber-500"
            >
              <FiChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={() => scrollSlider(servicesSliderRef, 'next')}
              className="p-2 hover:bg-amber-100 rounded-full text-amber-500"
            >
              <FiChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <motion.div 
          ref={servicesSliderRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {loading.pro ? renderLoadingSkeleton() : (
            <>
              {error.pro ? (
                <div className="text-center w-full py-8 text-red-500">
                  Failed to load services. Please try again later.
                </div>
              ) : (
                proListings.map((service) => (
                  <motion.div 
                    key={service._id}
                    variants={itemVariants}
                    whileHover="hover"
                    className="flex-shrink-0 w-72 bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow group"
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
                      <span className="absolute top-3 left-3 bg-amber-100 text-amber-600 px-3 py-1 rounded-full text-sm shadow-sm">
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

        <div className="text-center mt-8">
          <Link 
            to="/viplistings" 
            className="inline-block bg-gradient-to-r from-amber-500 to-yellow-400 text-white px-8 py-3 rounded-full font-medium shadow-md hover:shadow-lg transition-shadow"
          >
            Browse Services →
          </Link>
        </div>
      </section>

      {/* 
      // Food Items Section
         <section className="max-w-6xl mx-auto py-12 px-4">
        <motion.div 
          className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-[2.5rem] shadow-xl p-8 md:p-12 transition-all hover:shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col md:flex-row gap-8 mb-10"
          >
            <div className="flex-1 space-y-5 max-w-prose">
              <motion.h2 
                variants={itemVariants}
                className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tight"
              >
                🛍️ Campus Market Hub
              </motion.h2>
              
              <motion.p 
                variants={itemVariants}
                className="text-gray-700 text-lg md:text-xl leading-relaxed font-[450]"
              >
                Discover daily affordable meals and groceries delivered straight to your hall! 
                Enjoy exclusive student prices with premium quality guaranteed.
              </motion.p>
            </div>
            
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="w-full md:w-1/3 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-indigo-50"
            >
              <div className="flex items-center gap-4">
                <motion.div 
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="p-3 bg-indigo-100 rounded-xl"
                >
                  <FiMapPin className="text-xl text-indigo-600" />
                </motion.div>
                <div>
                  <p className="font-semibold text-gray-800 text-lg">Our Location</p>
                  <p className="text-gray-600 mt-1.5">Fajuyi Hall Shopping Complex</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10"
          >
            {foodItems.map((item) => (
              <motion.div 
                key={item.id}
                variants={itemVariants}
                whileHover="hover"
                className="group bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <motion.div 
                  variants={cardHoverVariants}
                  className="relative overflow-hidden rounded-xl mb-4 aspect-square"
                >
                  <img 
                    alt={item.name} 
                    src={item.image} 
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                </motion.div>
                <h3 className="font-semibold text-gray-800 text-lg mb-2 text-center">{item.name}</h3>
                <p className="text-indigo-600 font-bold text-xl text-center">₦{item.price}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <Link to="/contactseller">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-[2rem] font-semibold text-lg hover:shadow-xl transition-all inline-flex items-center gap-3 shadow-lg"
            >
              <FiShoppingBag className="text-xl" />
              Order Now - Contact Seller
            </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </section> */}


      {/* Report Button */}
      {/* <ReportButton /> */}

      {/* Reviews Section */}
      <section className="max-w-6xl mx-auto py-8 md:py-12 px-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <FiUsers className="text-2xl md:text-3xl text-indigo-600" />
              <h2 className="text-xl md:text-2xl font-bold">Student Experiences</h2>
            </div>

            <Link to="/reviewpage">
              <button 
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
              >
                <FiEdit />
                Share Your Experience
              </button>
            </Link>
          </div>

          {isLoadingReviews ? (
            <div className="flex justify-center py-8">
              <FiLoader className="animate-spin text-indigo-600 text-3xl" />
            </div>
          ) : reviewsError ? (
            <div className="text-center py-8 text-red-500">
              Failed to load reviews: {reviewsError}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <div key={review._id} className="bg-gray-50 p-4 rounded-xl">
                  <div className="mb-4">
                    <p className="font-bold">{review.name}</p>
                    <p className="text-sm text-gray-500">
                      {review.course} ({review.level})
                    </p>
                  </div>
                  <div className="flex gap-1 mb-3">
                    {[...Array(review.ratings)].map((_, i) => (
                      <FiStar key={i} className="text-yellow-400 w-4 h-4" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-2">"{review.review}"</p>
                  <p className="text-sm text-gray-400">
                    {new Date(review.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-6xl mx-auto py-8 md:py-12 px-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <FiHelpCircle className="text-2xl md:text-3xl text-indigo-600" />
            <h2 className="text-xl md:text-2xl font-bold">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b pb-4">
                <h3 className="font-semibold text-gray-800 mb-2">{faq.question}</h3>
                <p className="text-gray-600 text-sm md:text-base">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;