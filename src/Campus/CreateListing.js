import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import confetti from 'canvas-confetti';
import 'react-toastify/dist/ReactToastify.css';

const ProductForm = () => {
  const [sellerInfo, setSellerInfo] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    condition: '',
    contactMethod: '',
    images: []
  });

  const conditions = ['New', 'Like New', 'Used - Good', 'Used - Fair'];
  const contactMethods = ['In-app Messaging', 'Email', 'Phone Call', 'WhatsApp'];

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://campus-plum.vercel.app/api/auth/${userId}`);
        setSellerInfo(response.data);
      } catch (error) {
        toast.error('🚨 Failed to load seller information', { icon: '❌' });
      }
    };
    
    if(userId) fetchData();
  }, [userId]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    
    // Convert files to base64 strings
    const imagePromises = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
      });
    });

    const base64Images = await Promise.all(imagePromises);
    
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...base64Images]
    }));
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#3B82F6', '#10B981', '#6366F1']
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!sellerInfo) {
      toast.error('🚨 Seller information not loaded yet', { icon: '⏳' });
      return;
    }

    if (!token) {
      toast.error('🚨 Authentication required', { icon: '🔒' });
      return;
    }

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        sellerInfo,
        postedTime: new Date().toISOString()
      };

      const response = await axios.post('https://campus-plum.vercel.app/api/listings/', payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      toast.success('🎉 Listing created successfully!', { icon: '🌟' });
      triggerConfetti();
      
      setFormData({
        title: '',
        price: '',
        description: '',
        condition: '',
        contactMethod: '',
        images: []
      });

    } catch (error) {
      console.error('Submission error:', error);
      toast.error(`🚨 Error: ${error.response?.data?.message || 'Submission failed'}`, {
        icon: '😢',
      });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <motion.h1 
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="text-4xl font-bold text-gray-800 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            Publish Urgent Listing
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              <label className="block text-sm font-semibold text-gray-600 mb-3">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                required
              />
            </motion.div>

            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <label className="block text-sm font-semibold text-gray-600 mb-3">Price ($)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                required
              />
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-sm font-semibold text-gray-600 mb-3">Condition</label>
              <div className="relative">
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all appearance-none pr-10"
                  required
                >
                  <option value="">Select Condition</option>
                  {conditions.map((condition) => (
                    <option key={condition} value={condition}>{condition}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-sm font-semibold text-gray-600 mb-3">Contact Method</label>
              <div className="relative">
                <select
                  name="contactMethod"
                  value={formData.contactMethod}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all appearance-none pr-10"
                  required
                >
                  <option value="">Select Contact Method</option>
                  {contactMethods.map((method) => (
                    <option key={method} value={method}>{method}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-sm font-semibold text-gray-600 mb-3">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all h-40"
              required
            />
          </motion.div>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block text-sm font-semibold text-gray-600 mb-3">Upload Images</label>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-blue-500 transition-colors group">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 text-gray-400 mb-2 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-sm text-gray-500 group-hover:text-blue-600 transition-colors">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG, JPEG up to 10MB</p>
                {formData.images.length > 0 && (
                  <p className="text-sm text-blue-600 mt-2">{formData.images.length} files selected</p>
                )}
              </div>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
            </label>
          </motion.div>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >

            <input
                type="file"
                multiple
                onChange={handleFileChange}
                className=""
                accept="image/*"
              />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] shadow-lg relative overflow-hidden group"
              disabled={!sellerInfo}
            >
              <span className="relative z-10">{sellerInfo ? 'Publish Listing' : 'Loading...'}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </button>
          </motion.div>
        </form>
      </motion.div>
      
      <ToastContainer 
        position="top-center"
        autoClose={3000}
        theme="colored"
        toastStyle={{
          borderRadius: '14px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          fontSize: '0.9rem',
          padding: '16px',
        }}
        progressStyle={{
          height: '3px'
        }}
        bodyStyle={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}
        closeButton={false}
      />
    </motion.div>
  );
};

export default ProductForm;