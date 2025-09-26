import { useState, useEffect } from "react";
import { FiUser, FiPhone, FiBook, FiHome, FiCamera, FiSave, FiShield, FiAlertTriangle, FiCheck, FiAward } from "react-icons/fi";
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
        const res = await axios.get(`http://localhost:5000/api/auth/${userId}`, {
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
        `http://localhost:5000/api/auth/${userId}`,
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
            {/* Error */}
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

            {/* Success */}
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
                    {preview || userData?.profilePhoto?.url ? (
                      <img
                        src={preview || userData?.profilePhoto?.url}
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={userData?.name || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={userData?.phone || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                    />
                  </div>

                  {/* Hostel */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Hostel</label>
                    <input
                      type="text"
                      name="hostel"
                      value={userData?.hostel || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Course */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Course</label>
                    <input
                      type="text"
                      name="course"
                      value={userData?.course || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                    />
                  </div>

                  {/* Year */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Year</label>
                    <select
                      name="year"
                      value={userData?.year || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                    >
                      <option value="">Select Year</option>
                      {[1, 2, 3, 4, 5].map((year) => (
                        <option key={year} value={year}>Year {year}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Emergency Contact</label>
                <input
                  type="tel"
                  name="emergencyContact"
                  value={userData?.emergencyContact || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                />
              </div>

              {/* Security Note */}
              <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 mt-4">
                <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                  Important Note <FiAward className="text-amber-500" />
                </h3>
                <p className="text-gray-700 text-sm">
                  The information you provide must be accurate as it helps us protect the community against scams.
                  Once verified, you will receive a <span className="font-semibold text-indigo-700">Verified Badge</span>,
                  which builds trust with buyers.
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-8 rounded-xl font-semibold shadow-md mt-6"
              >
                <FiSave className="inline-block mr-2" />
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
