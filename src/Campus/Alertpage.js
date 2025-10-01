import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { FiAlertCircle, FiCheckCircle, FiChevronDown, FiClock, FiLoader, FiShield, FiEye, FiAlertTriangle, FiUser, FiMail, FiFileText, FiTrendingUp, FiTarget, FiUsers } from 'react-icons/fi';
const ReportScamPage = () => {
  const [isExpanded, setIsExpanded] = useState(null);
  const [formData, setFormData] = useState({
    scamType: '',
    description: '',
    contactInfo: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [scamReports, setScamReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({ total: 0, resolved: 0, active: 0 });

  // Helper function to safely format dates
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date)) throw new Error('Invalid date');
      
      return {
        dateOnly: date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }),
        dateTime: date.toLocaleString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };
    } catch (e) {
      return {
        dateOnly: 'Date unavailable',
        dateTime: 'Date unavailable'
      };
    }
  };

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://campus-plum.vercel.app/api/report');
      setScamReports(response.data);
      
      // Calculate stats
      const total = response.data.length;
      const resolved = response.data.filter(r => r.status === 'Resolved').length;
      const active = response.data.filter(r => r.status === 'Active').length;
      setStats({ total, resolved, active });
      
      setError('');
    } catch (err) {
      setError('Failed to fetch reports. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchReports(); 
  }, []);

  const submitReport = async (formData) => {
    try {
      await axios.post('https://campus-plum.vercel.app/api/report', {
        scamType: formData.scamType,
        description: formData.description,
        contactInfo: formData.contactInfo
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      await fetchReports();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (err) {
      setError('Submission failed. Please check your connection and try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    await submitReport(formData);
    setFormData({ scamType: '', description: '', contactInfo: '' });
  };

  const scamTypes = [
    'Financial Fraud',
    'Phishing Scam',
    'Identity Theft',
    'Impersonation',
    'Fake Listings',
    'Payment Fraud',
    'Non-Delivery Scam',
    'Stolen Goods Resale',
    'Others'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 py-8 px-4 sm:px-6 lg:px-8">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-indigo-200/20 to-purple-300/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-200/20 to-cyan-300/20 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center justify-center p-4 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-blue-100/50 border border-white/20 mb-8"
          >
            <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
              <FiShield className="w-10 h-10 text-white" />
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-6 leading-tight"
          >
            Protect Our Community
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 max-w-3xl mx-auto text-xl sm:text-2xl leading-relaxed font-light"
          >
            Help maintain campus safety by reporting suspicious activities. 
            <span className="block text-lg text-gray-500 mt-2">
              All reports are anonymous and reviewed within 24 hours.
            </span>
          </motion.p>
        </div>

        {/* Enhanced Stats Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          <motion.div 
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl shadow-blue-100/50 p-8 border border-white/20 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full -translate-y-8 translate-x-8"></div>
            <div className="flex items-center">
              <div className="p-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-lg mr-6 group-hover:scale-110 transition-transform">
                <FiTrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Reports</p>
                <h3 className="text-xl font-bold text-gray-800 mt-1">{stats.total}</h3>
                <p className="text-xs text-gray-400 mt-2">Community vigilance</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl shadow-green-100/50 p-8 border border-white/20 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-full -translate-y-8 translate-x-8"></div>
            <div className="flex items-center">
              <div className="p-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl shadow-lg mr-6 group-hover:scale-110 transition-transform">
                <FiTarget className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Resolved Cases</p>
                <h3 className="text-xl font-bold text-gray-800 mt-1">{stats.resolved}</h3>
                <p className="text-xs text-gray-400 mt-2">Successful interventions</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl shadow-red-100/50 p-8 border border-white/20 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-500/10 to-pink-500/10 rounded-full -translate-y-8 translate-x-8"></div>
            <div className="flex items-center">
              <div className="p-4 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl shadow-lg mr-6 group-hover:scale-110 transition-transform">
                <FiUsers className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Active Cases</p>
                <h3 className="text-xl font-bold text-gray-800 mt-1">{stats.active}</h3>
                <p className="text-xs text-gray-400 mt-2">Under investigation</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mb-8 p-6 bg-red-50/90 backdrop-blur-sm rounded-2xl flex items-center gap-4 border border-red-200 shadow-lg"
            >
              <div className="p-3 bg-red-100 rounded-xl">
                <FiAlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
              </div>
              <div className="flex-1">
                <span className="text-red-800 font-medium">{error}</span>
              </div>
              <button 
                onClick={() => setError('')}
                className="p-2 hover:bg-red-100 rounded-lg transition-colors"
              >
                <span className="text-red-600 text-lg">×</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Enhanced Report Form */}
          <motion.form 
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 lg:p-10 border border-white/20 lg:sticky lg:top-8"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
                <FiFileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Report Incident
                </h2>
                <p className="text-gray-500 text-sm mt-1">Help us keep campus safe</p>
              </div>
            </div>

           {/* IMPORTANT WARNING BANNER */}
<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.8 }}
  className="mb-8 p-6 bg-gradient-to-r from-amber-50 to-orange-50/80 rounded-2xl border border-amber-200/60 shadow-lg"
>
  <div className="flex items-start gap-4">
    <div className="p-3 bg-amber-100 rounded-xl flex-shrink-0">
      <FiCheckCircle className="w-6 h-6 text-amber-600" />
    </div>
    <div className="flex-1">
      <h4 className="font-bold text-amber-800 text-sm mb-2">
        🛡️ Safety First: Verified Users Only
      </h4>
      <p className="text-amber-700 text-sm mb-3 leading-relaxed">
        <strong>Important:</strong> We can only effectively track and take action against <span className="font-semibold text-amber-800">verified users</span>. 
        Reports involving unverified accounts are significantly harder to resolve.
      </p>
      <div className="bg-white/80 p-4 rounded-xl border border-amber-200">
        <p className="text-amber-800 font-semibold text-[12px] sm:text-sm">
          💡 <span className="underline">Protect Yourself:</span> Always check for verification badges before transacting. 
          Verified users = Better protection for everyone.
        </p>
      </div>
    </div>
  </div>
</motion.div>
            
            <div className="space-y-8">
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-4 flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <FiAlertCircle className="w-4 h-4 text-indigo-600" />
                  </div>
                  Scam Type <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.scamType}
                    onChange={(e) => setFormData({ ...formData, scamType: e.target.value })}
                    className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white/70 backdrop-blur-sm transition-all duration-200 appearance-none cursor-pointer hover:border-gray-300"
                    required
                  >
                    <option value="">Select type of scam</option>
                    {scamTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <div className="absolute right-5 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <FiChevronDown className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-4 flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <FiFileText className="w-4 h-4 text-indigo-600" />
                  </div>
                  Detailed Description <span className="text-red-500 ml-1">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white/70 backdrop-blur-sm h-40 transition-all duration-200 resize-none hover:border-gray-300"
                  placeholder="Provide detailed information about the incident (location, time, people involved, method used, etc.)"
                  required
                />
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-4 flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <FiMail className="w-4 h-4 text-indigo-600" />
                  </div>
                  Contact for Follow-up (Optional)
                </label>
                <input
                  type="email"
                  value={formData.contactInfo}
                  onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                  className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white/70 backdrop-blur-sm transition-all duration-200 hover:border-gray-300"
                  placeholder="Secure email for updates (optional)"
                />
              </div>

              <motion.button
                whileHover={{ 
                  scale: 1.02, 
                  boxShadow: "0 20px 40px -10px rgba(79, 70, 229, 0.3)" 
                }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-5 px-8 rounded-2xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-indigo-500/25 flex items-center justify-center gap-3 relative overflow-hidden group"
              >
                {loading && (
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  />
                )}
                <span className="relative z-10  text-sm flex items-center gap-3">
                  {loading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <FiLoader className="w-6 h-6" />
                      </motion.div>
                      Securing Report...
                    </>
                  ) : (
                    <>
                      <FiShield className="w-6 h-6 group-hover:scale-110 transition-transform" />
                      Submit Anonymously
                    </>
                  )}
                </span>
              </motion.button>
            </div>

            {/* Security Assurance */}
            <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50/50 rounded-2xl border border-green-200/50">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-xl">
                  <FiCheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-green-800">Your Privacy is Protected</h4>
                  <p className="text-green-700 text-sm mt-1">All reports are completely anonymous and encrypted</p>
                </div>
              </div>
            </div>
          </motion.form>

          {/* Enhanced Recent Reports */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="lg:pl-4"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg">
                <FiEye className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Recent Alerts
                </h2>
                <p className="text-gray-500 mt-1">Latest security updates</p>
              </div>
            </div>
            
            {loading ? (
              <div className="flex items-center justify-center gap-4 p-12 text-gray-500 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <FiLoader className="w-8 h-8" />
                </motion.div>
                <span className="text-lg">Loading security updates...</span>
              </div>
            ) : (
              <div className="space-y-6">
                <AnimatePresence>
                  {scamReports.length === 0 ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-white/90 backdrop-blur-xl rounded-3xl p-12 text-center border border-white/20 shadow-2xl"
                    >
                      <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <FiCheckCircle className="w-10 h-10 text-green-500" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3">No Active Reports</h3>
                      <p className="text-gray-600 text-sm">Campus security is currently up to date with all reports.</p>
                    </motion.div>
                  ) : (
                    scamReports.map((report) => {
                      const formattedDate = formatDate(report.createdAt);
                      
                      return (
                        <motion.div
                          key={report.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          whileHover={{ y: -2 }}
                          className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-lg border border-white/20 overflow-hidden transition-all hover:shadow-xl cursor-pointer"
                          onClick={() => setIsExpanded(isExpanded === report.id ? null : report.id)}
                        >
                          <div className="p-6 hover:bg-gray-50/50 transition-colors">
                            <div className="flex justify-between items-start gap-4">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 mb-3">
                                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                                    report.status === 'Active' ? 'bg-red-100 text-red-800 border border-red-200' :
                                    report.status === 'Resolved' ? 'bg-green-100 text-green-800 border border-green-200' :
                                    'bg-yellow-100 text-yellow-800 border border-yellow-200'
                                  }`}>
                                    {report.status}
                                  </span>
                                  <span className="text-sm text-gray-500 flex items-center gap-1">
                                    <FiClock className="w-4 h-4" />
                                    {formattedDate.dateOnly}
                                  </span>
                                </div>
                                <h3 className="font-bold text-gray-900 text-sm mb-2">{report.scamType}</h3>
                                <p className="text-gray-600 line-clamp-2 leading-relaxed">{report.description}</p>
                              </div>
                              <motion.div
                                animate={{ rotate: isExpanded === report.id ? 180 : 0 }}
                                className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                              >
                                <FiChevronDown className="w-6 h-6 text-gray-500" />
                              </motion.div>
                            </div>
                          </div>

                          <AnimatePresence>
                            {isExpanded === report.id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden border-t border-gray-100"
                              >
                                <div className="p-6 bg-gradient-to-br from-gray-50 to-white/50">
                                  <div className="grid gap-4 md:grid-cols-2 mb-6">
                                    <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200">
                                      <div className="p-2 bg-indigo-100 rounded-lg">
                                        <FiAlertCircle className="w-5 h-5 text-indigo-600" />
                                      </div>
                                      <div>
                                        <span className="font-medium text-gray-700">Type</span>
                                        <p className="text-gray-900">{report.scamType}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200">
                                      <div className="p-2 bg-indigo-100 rounded-lg">
                                        <FiClock className="w-5 h-5 text-indigo-600" />
                                      </div>
                                      <div>
                                        <span className="font-medium text-gray-700">Reported</span>
                                        <p className="text-gray-900">{formattedDate.dateTime}</p>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-bold text-gray-800 mb-3 text-lg">Full Description</h4>
                                    <p className="text-gray-700 leading-relaxed bg-white p-5 rounded-xl border border-gray-200">
                                      {report.description}
                                    </p>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })
                  )}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        </div>

        {/* Enhanced Success Message */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="fixed bottom-8 right-8 bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl p-6 flex items-center gap-4 border border-white/20 max-w-md"
            >
              <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl shadow-lg">
                <FiCheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-900">Report Submitted Successfully</p>
                <p className="text-sm text-gray-600 mt-1">Our security team will review it within 24 hours</p>
              </div>
              <button 
                onClick={() => setShowSuccess(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <span className="text-gray-500 text-lg">×</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ReportScamPage;