import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import confetti from 'canvas-confetti';
import 'react-toastify/dist/ReactToastify.css';

const ProductForm = () => {
  const [sellerInfo, setSellerInfo] = useState(null);
  const [formData, setFormData] = useState({
    businessName: '',
    address: '',
    fullDescription: '',
    workingHours: '',
    businessEmail: '',
    contactMethod: '',
    images: []
  });

  const [isUploading, setIsUploading] = useState(false);

  const contactMethods = ['In-app Messaging', 'Email', 'Phone Call', 'WhatsApp'];

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/${userId}`);
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
    
    const imagePromises = files.map(file => new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
    }));

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
      colors: ['#F59E0B', '#D97706', '#B45309']
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

      const response = await axios.post('http://localhost:5000/api/vip-listings/', payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      toast.success('🎉 Recurring Listing created successfully!', { icon: '🌟' });
      triggerConfetti();
      
      setFormData({
        title: '',
        businessName: '',
        address: '',
        fullDescription: '',
        workingHours: '',
        businessEmail: '',
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
      className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
        >
          <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-6 text-white">
            <motion.h1 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="text-2xl md:text-3xl font-bold text-center"
            >
              Create Premium Listing
            </motion.h1>
            <p className="text-center text-amber-100 mt-2">
              Perfect for items you frequently sell or services you offer regularly
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">

            {/* Business Info Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Business/Service Name *</label>
                <input type="text" name="businessName" value={formData.businessName} onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition" required />
              </motion.div>

              <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Address *</label>
                <input type="text" name="address" value={formData.address} onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition" required />
              </motion.div>

              <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Working Hours *</label>
                <input type="text" name="workingHours" value={formData.workingHours} onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition" required />
              </motion.div>

              <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Business Email *</label>
                <input type="email" name="businessEmail" value={formData.businessEmail} onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition" required />
              </motion.div>
            </div>

            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Full Description *</label>
              <textarea name="fullDescription" value={formData.fullDescription} onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition resize-none"
                rows="4" placeholder="Describe your business in detail..." required />
            </motion.div>

            {/* Original Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Contact Method *</label>
                <select name="contactMethod" value={formData.contactMethod} onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition" required>
                  <option value="">Select Contact Method</option>
                  {contactMethods.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </motion.div>
            </div>

            {/* Images */}
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Upload Images</label>
              <label className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-all
                ${isUploading ? 'border-amber-400 bg-amber-50' : 'border-gray-300 hover:border-amber-400 hover:bg-amber-50'}`}>
                <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4">
                  {isUploading ? (
                    <div className="animate-pulse flex flex-col items-center">
                      <div className="w-10 h-10 bg-amber-200 rounded-full mb-2"></div>
                      <p className="text-sm text-amber-600 font-medium">Uploading images...</p>
                    </div>
                  ) : (
                    <>
                      <svg className="w-10 h-10 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      <p className="text-sm text-gray-600 text-center">
                        <span className="font-semibold text-amber-600">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG, JPEG up to 10MB</p>
                    </>
                  )}
                </div>
                <input type="file" multiple onChange={handleFileChange} className="hidden" accept="image/*" />
              </label>

              {formData.images.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">{formData.images.length} image{formData.images.length !== 1 ? 's' : ''} selected</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {formData.images.map((img, index) => (
                      <div key={index} className="relative group">
                        <img src={img} alt="preview" className="w-full h-24 object-cover rounded-lg border shadow-sm" />
                        <button type="button" onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="pt-4">
              <button type="submit" className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-4 px-6 rounded-xl font-semibold shadow-md transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center" disabled={!sellerInfo}>
                {sellerInfo ? (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Create Recurring Listing
                  </>
                ) : 'Loading...'}
              </button>
            </motion.div>
          </form>
        </motion.div>
      </div>
      
      <ToastContainer 
        position="top-center"
        autoClose={3000}
        theme="colored"
        toastStyle={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', fontSize: '0.9rem', padding: '16px' }}
        progressStyle={{ height: '3px' }}
        bodyStyle={{ display: 'flex', alignItems: 'center', gap: '12px' }}
        closeButton={false}
      />
    </motion.div>
  );
};

export default ProductForm;
