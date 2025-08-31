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

  const [isUploading, setIsUploading] = useState(false);

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
    setIsUploading(true);
    
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
    
    setIsUploading(false);
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#10B981', '#059669', '#047857']
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

      const response = await axios.post('https://campus-plum.vercel.app/api/pro-listings/', payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      toast.success('🎉 Premium Listing created successfully!', { icon: '🌟' });
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
      className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
        >
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white">
            <motion.h1 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="text-2xl md:text-3xl font-bold text-center"
            >
              Create Standard Listing
            </motion.h1>
            <p className="text-center text-emerald-100 mt-2">
              Showcase your item with our Standard Listing features
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="space-y-2"
              >
                <label className="block text-sm font-medium text-gray-700">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                  placeholder="Enter item title"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="space-y-2"
              >
                <label className="block text-sm font-medium text-gray-700">Price (#) *</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">#</span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                    placeholder="0.00"
                    required
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-2"
              >
                <label className="block text-sm font-medium text-gray-700">Condition *</label>
                <div className="relative">
                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition appearance-none bg-white"
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
                className="space-y-2"
              >
                <label className="block text-sm font-medium text-gray-700">Contact Method *</label>
                <div className="relative">
                  <select
                    name="contactMethod"
                    value={formData.contactMethod}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition appearance-none bg-white"
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
              className="space-y-2"
            >
              <label className="block text-sm font-medium text-gray-700">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition resize-none"
                rows="4"
                placeholder="Describe your premium item in detail..."
                required
              />
            </motion.div>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-3"
            >
              <label className="block text-sm font-medium text-gray-700">Upload Images</label>
              <label className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-all
                ${isUploading ? 'border-emerald-400 bg-emerald-50' : 'border-gray-300 hover:border-emerald-400 hover:bg-emerald-50'}`}>
                <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4">
                  {isUploading ? (
                    <div className="animate-pulse flex flex-col items-center">
                      <div className="w-10 h-10 bg-emerald-200 rounded-full mb-2"></div>
                      <p className="text-sm text-emerald-600 font-medium">Uploading images...</p>
                    </div>
                  ) : (
                    <>
                      <svg className="w-10 h-10 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      <p className="text-sm text-gray-600 text-center">
                        <span className="font-semibold text-emerald-600">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG, JPEG up to 10MB</p>
                    </>
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

              {/* Thumbnails */}
              {formData.images.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">{formData.images.length} image{formData.images.length !== 1 ? 's' : ''} selected</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {formData.images.map((img, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={img}
                          alt="preview"
                          className="w-full h-24 object-cover rounded-lg border shadow-sm"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="pt-4"
            >
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-4 px-6 rounded-xl font-semibold shadow-md transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center"
                disabled={!sellerInfo}
              >
                {sellerInfo ? (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Publish Premium Listing
                  </>
                ) : (
                  'Loading...'
                )}
              </button>
            </motion.div>
          </form>
        </motion.div>
      </div>
      
      <ToastContainer 
        position="top-center"
        autoClose={3000}
        theme="colored"
        toastStyle={{
          borderRadius: '12px',
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