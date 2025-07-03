import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiPhone, FiBook, FiHome, FiCamera, FiSave, FiShield, FiAlertTriangle, FiCheck } from 'react-icons/fi';
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
        const response = await axios.get(`http://localhost:5000/api/auth/${userId}`, {
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
        `http://localhost:5000/api/auth/${userId}`,
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-lg text-gray-700">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Update Your Profile
          </h1>
          <p className="text-gray-600 mt-2">
            Keep your information current for a better campus experience
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 md:p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                <FiAlertTriangle className="text-red-500 w-6 h-6 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-red-700">Profile Update Error</h3>
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
                <FiCheck className="text-green-500 w-6 h-6 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-green-700">Profile Updated!</h3>
                  <p className="text-green-600 text-sm">{success}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Profile Photo */}
              <div className="flex flex-col items-center mb-8">
                <div className="relative mb-4">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 border-4 border-white shadow-lg overflow-hidden">
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
                  <label className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-50 transition-colors group">
                    <FiCamera className="text-indigo-600 group-hover:text-indigo-800 transition-colors" />
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileUpload} 
                      className="hidden" 
                    />
                  </label>
                </div>
                <p className="text-gray-600 text-sm">Click camera to update photo</p>
              </div>

              {/* Form Fields */}
              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                      <FiUser className="text-gray-500" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={userData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                      placeholder="Your full name"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                      <FiPhone className="text-gray-500" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={userData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                      placeholder="Your phone number"
                    />
                  </div>

                  {/* Campus ID */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Campus ID
                    </label>
                    <input
                      type="text"
                      name="campusId"
                      value={userData.campusId}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                      placeholder="Your campus ID"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Course */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                      <FiBook className="text-gray-500" />
                      Course
                    </label>
                    <input
                      type="text"
                      name="course"
                      value={userData.course}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                      placeholder="Your course of study"
                    />
                  </div>

                  {/* Year */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Year of Study
                    </label>
                    <select
                      name="year"
                      value={userData.year}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all appearance-none"
                    >
                      <option value="">Select Year</option>
                      {[1, 2, 3, 4, 5].map(year => (
                        <option key={year} value={year}>Year {year}</option>
                      ))}
                    </select>
                  </div>

                  {/* Hostel */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                      <FiHome className="text-gray-500" />
                      Hostel
                    </label>
                    <input
                      type="text"
                      name="hostel"
                      value={userData.hostel}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                      placeholder="Your hostel address"
                    />
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Emergency Contact
                </label>
                <div className="flex items-center gap-2">
                  <div className="bg-red-100 p-3 rounded-xl">
                    <FiAlertTriangle className="text-red-600 w-5 h-5" />
                  </div>
                  <input
                    type="tel"
                    name="emergencyContact"
                    value={userData.emergencyContact}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                    placeholder="Emergency contact number"
                  />
                </div>
              </div>

              {/* Security Note */}
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-5 rounded-2xl border border-indigo-100">
                <div className="flex items-start gap-3">
                  <div className="bg-indigo-100 p-2 rounded-full">
                    <FiShield className="text-indigo-600 w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Your Privacy Matters</h3>
                    <p className="text-gray-600 text-sm">
                      We securely store your information and never share it with third parties.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-8 rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-3 mt-6"
              >
                <FiSave className="w-5 h-5" />
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;