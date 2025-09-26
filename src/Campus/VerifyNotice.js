import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function VerifyNotice() {
  const location = useLocation();
  const initialEmail = location.state?.email || ''; // pre-fill if redirected from login
  const [email, setEmail] = useState(initialEmail);
  const [message, setMessage] = useState('');

  const handleResend = async () => {
    if (!email) {
      setMessage('Please enter your email.');
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/resend-verification-email",
        { email }
      );
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to resend email.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10 text-center">
        <h2 className="text-3xl font-bold text-indigo-600 mb-4">Verify Your Email</h2>
        <p className="text-gray-700 mb-6">
          We've sent a verification link to your email. Please click the link to activate your account.
        </p>

        <input
          type="email"
          placeholder="Enter your email to resend"
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={handleResend}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Resend Verification Email
        </button>

        {message && <p className="mt-4 text-green-600">{message}</p>}

        <Link
          to="/login"
          className="block mt-6 text-indigo-600 font-semibold hover:text-indigo-700"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}
