import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiStar, 
  FiHelpCircle, 
  FiUsers, 
  FiChevronRight, 
  FiEdit,
  FiHeart,
  FiAlertCircle,
  FiShoppingBag,
  FiMapPin,
  FiChevronLeft,
  FiCheck,
  FiZap,
  FiTrendingUp
} from 'react-icons/fi';
import AdvertisementBanner from './Advertisment';
import ReportButton from './ReportButton';
import axios from 'axios';
import LandingPageSection from './LandingPageSection';
import WebsiteGuide from './WebsiteGuide';

const HomePage = () => {
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

  // All FAQs from your original list
  const faqs = [
    {
      question: "What is Campus Crave?",
      answer: "Campus Crave is an exclusive online marketplace for Obafemi Awolowo University students to buy and sell products and services easily within the campus."
    },
    {
      question: "Who can use Campus Crave?",
      answer: "Only students of Obafemi Awolowo University can use the platform. Registration does not necessarily require a school email, but users must undergo a verification process to confirm their identity and profile details."
    },
    {
      question: "How does Campus Crave keep transactions safe?",
      answer: "All users go through a verification process where their provided details are checked. If the information is confirmed as accurate, the user is awarded a verified badge. If false information is detected, the account may be flagged. In addition, the platform has a built-in reporting system for scams or fake products."
    },
    {
      question: "Can I sell services as well as products?",
      answer: "Yes. Campus Crave supports both product sales and service offerings, making it a one-stop shop for all campus transactions."
    },
    {
      question: "How do I report a scam or suspicious activity?",
      answer: "Simply use the 'Report' option available on product or user profiles, or contact the Campus Crave support team directly. Your report will be reviewed quickly."
    },
    {
      question: "Why was Campus Crave created?",
      answer: "Campus Crave was built to solve the challenge of students struggling to buy or sell items on campus quickly, safely, and without gender or hostel restrictions."
    },
    {
      question: "Can non-students use Campus Crave?",
      answer: "No. To keep the marketplace safe and trustworthy, only verified OAU students can access the platform. Every user must pass the verification process before gaining full access."
    },
    {
      question: "What should I do if I have a problem with a transaction?",
      answer: "Contact the Campus Crave support team through the help center or submit a report directly from the platform for assistance."
    },
    {
      question: "Does Campus Crave guarantee 100% scam prevention?",
      answer: "We work hard to keep the platform safe with verification and reporting tools, but no system can stop every scam. If something does happen, our team will step in to help resolve it. Still, we encourage users to take precautions and stay alert when making transactions."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <LandingPageSection />

      {/* Website Guide - Moved to be more prominent */}
      <WebsiteGuide />

      {/* Reviews Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-12">
              <div className="flex items-center gap-4 mb-6 lg:mb-0">
                <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
                  <FiUsers className="text-3xl text-white" />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Student Experiences
                  </h2>
                  <p className="text-gray-600 mt-2">See what your fellow students are saying</p>
                </div>
              </div>

              <Link to="/reviewpage">
                <button className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold">
                  <FiEdit className="flex-shrink-0" />
                  Share Your Story
                </button>
              </Link>
            </div>

            {isLoadingReviews ? (
              <div className="flex justify-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
              </div>
            ) : reviewsError ? (
              <div className="text-center py-12 bg-red-50 rounded-2xl">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                  <FiAlertCircle className="text-red-600 text-2xl" />
                </div>
                <p className="text-red-600 font-medium text-lg">Failed to load reviews</p>
                <p className="text-red-500 text-sm mt-2">{reviewsError}</p>
              </div>
            ) : (
              <div className="relative">
                <div className="flex overflow-x-auto pb-8 -mx-4 px-4 scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-transparent">
                  <div className="flex space-x-6 min-w-max">
                    {reviews.map((review) => (
                      <div 
                        key={review._id} 
                        className="flex-shrink-0 w-80 bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <p className="font-bold text-gray-900 text-lg">{review.name}</p>
                            <p className="text-sm text-gray-500 mt-1">
                              {review.course} • Level {review.level}
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
                          <div className="absolute top-0 left-0 text-4xl text-indigo-500 opacity-10 leading-none">"</div>
                          <p className="text-gray-700 pl-6 relative z-10 leading-relaxed">"{review.review}"</p>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-gray-400 border-t border-gray-100 pt-4">
                          <span>
                            {new Date(review.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                          <div className="flex items-center">
                            <FiHeart className="text-gray-400 mr-1" />
                            <span>Helpful</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="text-center mt-6">
                  <div className="inline-flex items-center gap-2 text-indigo-600 font-medium">
                    <FiChevronLeft className="animate-bounce" />
                    <span>Swipe to see more reviews</span>
                    <FiChevronRight className="animate-bounce" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Enhanced FAQ Section with All Questions */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-indigo-900 bg-clip-text text-transparent mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">Everything you need to know about Campus Crave</p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-white/20">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {faqs.map((faq, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-indigo-100 group hover:transform hover:-translate-y-1"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                      <FiCheck className="w-3 h-3 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg leading-tight">
                      {faq.question}
                    </h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12 pt-8 border-t border-gray-100">
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
              >
                <FiHelpCircle className="flex-shrink-0" />
                Need More Help? Contact Support
                <FiChevronRight className="flex-shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;