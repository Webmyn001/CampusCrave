import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import confetti from "canvas-confetti";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const VipListingForm = () => {
  const [sellerInfo, setSellerInfo] = useState(null);
  const [formData, setFormData] = useState({
    businessName: "",
    address: "",
    fullDescription: "",
    workingHours: "",
    businessEmail: "",
    contactMethod: "",
    images: [],
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactMethods = ["Email", "Phone Call", "WhatsApp"];

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // ✅ Subscription check
  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const savedStatus = JSON.parse(localStorage.getItem("subscriptionStatus"));
        if (!savedStatus) {
          toast.error("🚨 Login required", { icon: "🔒" });
          navigate("/subscription");
          return;
        }
        if (savedStatus.premium !== "subscribed") {
          toast.warn("⚠️ Please subscribe to VIP plan to continue", { icon: "💳" });
          navigate("/subscription");
          return;
        }
        console.log("User is subscribed:", savedStatus);
      } catch (error) {
        console.error("Subscription check failed:", error);
        toast.error("🚨 Could not verify subscription", { icon: "❌" });
        navigate("/subscription");
      }
    };

    checkSubscription();
  }, [navigate]);

  // ✅ Fetch seller info
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://campus-plum.vercel.app/api/auth/${userId}`);
        setSellerInfo(response.data);
      } catch (error) {
        toast.error("🚨 Failed to load seller information", { icon: "❌" });
      }
    };
    if (userId) fetchData();
  }, [userId]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
  const files = Array.from(e.target.files);

  // Check total count (existing + new)
  if (formData.images.length + files.length > 4) {
    toast.error("🚨 You can only upload up to 4 images. (all must not be more than 10mb )", { icon: "⚠️" });
    return;
  }

  setIsUploading(true);

  const validFiles = files.filter(file => {
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast.error(`❌ your upload is larger than 10MB`, { icon: "⚠️" });
      return false;
    }
    return true;
  });

  const imagePromises = validFiles.map(file => new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
  }));

  const base64Images = await Promise.all(imagePromises);

  setFormData(prev => ({
    ...prev,
    images: [...prev.images, ...base64Images].slice(0, 4) // ensure max 4
  }));

  setIsUploading(false);
};

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#F59E0B", "#D97706", "#B45309"],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  setIsSubmitting(true);

    if (!sellerInfo) {
      toast.error("🚨 Seller information not loaded yet", { icon: "⏳" });
      return;
    }

    if (!token) {
      toast.error("🚨 Authentication required", { icon: "🔒" });
      return;
    }

    try {
      const payload = {
        ...formData,
        sellerInfo,
        postedTime: new Date().toISOString(),
      };

      await axios.post("https://campus-plum.vercel.app/api/vip-listings/", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("🎉 Your business profile is now live!", { icon: "🌟" });
      triggerConfetti();

      setFormData({
        businessName: "",
        address: "",
        fullDescription: "",
        workingHours: "",
        businessEmail: "",
        contactMethod: "",
        images: [],
      });
  setIsSubmitting(false);
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(`🚨 Error: ${error.response?.data?.message || "Submission failed"}`, {
        icon: "😢",
      });
    }
  setIsSubmitting(false);

  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-6 text-white">
            <motion.h1
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="text-2xl md:text-3xl font-bold text-center"
            >
              Create Business/Service Profile
            </motion.h1>
            <p className="text-center text-amber-100 mt-2">
              Perfect for items you frequently sell or services you offer regularly
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
            {/* Business Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputField
                label="Business/Service Name *"
                name="businessName"
                value={formData.businessName}
                onChange={handleInputChange}
              />
              <InputField
                label="Address *"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
              <InputField
                label="Working Hours *"
                name="workingHours"
                value={formData.workingHours}
                onChange={handleInputChange}
              />
              <InputField
                type="email"
                label="Business Email *"
                name="businessEmail"
                value={formData.businessEmail}
                onChange={handleInputChange}
              />
            </div>

            <TextAreaField
              label="Full Description *"
              name="fullDescription"
              value={formData.fullDescription}
              onChange={handleInputChange}
              placeholder="Describe your business in detail..."
            />

            <SelectField
              label="Contact Method *"
              name="contactMethod"
              value={formData.contactMethod}
              onChange={handleInputChange}
              options={contactMethods}
            />

            <ImageUpload
              isUploading={isUploading}
              images={formData.images}
              onFileChange={handleFileChange}
              onRemove={removeImage}
            />

            {/* Submit */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="pt-4"
            >
              <button
  type="submit"
  onClick={handleSubmit}
  disabled={!sellerInfo || isSubmitting}
  className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-4 px-6 rounded-xl font-semibold shadow-md transition-all duration-300 flex items-center justify-center"
>
  {!sellerInfo ? "Loading..." : isSubmitting ? "Uploading..." : "Publish Business"}
</button>
            </motion.div>
          </form>
        </motion.div>
      </div>

      <ToastContainer position="top-center" autoClose={3000} theme="colored" />
    </motion.div>
  );
};

export default VipListingForm;

/* 🔹 Reusable Fields */
const InputField = ({ label, ...props }) => (
  <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      {...props}
      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
      required
    />
  </motion.div>
);

const SelectField = ({ label, options, ...props }) => (
  <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <select
      {...props}
      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
      required
    >
      <option value="">Select</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </motion.div>
);

const TextAreaField = ({ label, ...props }) => (
  <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <textarea
      {...props}
      rows="4"
      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition resize-none"
      required
    />
  </motion.div>
);

const ImageUpload = ({ isUploading, images, onFileChange, onRemove }) => (
  <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-3">
    <label className="block text-sm font-medium text-gray-700">Upload Images</label>
    <label
      className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-all
        ${isUploading ? "border-amber-400 bg-amber-50" : "border-gray-300 hover:border-amber-400 hover:bg-amber-50"}`}
    >
      <input type="file" multiple onChange={onFileChange} className="hidden" accept="image/*" />
      <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4">
        {isUploading ? (
          <p className="text-sm text-amber-600">Uploading...</p>
        ) : (
          <>
            <svg className="w-10 h-10 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-amber-600">Click to upload</span> or drag and drop
              <p className="text-center">Maximum of 4 Images</p>
            </p>
            <p className="text-xs text-gray-500 mt-1">PNG, JPG, JPEG up to 10MB</p>
          </>
        )}
      </div>
    </label>

    {images.length > 0 && (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-3">
        {images.map((img, index) => (
          <div key={index} className="relative group">
            <img src={img} alt="preview" className="w-full h-24 object-cover rounded-lg border" />
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    )}
  </motion.div>
);
