import { useEffect, useState, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, MailCheck, Loader2, ArrowLeft, Home } from "lucide-react";
import axios from "axios";

export default function VerifyEmail() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("loading"); // loading, success, error
  const [searchParams] = useSearchParams();
  const hasRun = useRef(false);

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  useEffect(() => {
    const verify = async () => {
      if (hasRun.current) return;
      hasRun.current = true;

      if (!token || !email) {
        setMessage("Invalid verification link. Please check your email and try again.");
        setStatus("error");
        return;
      }

      try {
        setStatus("loading");
        const res = await axios.get(
          `https://campus-plum.vercel.app/api/auth/verify-email?token=${token}&email=${email}`
        );
        setMessage(res.data.message || "Email verified successfully!");
        setStatus("success");
      } catch (err) {
        setMessage(err.response?.data?.message || "Verification failed. Please try again.");
        setStatus("error");
      }
    };

    verify();
  }, [token, email]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.8
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        delay: 0.2
      }
    }
  };

  const buttonVariants = {
    hover: { scale: 1.02, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" },
    tap: { scale: 0.98 }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-500/10 via-blue-500/10 to-purple-500/10 p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-300/20 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-lg"
      >
        <motion.div
          variants={cardVariants}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
        >
          {/* Header Section */}
          <div className={`p-8 text-center ${
            status === "success" 
              ? "bg-gradient-to-r from-emerald-500 to-green-600" 
              : status === "error" 
              ? "bg-gradient-to-r from-rose-500 to-red-600" 
              : "bg-gradient-to-r from-blue-500 to-indigo-600"
          }`}>
            <motion.div
              variants={iconVariants}
              className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm"
            >
              <AnimatePresence mode="wait">
                {status === "loading" && (
                  <motion.div
                    key="loading"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-10 h-10"
                  >
                    <Loader2 className="w-10 h-10 text-white animate-spin" />
                  </motion.div>
                )}
                {status === "success" && (
                  <motion.div
                    key="success"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <CheckCircle2 className="w-10 h-10 text-white" />
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div
                    key="error"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <XCircle className="w-10 h-10 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <h2 className="text-3xl font-bold text-white mb-2">
              {status === "loading" && "Verifying Email..."}
              {status === "success" && "Email Verified!"}
              {status === "error" && "Verification Failed"}
            </h2>
            <p className="text-white/90">
              {status === "loading" && "Please wait while we verify your email"}
              {status === "success" && "Your account has been successfully verified"}
              {status === "error" && "We encountered an issue verifying your email"}
            </p>
          </div>

          {/* Content Section */}
          <div className="p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={status}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                {/* Loading State */}
                {status === "loading" && (
                  <div className="space-y-4">
                    <div className="w-full bg-gray-200/50 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        className="bg-blue-500 h-2 rounded-full"
                      />
                    </div>
                    <p className="text-gray-600">Verifying your email address...</p>
                  </div>
                )}

                {/* Success State */}
                {status === "success" && (
                  <div className="space-y-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring" }}
                      className="w-16 h-16 mx-auto bg-emerald-100 rounded-2xl flex items-center justify-center"
                    >
                      <MailCheck className="w-8 h-8 text-emerald-600" />
                    </motion.div>
                    <p className="text-gray-700 leading-relaxed">{message}</p>
                    <div className="bg-emerald-50/80 border border-emerald-200/60 rounded-xl p-4">
                      <p className="text-sm text-emerald-700">
                        You can now log in to your account and start using Campus Crave!
                      </p>
                    </div>
                  </div>
                )}

                {/* Error State */}
                {status === "error" && (
                  <div className="space-y-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring" }}
                      className="w-16 h-16 mx-auto bg-rose-100 rounded-2xl flex items-center justify-center"
                    >
                      <XCircle className="w-8 h-8 text-rose-600" />
                    </motion.div>
                    <p className="text-gray-700 leading-relaxed">{message}</p>
                    <div className="bg-rose-50/80 border border-rose-200/60 rounded-xl p-4">
                      <p className="text-sm text-rose-700">
                        Please check your email for the correct verification link or request a new one.
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex gap-4 mt-8"
            >
              {status === "success" && (
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="flex-1"
                >
                  <Link
                    to="/login"
                    className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Login
                  </Link>
                </motion.div>
              )}
              
              {status === "error" && (
                <>
                  <motion.div
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="flex-1"
                  >
                    <Link
                      to="/login"
                      className="w-full bg-gradient-to-r from-gray-500 to-gray-600 text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back to Login
                    </Link>
                  </motion.div>
                  <motion.div
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="flex-1"
                  >
                    <Link
                      to="/"
                      className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200"
                    >
                      <Home className="w-4 h-4" />
                      Go Home
                    </Link>
                  </motion.div>
                </>
              )}
            </motion.div>
          </div>
        </motion.div>

        
      </motion.div>
    </div>
  );
}