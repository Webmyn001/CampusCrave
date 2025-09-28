import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import "react-toastify/dist/ReactToastify.css";

const ProductForm = () => {
  const [sellerInfo, setSellerInfo] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    condition: "",
    contactMethod: "",
    images: [],
  });
  const [isUploading, setIsUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
  

  const conditions = ["New", "Like New", "Used - Good", "Used - Fair"];
  const contactMethods = [
    "Email",
    "Phone Call",
    "WhatsApp",
    "Others"
  ];

const savedStatus = JSON.parse(localStorage.getItem("subscriptionStatus"));
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  console.log(savedStatus)
  // ✅ Check subscription status
  useEffect(() => {
    const checkSubscription = async () => {
      try {
        // 1. Get subscription status from localStorage
        const savedStatus = JSON.parse(localStorage.getItem("subscriptionStatus"));

        // 2. If no status saved at all → force subscription
        if (!savedStatus) {
          toast.error("🚨 Login required", { icon: "🔒" });
          navigate("/publish");
          return;
        }

        // 3. Check if STANDARD (or your chosen plan) is subscribed
        if (savedStatus.standard !== "subscribed") {
          toast.warn("⚠️ Please subscribe to continue", { icon: "💳" });
          navigate("/publish");
          return;
        }

        // ✅ If we reach here → user is subscribed
        console.log("User is subscribed and active:", savedStatus);
      } catch (error) {
        console.error("Subscription check failed:", error);
        toast.error("🚨 Could not verify subscription", { icon: "❌" });
        navigate("/publish");
      }
    };

    checkSubscription();
  }, [navigate]);

  // ✅ Fetch seller info
  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const response = await axios.get(
          `https://campus-plum.vercel.app/api/auth/${userId}`
        );
        setSellerInfo(response.data);
      } catch (error) {
        toast.error("🚨 Failed to load seller information", { icon: "❌" });
      }
    };

    if (userId) fetchSeller();
  }, [userId]);

  // ✅ Handlers
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);

    if (formData.images.length + files.length > 3) {
      toast.error("🚨 Maximum 3 images allowed", { icon: "⚠️" });
      return;
    }

    setIsUploading(true);

    const imagePromises = files.map(
      (file) =>
        new Promise((resolve, reject) => {
          if (file.size > 10 * 1024 * 1024) {
            toast.error(`🚨 Your Upload exceeds 10MB`, { icon: "📦" });
            reject(new Error("File too large"));
            return;
          }

          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = () => reject(new Error("File reading failed"));
        })
    );

    try {
      const base64Images = await Promise.all(imagePromises);
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...base64Images],
      }));
    } catch (err) {
      console.error(err.message);
    } finally {
      setIsUploading(false);
    }
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
      colors: ["#10B981", "#059669", "#047857"],
    });
  };

  // ✅ Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
  setIsSubmitting(true);
 
    if (!sellerInfo) {
      toast.error("🚨 Seller info not loaded yet", { icon: "⏳" });
      return;
    }

    if (formData.images.length === 0) {
      toast.error("🚨 Please upload at least 1 image", { icon: "🖼️" });
      return;
    }

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        sellerInfo,
        postedTime: new Date().toISOString(),
      };

      await axios.post(
        "https://campus-plum.vercel.app/api/pro-listings/",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("🎉 Listing created successfully!", { icon: "🌟" });
      triggerConfetti();

      setFormData({
        title: "",
        price: "",
        description: "",
        condition: "",
        contactMethod: "",
        images: [],
      });
  setIsSubmitting(false);

    } catch (error) {
      console.error("Submission error:", error);
      toast.error(
        `🚨 Error: ${error.response?.data?.message || "Submission failed"}`,
        { icon: "😢" }
      );
    }
  setIsSubmitting(false);

  };

  // ✅ UI
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white">
            <motion.h1
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="text-2xl md:text-3xl font-bold text-center"
            >
              Create Premium Listing
            </motion.h1>
            <p className="text-center text-emerald-100 mt-2">
              Showcase your item with our Premium features
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
            {/* Title + Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputField
                label="Title *"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter item title"
                required
              />
              <InputField
                label="Price (#) *"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="0.00"
                required
              />
            </div>

            {/* Condition + Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <SelectField
                label="Condition *"
                name="condition"
                value={formData.condition}
                onChange={handleInputChange}
                options={conditions}
              />
              <SelectField
                label="Contact Method *"
                name="contactMethod"
                value={formData.contactMethod}
                onChange={handleInputChange}
                options={contactMethods}
              />
            </div>

            {/* Description */}
            <TextAreaField
              label="Description *"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your premium item in detail..."
            />

            {/* Image Upload */}
            <ImageUpload
              isUploading={isUploading}
              images={formData.images}
              onFileChange={handleFileChange}
              onRemove={removeImage}
            />

            {/* Submit Button */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="pt-4"
            >
              <button
  type="submit"
  onClick={handleSubmit}
  disabled={!sellerInfo || isSubmitting}
  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 px-6 rounded-xl font-semibold shadow-md transition-all duration-300 flex items-center justify-center"
>
  {!sellerInfo ? "Loading..." : isSubmitting ? "Uploading..." : "Upload Premium Listing"}
</button>
            </motion.div>
          </form>
        </motion.div>
      </div>

      {/* Toasts */}
      <ToastContainer position="top-center" autoClose={3000} theme="colored" />
    </motion.div>
  );
};

export default ProductForm;

// 🔹 Reusable Subcomponents
const InputField = ({ label, ...props }) => (
  <motion.div
    initial={{ x: -20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    className="space-y-2"
  >
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      {...props}
      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
    />
  </motion.div>
);

const SelectField = ({ label, options, ...props }) => (
  <motion.div
    initial={{ x: 20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    className="space-y-2"
  >
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <select
      {...props}
      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
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
  <motion.div
    initial={{ scale: 0.95, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    className="space-y-2"
  >
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <textarea
      {...props}
      rows="4"
      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition resize-none"
      required
    />
  </motion.div>
);

const ImageUpload = ({ isUploading, images, onFileChange, onRemove }) => (
  <motion.div
    initial={{ scale: 0.95, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    className="space-y-3"
  >
    <label className="block text-sm font-medium text-gray-700">
      Upload Images
    </label>
    <label
      className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-all
        ${
          isUploading
            ? "border-emerald-400 bg-emerald-50"
            : "border-gray-300 hover:border-emerald-400 hover:bg-emerald-50"
        }`}
    >
      <input
        type="file"
        multiple
        onChange={onFileChange}
        className="hidden"
        accept="image/*"
      />
      <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4">
        {isUploading ? (
          <p className="text-sm text-emerald-600">Uploading...</p>
        ) : (
          <>
            <svg
              className="w-10 h-10 text-gray-400 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-emerald-600">Click to upload</span>{" "}
              or drag and drop
            </p>
              <p className="text-center">Maximum of 3 Images</p>
            <p className="text-xs text-gray-500 mt-1">PNG, JPG, JPEG up to 3MB</p>
          </>
        )}
      </div>
    </label>

    {images.length > 0 && (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-3">
        {images.map((img, index) => (
          <div key={index} className="relative group">
            <img
              src={img}
              alt="preview"
              className="w-full h-24 object-cover rounded-lg border"
            />
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
