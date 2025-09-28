import { useState } from 'react';
import { FiStar, FiSave, FiUser, FiBook, FiAward, FiMessageSquare } from 'react-icons/fi';
import axios from 'axios';

const ReviewForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    course: '',
    level: '',
    review: '',
    ratings: 0,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  const validateForm = () => {
    const newErrors = {};
    
    if (formData.name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }
    if (!formData.course.trim()) {
      newErrors.course = 'Please enter a course name';
    }
    if (!formData.level.trim()) {
      newErrors.level = 'Please enter your skill level';
    }
    if (formData.review.length < 10 || formData.review.length > 150) {
      newErrors.review = 'Review must be between 10-150 characters';
    }
    if (formData.ratings < 1 || formData.ratings > 5) {
      newErrors.ratings = 'Please select a rating between 1-5 stars';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await axios.post('https://campus-plum.vercel.app/api/reviews/', formData);
      
      setShowThankYou(true);
      setFormData({
        name: '',
        course: '',
        level: '',
        review: '',
        ratings: 0,
      });
      
      setTimeout(() => setShowThankYou(false), 7000);
    } catch (error) {
      setErrors({ 
        submit: error.response?.data?.message || 'Submission failed. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRatingChange = (rating) => {
    setFormData({ ...formData, ratings: rating });
    setErrors({ ...errors, ratings: '' });
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Success Message */}
        {showThankYou && (
          <div className="mb-8 animate-in slide-in-from-top duration-500">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-lg shadow-green-200 flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                <FiStar className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">Thank you for sharing!</h3>
                <p className="text-green-100">Your review helps others in our community make better decisions</p>
              </div>
              <button 
                onClick={() => setShowThankYou(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                ×
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-2xl shadow-blue-100/50 overflow-hidden border border-white/20">
          {/* Header Section with Gradient */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                <FiStar className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-3">Share Your Journey Experience</h2>
              <p className="text-indigo-100 text-lg opacity-90">
                Help fellow students by sharing your experience with CampusCrave
              </p>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div className="group">
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                  <FiUser className="w-4 h-4 mr-2 text-indigo-500" />
                  Your Full Name
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-4 pl-11 py-4 rounded-xl border-2 transition-all duration-200 ${
                      errors.name 
                        ? 'border-red-300 focus:ring-2 focus:ring-red-500 focus:border-red-500' 
                        : 'border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 group-hover:border-gray-300'
                    } focus:outline-none bg-white/50 backdrop-blur-sm`}
                    placeholder="John Robert"
                  />
                  <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm mt-2 flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Course Input */}
              <div className="group">
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                  <FiBook className="w-4 h-4 mr-2 text-indigo-500" />
                  Department
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    className={`w-full px-4 pl-11 py-4 rounded-xl border-2 transition-all duration-200 ${
                      errors.course 
                        ? 'border-red-300 focus:ring-2 focus:ring-red-500 focus:border-red-500' 
                        : 'border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 group-hover:border-gray-300'
                    } focus:outline-none bg-white/50 backdrop-blur-sm`}
                    placeholder="Computer Science"
                  />
                  <FiBook className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
                {errors.course && (
                  <p className="text-red-500 text-sm mt-2 flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    {errors.course}
                  </p>
                )}
              </div>

              {/* Level Input */}
              <div className="group">
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                  <FiAward className="w-4 h-4 mr-2 text-indigo-500" />
                  Academic Level
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className={`w-full px-4 pl-11 py-4 rounded-xl border-2 transition-all duration-200 appearance-none ${
                      errors.level 
                        ? 'border-red-300 focus:ring-2 focus:ring-red-500 focus:border-red-500' 
                        : 'border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 group-hover:border-gray-300'
                    } focus:outline-none bg-white/50 backdrop-blur-sm cursor-pointer`}
                  >
                    <option value="">Select your academic level</option>
                    <option value="100 Level">100 Level</option>
                    <option value="200 Level">200 Level</option>
                    <option value="300 Level">300 Level</option>
                    <option value="400 Level">400 Level</option>
                    <option value="500 Level">500 Level</option>
                    <option value="600 Level">600 Level</option>
                    <option value="700 Level">700 Level</option>
                  </select>
                  <FiAward className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {errors.level && (
                  <p className="text-red-500 text-sm mt-2 flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    {errors.level}
                  </p>
                )}
              </div>

              {/* Rating Input */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Rate This Marketplace
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="flex gap-1 bg-gray-50 rounded-2xl p-2 w-fit">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      type="button"
                      key={rating}
                      onClick={() => handleRatingChange(rating)}
                      onMouseEnter={() => setHoverRating(rating)}
                      onMouseLeave={() => setHoverRating(0)}
                      className={`p-3 transition-all duration-200 transform ${
                        (hoverRating >= rating || formData.ratings >= rating)
                          ? 'text-yellow-400 scale-110 bg-white shadow-lg rounded-xl' 
                          : 'text-gray-300 hover:text-yellow-300 hover:scale-105'
                      }`}
                    >
                      <FiStar 
                        className="w-7 h-7" 
                        fill={(hoverRating >= rating || formData.ratings >= rating) ? "currentColor" : "none"}
                      />
                    </button>
                  ))}
                </div>
                {errors.ratings && (
                  <p className="text-red-500 text-sm mt-2 flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    {errors.ratings}
                  </p>
                )}
              </div>

              {/* Review Textarea */}
              <div className="group">
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                  <FiMessageSquare className="w-4 h-4 mr-2 text-indigo-500" />
                  Detailed Review
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <textarea
                    value={formData.review}
                    onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                    className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-200 resize-none ${
                      errors.review 
                        ? 'border-red-300 focus:ring-2 focus:ring-red-500 focus:border-red-500' 
                        : 'border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 group-hover:border-gray-300'
                    } focus:outline-none bg-white/50 backdrop-blur-sm h-32`}
                    placeholder="Share your honest review about CampusCrave marketplace..."
                  />
                </div>
                <div className="flex justify-between items-center mt-3">
                  <div className="text-sm text-gray-500 flex items-center">
                    <span className={`${formData.review.length > 150 ? 'text-red-500' : ''}`}>
                      {formData.review.length}/150
                    </span>
                  </div>
                  {errors.review && (
                    <span className="text-red-500 text-sm flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                      {errors.review}
                    </span>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg hover:shadow-indigo-200/50 hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span className="text-white/90">Submitting Review...</span>
                  </div>
                ) : (
                  <>
                    <FiSave className="w-5 h-5" />
                    <span>Publish Your Review</span>
                  </>
                )}
              </button>

              {errors.submit && (
                <div className="text-red-500 text-center p-4 bg-red-50 rounded-xl border border-red-200 flex items-center justify-center gap-2">
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                  {errors.submit}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Your review will be publicly visible and help other students
          </p>
        </div>
      </div>
    </section>
  );
};

export default ReviewForm;