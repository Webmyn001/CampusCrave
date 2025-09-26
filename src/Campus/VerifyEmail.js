import { useEffect, useState, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";

export default function VerifyEmail() {
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const hasRun = useRef(false); // ✅ track if we've already called the API

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  useEffect(() => {
    const verify = async () => {
      if (hasRun.current) return; // ✅ stop duplicate calls
      hasRun.current = true;

      if (!token || !email) {
        setMessage("Invalid verification link.");
        return;
      }

      try {
        const res = await axios.get(
          `http://localhost:5000/api/auth/verify-email?token=${token}&email=${email}`
        );
        setMessage(res.data.message);
      } catch (err) {
        setMessage(err.response?.data?.message || "Verification failed.");
      }
    };

    verify();
  }, [token, email]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10 text-center">
        <h2 className="text-3xl font-bold text-indigo-600 mb-4">Email Verification</h2>
        <p className="text-gray-700 mb-6">{message}</p>
        <Link
          to="/login"
          className="inline-block bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}
