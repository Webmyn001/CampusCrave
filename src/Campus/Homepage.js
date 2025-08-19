import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiStar, 
  FiHelpCircle, 
  FiUsers, 
  FiChevronRight, 
  FiEdit,
  FiHeart,
  FiAlertCircle
} from 'react-icons/fi';
import AdvertisementBanner from './Advertisment';
import ReportButton from './ReportButton';
import axios from 'axios';
import LandingPageSection from './LandingPageSection';



const HomePage = () => {

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


  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <LandingPageSection/>

      <AdvertisementBanner />


      {/* Report Button */}
      <ReportButton />

     

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
  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-md">
          <FiUsers className="text-2xl md:text-3xl text-white" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Student Experiences
        </h2>
      </div>

      <Link to="/reviewpage">
        <button 
          className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm md:text-base"
        >
          <FiEdit className="flex-shrink-0" />
          Share Your Experience
        </button>
      </Link>
    </div>

    {isLoadingReviews ? (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    ) : reviewsError ? (
      <div className="text-center py-8 bg-red-50 rounded-xl">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-4">
          <FiAlertCircle className="text-red-600 text-xl" />
        </div>
        <p className="text-red-600 font-medium">Failed to load reviews</p>
        <p className="text-red-500 text-sm mt-1">{reviewsError}</p>
      </div>
    ) : (
      <div className="relative">
        {/* Scrollable container */}
        <div className="flex overflow-x-auto pb-6 -mx-2 px-2 scrollbar-hide">
          <div className="flex space-x-5">
            {reviews.map((review) => (
              <div 
                key={review._id} 
                className="flex-shrink-0 w-80 bg-gradient-to-br from-white to-gray-50 p-5 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-bold text-gray-800 text-lg">{review.name}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {review.course} ({review.level})
                    </p>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FiStar 
                        key={i} 
                        className={`w-4 h-4 ${i < review.ratings ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                </div>
                
                <div className="relative mb-4">
                  <div className="absolute top-0 left-0 text-3xl text-indigo-500 opacity-10 leading-none">"</div>
                  <p className="text-gray-700 pl-4 relative z-10">"{review.review}"</p>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-400 border-t border-gray-100 pt-3">
                  <span>
                    {new Date(review.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                  <div className="flex items-center">
                    <FiHeart className="text-gray-400 mr-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Scroll hint for users */}
        <div className="text-center mt-4 text-indigo-500 text-sm flex items-center justify-center">
          <FiChevronRight className="animate-pulse mr-1" />
          <span>Scroll horizontally for more reviews</span>
          <FiChevronRight className="animate-pulse ml-1" />
        </div>
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