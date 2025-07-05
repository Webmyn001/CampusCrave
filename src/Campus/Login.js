import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post(
        'https://campus-plum.vercel.app/api/auth/login',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      // Handle successful login
      if (response.data) {
      localStorage.setItem('token', response.data.token);
        localStorage.setItem('Login', JSON.stringify(response.data.Login));
        localStorage.setItem('userEmail', response.data.user.email); 
        localStorage.setItem('userId', response.data.user._id); 


      }
            console.log(response.data.Login)
            window.location.assign('/profile');
    } catch (err) {
      const errorMessage = err.response?.data?.message 
        || err.message 
        || 'Login failed. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10 transition-all duration-300 hover:shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-600 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your CampusCrave account</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              University Email
            </label>
            <div className="relative group">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                placeholder="student@university.edu"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative group">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                placeholder="••••••••"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3.5 px-4 rounded-lg font-semibold hover:from-indigo-700 hover:to-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-indigo-200 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              'Signing In...'
            ) : (
              <>
                Continue
                <FiArrowRight className="text-lg" />
              </>
            )}
          </button>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600 hover:text-gray-800 cursor-pointer">
              <input 
                type="checkbox" 
                className="rounded border-gray-300" 
                disabled={isLoading}
              />
              Remember me
            </label>
            <Link 
              to="/forgot-password" 
              className="text-indigo-600 hover:text-indigo-700"
            >
              Forgot password?
            </Link>
          </div>

          <p className="text-center text-gray-600 mt-8">
            New to CampusMart?{' '}
            <Link 
              to="/signup" 
              className="text-indigo-600 font-semibold hover:text-indigo-700"
            >
              Create account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;