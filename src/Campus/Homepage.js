import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiStar, 
  FiUsers, 
  FiChevronRight, 
  FiEdit,
  FiHeart,
  FiAlertCircle,
  FiChevronLeft,
} from 'react-icons/fi';
import axios from 'axios';
import LandingPageSection from './LandingPageSection';
import Marketplace from './Marketplace';

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

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 font-raleway via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <Marketplace/>

      

{/* Reviews Section */}
<section className="py-6 px-4">
  <div className="max-w-6xl mx-auto">
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-6 md:p-8 border border-white/20">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8">
        <div className="flex items-center gap-3 mb-4 lg:mb-0">
          <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-md">
            <FiUsers className="text-2xl text-white" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Student Experiences
            </h2>
            <p className="text-gray-600 mt-1 text-sm">See what your fellow students are saying</p>
          </div>
        </div>

        <Link to="/reviewpage">
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg text-sm font-semibold transform hover:scale-105">
            <FiEdit className="flex-shrink-0 w-4 h-4" />
            Share Your Story
          </button>
        </Link>
      </div>

      {/* Loading / Error */}
      {isLoadingReviews ? (
        <div className="flex justify-center py-6">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      ) : reviewsError ? (
        <div className="text-center py-8 bg-red-50 rounded-xl">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-3">
            <FiAlertCircle className="text-red-600 text-xl" />
          </div>
          <p className="text-red-600 font-medium text-base">Failed to load reviews</p>
          <p className="text-red-500 text-xs mt-1">{reviewsError}</p>
        </div>
      ) : (
        <div className="relative">
          <div className="flex overflow-x-auto pb-6 -mx-2 px-2 scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-transparent">
            <div className="flex space-x-4 min-w-max">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="flex-shrink-0 w-64 bg-white rounded-2xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* Review Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-bold text-gray-900 text-sm md:text-base">{review.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {review.course} • Level {review.level}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={`w-3 h-3 ${i < review.ratings ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Review Text */}
                  <div className="relative mb-3">
                    <div className="absolute top-0 left-0 text-3xl text-indigo-500 opacity-10 leading-none">"</div>
                    <p className="text-gray-700 pl-4 relative z-10 text-sm leading-relaxed">"{review.review}"</p>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-100 pt-2">
                    <span>
                      {new Date(review.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                    <div className="flex items-center gap-1">
                      <FiHeart className="text-gray-400 w-3 h-3" />
                      <span>Helpful</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-4">
            <div className="inline-flex items-center gap-1 text-indigo-600 font-medium text-xs">
              <FiChevronLeft className="animate-bounce w-3 h-3" />
              <span>Swipe to see more stories</span>
              <FiChevronRight className="animate-bounce w-3 h-3" />
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
</section>

    </div>
  );
};

export default HomePage;