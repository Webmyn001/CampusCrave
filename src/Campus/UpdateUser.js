import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiUser, FiMail, FiSave } from 'react-icons/fi';

const ProfileUpdateForm = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    // Add other fields as needed
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get user ID from your authentication system
  const userId = localStorage.getItem('userId'); // You need to store this during login

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://campus-plum.vercel.app/api/auth/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUserData(response.data.user);
      } catch (err) {
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.put(
        `https://campus-plum.vercel.app/api/auth/${userId}`,
        userData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      setSuccess('Profile updated successfully!');
      // Update local storage if email changed
      if (userData.email) {
        localStorage.setItem('userEmail', userData.email);
      }
      
      // Optional: Update global state here if using state management
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Update failed. Please try again.';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div>Loading profile...</div>;

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FiUser className="text-indigo-600" /> 
        Update Profile
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <div className="flex items-center gap-2">
            <FiUser className="text-gray-400" />
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <div className="flex items-center gap-2">
            <FiMail className="text-gray-400" />
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        {/* Add more fields as needed */}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
        >
          <FiSave className="text-lg" />
          {isSubmitting ? 'Updating...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default ProfileUpdateForm;