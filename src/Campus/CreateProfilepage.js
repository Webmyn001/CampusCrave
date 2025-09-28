import { useState, useEffect } from "react";
import { FiUser, FiPhone, FiBook, FiHome, FiCamera, FiSave, FiShield, FiAlertTriangle, FiCheck, FiAward, FiMail, FiMapPin, FiCalendar } from "react-icons/fi";
import { motion } from "framer-motion";
import axios from "axios";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [preview, setPreview] = useState(null);
  const [newPhoto, setNewPhoto] = useState(null);

  // Get userId + token from localStorage
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`https://campus-plum.vercel.app/api/auth/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(res.data);
      } catch (err) {
        setError("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId, token]);

  // Handle text inputs
  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Handle file upload (base64)
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Size check (3MB max)
    if (file.size > 3 * 1024 * 1024) {
      setError("🚨 Profile photo must be less than 3MB");
      return;
    }

    setPreview(URL.createObjectURL(file));

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setNewPhoto(reader.result);
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updates = { ...userData };
      if (newPhoto) updates.profilePhoto = newPhoto; // base64

      const res = await axios.put(
        `https://campus-plum.vercel.app/api/auth/${userId}`,
        updates,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUserData(res.data.user);
      setPreview(null);
      setNewPhoto(null);
      setSuccess("Profile updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 120 }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-700 font-medium">Loading your profile...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Your Profile
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Complete your profile to unlock verified status and build trust within our campus community
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
        >
          <div className="p-6 md:p-8">
            {/* Status Messages */}
            {error && (
              <motion.div
                variants={itemVariants}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-4"
              >
                <div className="bg-red-100 p-2 rounded-xl">
                  <FiAlertTriangle className="text-red-600 w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-red-800">Update Error</h3>
                  <p className="text-red-600 text-sm mt-1">{error}</p>
                </div>
              </motion.div>
            )}

            {success && (
              <motion.div
                variants={itemVariants}
                className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl flex items-start gap-4"
              >
                <div className="bg-green-100 p-2 rounded-xl">
                  <FiCheck className="text-green-600 w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-green-800">Success!</h3>
                  <p className="text-green-600 text-sm mt-1">{success}</p>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Profile Photo Section */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col items-center mb-8"
              >
                <div className="relative mb-6">
                  <div className="w-40 h-40 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 border-4 border-white shadow-2xl overflow-hidden ring-4 ring-indigo-50">
                    {preview || userData?.profilePhoto?.url ? (
                      <img
                        src={preview || userData?.profilePhoto?.url}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FiUser className="text-indigo-400 w-20 h-20" />
                      </div>
                    )}
                  </div>
                  <label className="absolute -bottom-2 -right-2 bg-white p-4 rounded-2xl shadow-lg cursor-pointer hover:bg-indigo-50 transition-all duration-300 group border border-indigo-100 hover:scale-110">
                    <FiCamera className="text-indigo-600 group-hover:text-indigo-800 transition-colors w-6 h-6" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <div className="text-center">
                  <p className="text-gray-600 text-sm bg-indigo-50 py-2 px-4 rounded-full font-medium">
                    Click the camera to update your photo
                  </p>
                  <p className="text-xs text-gray-500 mt-2">Max 3MB • JPG, PNG, WEBP</p>
                </div>
              </motion.div>

              

              {/* Form Fields */}
              <motion.div
                variants={containerVariants}
                className="grid gap-8 md:grid-cols-2"
              >
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Full Name */}
                  <motion.div variants={itemVariants} className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <FiUser className="text-indigo-600" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={userData?.name || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 group-hover:border-indigo-300"
                      placeholder="Enter your full name"
                    />
                  </motion.div>

                  {/* Phone */}
                  <motion.div variants={itemVariants} className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <FiPhone className="text-blue-600" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={userData?.phone || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:border-blue-300"
                      placeholder="Your phone number"
                    />
                  </motion.div>

                  {/* Hostel */}
                  <motion.div variants={itemVariants} className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <FiHome className="text-green-600" />
                      Hostel
                    </label>
                    <input
                      type="text"
                      name="hostel"
                      value={userData?.hostel || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 group-hover:border-green-300"
                      placeholder="Your hostel name"
                    />
                  </motion.div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Course */}
                  <motion.div variants={itemVariants} className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <FiBook className="text-purple-600" />
                      Course
                    </label>
                    <input
                      type="text"
                      name="course"
                      value={userData?.course || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 group-hover:border-purple-300"
                      placeholder="Your course of study"
                    />
                  </motion.div>

                  {/* Year */}
                  <motion.div variants={itemVariants} className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <FiCalendar className="text-amber-600" />
                      Academic Year
                    </label>
                    <select
                      name="year"
                      value={userData?.year || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 group-hover:border-amber-300"
                    >
                      <option value="">Select Your Year</option>
                      {[1, 2, 3, 4, 5].map((year) => (
                        <option key={year} value={year}>Year {year}</option>
                      ))}
                    </select>
                  </motion.div>

                  {/* Emergency Contact */}
                  <motion.div variants={itemVariants} className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <FiShield className="text-red-600" />
                      Emergency Contact
                    </label>
                    <input
                      type="tel"
                      name="emergencyContact"
                      value={userData?.emergencyContact || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 group-hover:border-red-300"
                      placeholder="Emergency contact number"
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* Verification Badge Section - Conditionally Rendered */}
              <motion.div
                variants={itemVariants}
                className={`p-6 rounded-2xl border mt-6 ${
                  userData?.verified 
                    ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' 
                    : 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-2xl ${
                    userData?.verified ? 'bg-green-100' : 'bg-amber-100'
                  }`}>
                    <FiAward className={`w-6 h-6 ${
                      userData?.verified ? 'text-green-600' : 'text-amber-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    {userData?.isverified ? (
                      // Verified User Message
                      <>
                        <h3 className="font-bold text-gray-900 text-lg mb-2 flex items-center gap-2">
                          Congratulations! You're Verified
                          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                            <FiCheck className="w-3 h-3" />
                            Verified
                          </span>
                        </h3>
                        <p className="text-gray-700 mb-3">
                          Your verified status helps build trust with other students and increases your chances of successful transactions. 
                          Thank you for completing your profile verification!
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-gray-600">Trusted by the community</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-gray-600">Higher response rates</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      // Non-Verified User Message
                      <>
                        <h3 className="font-bold text-gray-900 text-lg mb-2 flex items-center gap-2">
                          Get Verified Today!
                          <span className="bg-amber-500 text-white text-xs px-2 py-1 rounded-full">Recommended</span>
                        </h3>
                        <p className="text-gray-700 mb-3">
                          Complete your profile with accurate information to receive a <span className="font-semibold text-amber-700">Verified Badge</span>. 
                          This builds trust with other students and increases your chances of successful transactions.
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-gray-600">Builds trust with buyers</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-gray-600">Higher response rates</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                variants={itemVariants}
                className="pt-6"
              >
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-5 px-8 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3"
                >
                  <FiSave className="w-5 h-5" />
                  {userData?.verified ? 'Update Profile' : 'Update Profile & Get Verified'}
                </button>
                <p className="text-center text-gray-500 text-sm mt-3">
                  Your information is secure and only used for verification purposes
                </p>
              </motion.div>
            </form>
          </div>
        </motion.div>

        {/* Additional Info Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <FiShield className="text-green-600" />
              Privacy First
            </h3>
            <p className="text-gray-600 text-sm">
              Your personal contact information is never shared publicly. We only display what's necessary for safe campus transactions.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <FiAward className="text-purple-600" />
              Campus Trust
            </h3>
            <p className="text-gray-600 text-sm">
              {userData?.verified 
                ? 'As a verified user, you receive 3x more responses and build reputation within our campus community.'
                : 'Verified profiles receive 3x more responses and build reputation within our campus community.'
              }
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;