import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiPhone, FiBook, FiHome, FiCamera, FiSave, FiShield, FiAlertTriangle, FiCheck, FiAward } from 'react-icons/fi';
import axios from 'axios';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    phone: '',
    campusId: '',
    profilePhoto: '',
    course: '',
    year: '',
    hostel: '',
    emergencyContact: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Get user ID and token
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  // Fetch existing user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://campus-plum.vercel.app/api/auth/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserData(response.data);
      } catch (err) {
        setError('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, token]);

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData(prev => ({ ...prev, profilePhoto: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://campus-plum.vercel.app/api/auth/${userId}`,
        userData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
      setSuccess('Profile updated successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-lg text-gray-700">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Complete Your Profile
          </h1>
          <p className="text-gray-600 mt-3 max-w-md mx-auto">
            Keep your information current for a better campus experience and earn trust badges
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="p-6 md:p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 animate-fadeIn">
                <div className="bg-red-100 p-2 rounded-full">
                  <FiAlertTriangle className="text-red-600 w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-red-800">Profile Update Error</h3>
                  <p className="text-red-600 text-sm mt-1">{error}</p>
                </div>
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3 animate-fadeIn">
                <div className="bg-green-100 p-2 rounded-full">
                  <FiCheck className="text-green-600 w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-green-800">Profile Updated!</h3>
                  <p className="text-green-600 text-sm mt-1">{success}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Profile Photo */}
              <div className="flex flex-col items-center mb-8">
                <div className="relative mb-4">
                  <div className="w-36 h-36 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 border-4 border-white shadow-lg overflow-hidden ring-4 ring-indigo-50">
                    {userData.profilePhoto ? (
                      <img 
                        src={userData.profilePhoto} 
                        alt="Profile" 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FiUser className="text-indigo-400 w-16 h-16" />
                      </div>
                    )}
                  </div>
                  <label className="absolute bottom-2 right-2 bg-white p-3 rounded-full shadow-md cursor-pointer hover:bg-indigo-50 transition-all duration-300 group border border-indigo-100">
                    <FiCamera className="text-indigo-600 group-hover:text-indigo-800 transition-colors w-5 h-5" />
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileUpload} 
                      className="hidden" 
                    />
                  </label>
                </div>
                <p className="text-gray-600 text-sm bg-indigo-50 py-1 px-3 rounded-full">Click camera to update photo</p>
              </div>

              {/* Form Fields */}
              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                      <div className="bg-indigo-100 p-2 rounded-lg">
                        <FiUser className="text-indigo-600" />
                      </div>
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={userData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="Your full name"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                      <div className="bg-indigo-100 p-2 rounded-lg">
                        <FiPhone className="text-indigo-600" />
                      </div>
                      Whatsapp Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={userData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="Your phone number"
                    />
                  </div>

                  {/* Hostel Address*/}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                      <div className="bg-indigo-100 p-2 rounded-lg">
                        <FiHome className="text-indigo-600" />
                      </div>
                      Hostel
                    </label>
                    <input
                      type="text"
                      name="hostel"
                      value={userData.hostel}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="Your hostel address"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Course */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                      <div className="bg-indigo-100 p-2 rounded-lg">
                        <FiBook className="text-indigo-600" />
                      </div>
                      Course
                    </label>
                    <input
                      type="text"
                      name="course"
                      value={userData.course}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="Your course of study"
                    />
                  </div>

                  {/* Year */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Year of Study
                    </label>
                    <div className="relative">
                      <select
                        name="year"
                        value={userData.year}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none"
                      >
                        <option value="">Select Year</option>
                        {[1, 2, 3, 4, 5].map(year => (
                          <option key={year} value={year}>Year {year}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Emergency Contact */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Emergency Contact
                </label>
                <div className="flex items-center gap-3 bg-red-50 p-3 rounded-xl border border-red-100">
                  <div className="bg-red-100 p-3 rounded-xl">
                    <FiAlertTriangle className="text-red-600 w-5 h-5" />
                  </div>
                  <input
                    type="tel"
                    name="emergencyContact"
                    value={userData.emergencyContact}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    placeholder="Emergency contact number"
                  />
                </div>
              </div>

              {/* Security Note */}
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-2xl border border-indigo-100">
                <div className="flex items-center gap-4">
                  <div className="bg-indigo-100 p-3 rounded-xl">
                    <FiShield className="text-indigo-600 w-6 h-6" />
                  </div>
                  <div>
                    <div>
                       <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                      Important Note <FiAward className="text-amber-500" />
                    </h3>
                    </div>
                  </div>
                </div>

                 <p className="text-gray-700 pt-2 text-sm">
                      The information you provide must be accurate as it helps us protect the community against scams.
                      If any false information is detected, your account may be flagged.
                      Once your details are verified and confirmed as accurate, you will receive a 
                      <span className="font-semibold text-indigo-700"> Verified Badge</span>, which increases your chances of selling quickly on the platform.
                      Buyers are more likely to trust and prefer verified sellers to avoid being scammed.
                    </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 px-8 rounded-xl font-semibold shadow-md transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-3 mt-6 group"
              >
                <FiSave className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;