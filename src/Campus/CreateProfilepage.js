import { useState, useEffect } from "react";
import {
  FiUser, FiPhone, FiBook, FiHome, FiCamera, FiSave,
  FiShield, FiAlertTriangle, FiCheck, FiAward,
  FiMapPin, FiCalendar
} from "react-icons/fi";
import { motion } from "framer-motion";
import axios from "axios";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [preview, setPreview] = useState(null);
  const [newPhoto, setNewPhoto] = useState(null);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  // Function to remove +234 prefix from phone numbers
  const removeCountryCode = (phone) => {
    if (!phone) return "";
    // Remove +234 or 234 prefix if present
    return phone.replace(/^(\+?234)/, "").replace(/[\s-]/g, "");
  };

  // Process user data to remove country codes from phone numbers
  const processUserData = (data) => {
    if (!data) return data;
    
    const processedData = { ...data };
    
    // Remove +234 prefix from phone numbers for display/editing
    if (processedData.phone) {
      processedData.phone = removeCountryCode(processedData.phone);
    }
    
    if (processedData.whatsapp) {
      processedData.whatsapp = removeCountryCode(processedData.whatsapp);
    }
    
    return processedData;
  };

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`https://campus-plum.vercel.app/api/auth/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Process the data to remove country codes before setting state
        setUserData(processUserData(res.data));
      } catch (err) {
        setError("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId, token]);

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "phone" || name === "whatsapp") {
      // Remove any non-digit characters
      let cleanedValue = value.replace(/[^\d]/g, "");
      
      // Limit to 10 digits (without +234)
      if (cleanedValue.length <= 10) {
        setUserData({ ...userData, [name]: cleanedValue });
      }
    } else {
      setUserData({ ...userData, [name]: value });
    }
  };

  // Prepare data for submission - add +234 prefix to phone numbers
  const prepareSubmitData = (data) => {
    const submitData = { ...data };
    
    // Add +234 prefix to phone numbers if they have value
    if (submitData.phone && submitData.phone.length === 10) {
      submitData.phone = `+234${submitData.phone}`;
    }
    
    if (submitData.whatsapp && submitData.whatsapp.length === 10) {
      submitData.whatsapp = `+234${submitData.whatsapp}`;
    }
    
    return submitData;
  };

  // Handle file upload preview
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("🚨 Profile photo must be less than 5MB");
      return;
    }

    setPreview(URL.createObjectURL(file));

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setNewPhoto(reader.result);
  };

  // Update text details only
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const updates = prepareSubmitData(userData);
      delete updates.profilePhoto; // do not send photo in this update

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

      // Process the response data to remove country codes before setting state
      setUserData(processUserData(res.data.user));
      setSuccess("Profile details updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    }
  };

  // Update only photo
  const handlePhotoUpdate = async () => {
    if (!newPhoto) {
      setError("Please select a photo first");
      return;
    }

    try {
      const res = await axios.put(
        `https://campus-plum.vercel.app/api/auth/${userId}`,
        { profilePhoto: newPhoto },
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
      setSuccess("Profile photo updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update photo");
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 120 },
    },
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
                  <h3 className="font-semibold text-red-800">Error</h3>
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
                  <h3 className="font-semibold text-green-800">Success</h3>
                  <p className="text-green-600 text-sm mt-1">{success}</p>
                </div>
              </motion.div>
            )}

            {/* PHOTO SECTION */}
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

              <div className="text-center mt-2">
                <button
                  type="button"
                  onClick={handlePhotoUpdate}
                  className="bg-indigo-600 text-white px-5 py-2 rounded-xl font-medium shadow hover:bg-indigo-700 transition"
                >
                  Update Photo
                </button>
              </div>
            </motion.div>

            {/* FORM FIELDS */}
            <form onSubmit={handleProfileUpdate} className="space-y-8">
              <motion.div
                variants={containerVariants}
                className="grid gap-8 md:grid-cols-2"
              >
                {/* LEFT COLUMN */}
                <div className="space-y-6">
                  {/* Full Name */}
                  <motion.div variants={itemVariants} className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <FiUser className="text-indigo-600" /> Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={userData?.name || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="Enter your full name"
                    />
                  </motion.div>

                  {/* Phone */}
                  <motion.div variants={itemVariants} className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <FiPhone className="text-blue-600" /> Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 text-sm">+234</span>
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={userData?.phone || ""}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="8012345678"
                        maxLength={10}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Enter your 10-digit number without the country code
                    </p>
                  </motion.div>

                  {/* Hostel */}
                  <motion.div variants={itemVariants} className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <FiHome className="text-green-600" /> Hostel
                    </label>
                    <input
                      type="text"
                      name="hostel"
                      value={userData?.hostel || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="Your hostel name"
                    />
                  </motion.div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="space-y-6">
                  {/* Course */}
                  <motion.div variants={itemVariants} className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <FiBook className="text-purple-600" /> Course
                    </label>
                    <input
                      type="text"
                      name="course"
                      value={userData?.course || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="Your course of study"
                    />
                  </motion.div>

                  {/* Year */}
                  <motion.div variants={itemVariants} className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <FiCalendar className="text-amber-600" /> Academic Year
                    </label>
                    <select
                      name="year"
                      value={userData?.year || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select Your Year</option>
                      {[1, 2, 3, 4, 5].map((year) => (
                        <option key={year} value={year}>
                          Year {year}
                        </option>
                      ))}
                    </select>
                  </motion.div>

                  {/* WhatsApp */}
                  <motion.div variants={itemVariants} className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <FiShield className="text-red-600" /> WhatsApp
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 text-sm">+234</span>
                      </div>
                      <input
                        type="tel"
                        name="whatsapp"
                        value={userData?.whatsapp || ""}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        placeholder="8012345678"
                        maxLength={10}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Enter 10-digit number without country code
                    </p>
                  </motion.div>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={itemVariants} className="pt-6">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-5 px-8 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3"
                >
                  <FiSave className="w-5 h-5" />
                  Update Profile
                </button>
                <p className="text-center text-gray-500 text-sm mt-3">
                  Your information is secure and only used for verification purposes
                </p>
              </motion.div>
            </form>
          </div>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.5 }} 
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <FiShield className="text-green-600" /> Privacy First
            </h3>
            <p className="text-gray-600 text-sm">
              Your personal contact information is never shared publicly. We only display what's necessary for safe campus transactions.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <FiAward className="text-purple-600" /> Campus Trust
            </h3>
            <p className="text-gray-600 text-sm">
              {userData?.verified ? 'As a verified user, you receive 3x more responses and build reputation within our campus community.' : 'Verified profiles receive 3x more responses and build reputation within our campus community.'}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;