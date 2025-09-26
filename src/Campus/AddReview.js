import { useState } from 'react';
import { FiStar, FiSave } from 'react-icons/fi';
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
    <section className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl ring-1 ring-black/5 p-6 md:p-8 transition-all hover:shadow-2xl">
        {/* Success Message */}
        {showThankYou && (
          <div className="bg-gradient-to-r from-green-100 to-green-50 border border-green-200 p-4 rounded-xl mb-6 flex items-center gap-3 animate-fade-in">
            <div className="bg-green-500/20 p-2 rounded-lg">
              <FiStar className="text-green-600 w-5 h-5" />
            </div>
            <div>
              <p className="font-medium text-green-700">Thank you for sharing!</p>
              <p className="text-green-600 text-sm">Your review helps others in our community</p>
            </div>
          </div>
        )}

        <header className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
            Share Your  Journey Experience
          </h2>
          <p className="text-gray-600 mt-2">
            Help fellow students by sharing your experience with the website
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Full Name
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.name ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-indigo-500'
              } focus:outline-none focus:ring-2 focus:border-transparent`}
              placeholder="John Robert"
            />
            {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
          </div>

          {/* Course Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              value={formData.course}
              onChange={(e) => setFormData({ ...formData, course: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.course ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-indigo-500'
              } focus:outline-none focus:ring-2 focus:border-transparent`}
              placeholder="Computer Science "
            />
            {errors.course && <p className="text-red-500 text-sm mt-2">{errors.course}</p>}
          </div>

          {/* Level Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
               Level
              <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.level ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-indigo-500'
              } focus:outline-none focus:ring-2 focus:border-transparent`}
            >
              <option value="">Select your level</option>
              <option value="100 Level">100 Level</option>
              <option value="200 Level">200 Level</option>
              <option value="300 Level">300 Level</option>
              <option value="400 Level">400 Level</option>
              <option value="500 Level">500 Level</option>
              <option value="600 Level">600 Level</option>
              <option value="700 Level">700 Level</option>

            </select>
            {errors.level && <p className="text-red-500 text-sm mt-2">{errors.level}</p>}
          </div>

          {/* Rating Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
               Rate This Marketplace
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  type="button"
                  key={rating}
                  onClick={() => handleRatingChange(rating)}
                  className={`p-2 transition-all ${
                    formData.ratings >= rating 
                      ? 'text-indigo-600 scale-110' 
                      : 'text-gray-300 hover:text-indigo-400 hover:scale-105'
                  }`}
                >
                  <FiStar className="w-7 h-7" />
                </button>
              ))}
            </div>
            {errors.ratings && <p className="text-red-500 text-sm mt-2">{errors.ratings}</p>}
          </div>

          {/* Review Textarea */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Detailed Review
              <span className="text-red-500 ml-1">*</span>
            </label>
            <textarea
              value={formData.review}
              onChange={(e) => setFormData({ ...formData, review: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.review ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-indigo-500'
              } focus:outline-none focus:ring-2 focus:border-transparent h-32`}
              placeholder="Share your review about CampusCrave."
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>{formData.review.length}/150</span>
              {errors.review && <span className="text-red-500">{errors.review}</span>}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-3.5 px-6 rounded-xl font-medium hover:from-indigo-700 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-indigo-200/50"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Submitting...
              </div>
            ) : (
              <>
                <FiSave className="w-5 h-5" />
                Publish Review
              </>
            )}
          </button>

          {errors.submit && (
            <div className="text-red-500 text-center mt-4 p-3 bg-red-50 rounded-lg">
              {errors.submit}
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default ReviewForm;