import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { FiAlertCircle, FiCheckCircle, FiChevronDown, FiClock, FiLoader, FiShield, FiEye, FiAlertTriangle, FiUser, FiMail, FiFileText } from 'react-icons/fi';

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
      setTimeout(() => setShowSuccess(false), 3000);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center justify-center p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg mb-6"
          >
            <div className="p-3 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-full">
              <FiShield className="w-8 h-8 text-white" />
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent mb-4"
          >
            Protect Our Community
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto text-lg sm:text-xl leading-relaxed"
          >
            Help maintain campus safety by reporting suspicious activities. All reports are anonymous and reviewed within 24 hours.
          </motion.p>
        </div>

        {/* Stats Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg mr-4">
                <FiAlertCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Reports</p>
                <h3 className="text-2xl font-bold text-gray-800">{stats.total}</h3>
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg mr-4">
                <FiCheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Resolved Cases</p>
                <h3 className="text-2xl font-bold text-gray-800">{stats.resolved}</h3>
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-lg mr-4">
                <FiAlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Cases</p>
                <h3 className="text-2xl font-bold text-gray-800">{stats.active}</h3>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 p-4 bg-red-50/90 backdrop-blur-sm rounded-xl flex items-center gap-3 border border-red-200"
          >
            <FiAlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <span className="text-red-700">{error}</span>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Report Form */}
          <motion.form 
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 lg:p-8 border border-gray-100 lg:sticky lg:top-8"
          >
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent flex items-center gap-2">
              <FiFileText className="w-6 h-6" />
              Report Incident
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <FiAlertCircle className="w-4 h-4" />
                  Scam Type *
                </label>
                <select
                  value={formData.scamType}
                  onChange={(e) => setFormData({ ...formData, scamType: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 transition-all"
                  required
                >
                  <option value="">Select scam type</option>
                  <option>Financial Fraud</option>
                  <option>Phishing Scam</option>
                  <option>Fake Marketplace</option>
                  <option>Identity Theft</option>
                  <option>Impersonation</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <FiFileText className="w-4 h-4" />
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-40 bg-white/50 transition-all"
                  placeholder="Provide detailed information (location, time, people involved, etc.)"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <FiMail className="w-4 h-4" />
                  Contact for Follow-up
                </label>
                <input
                  type="email"
                  value={formData.contactInfo}
                  onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="Optional secure email for updates"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -10px rgba(79, 70, 229, 0.5)" }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-3.5 px-6 rounded-xl font-semibold hover:from-indigo-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-indigo-200/50 flex items-center justify-center gap-2 relative overflow-hidden"
              >
                {loading && (
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-blue-600"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {loading ? (
                    <>
                      <FiLoader className="animate-spin w-5 h-5" />
                      Securing Report...
                    </>
                  ) : (
                    <>
                      <FiShield className="w-5 h-5" />
                      Submit Anonymously
                    </>
                  )}
                </span>
              </motion.button>
            </div>
          </motion.form>

          {/* Recent Reports */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:pl-8"
          >
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent flex items-center gap-2">
              <FiEye className="w-6 h-6" />
              Recent Alerts
            </h2>
            
            {loading ? (
              <div className="flex items-center justify-center gap-3 p-8 text-gray-500 bg-white/80 backdrop-blur-sm rounded-2xl">
                <FiLoader className="animate-spin w-6 h-6" />
                <span>Loading security updates...</span>
              </div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence>
                  {scamReports.length === 0 ? (
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 text-center border border-gray-100">
                      <FiCheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-800 mb-2">No active reports</h3>
                      <p className="text-gray-600">Campus security is currently up to date with all reports.</p>
                    </div>
                  ) : (
                    scamReports.map((report) => {
                      const formattedDate = formatDate(report.createdAt);
                      
                      return (
                        <motion.div
                          key={report.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md"
                        >
                          <div 
                            className="p-5 cursor-pointer hover:bg-gray-50/50 transition-colors"
                            onClick={() => setIsExpanded(isExpanded === report.id ? null : report.id)}
                          >
                            <div className="flex justify-between items-center gap-4">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 mb-2">
                                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    report.status === 'Active' ? 'bg-red-100 text-red-800' :
                                    report.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                                    'bg-yellow-100 text-yellow-800'
                                  }`}>
                                    {report.status}
                                  </span>
                                  <span className="text-sm text-gray-500">
                                    {formattedDate.dateOnly}
                                  </span>
                                </div>
                                <h3 className="font-semibold text-gray-900 truncate">{report.scamType}</h3>
                                <p className="text-sm text-gray-600 mt-1 line-clamp-1">{report.description}</p>
                              </div>
                              <motion.div
                                animate={{ rotate: isExpanded === report.id ? 180 : 0 }}
                                className="flex-shrink-0"
                              >
                                <FiChevronDown className="w-5 h-5 text-gray-500" />
                              </motion.div>
                            </div>
                          </div>

                          <AnimatePresence>
                            {isExpanded === report.id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="px-5 pb-5 border-t border-gray-100">
                                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                                    <div className="flex items-center gap-2 text-sm p-3 bg-gray-50 rounded-lg">
                                      <FiAlertCircle className="w-4 h-4 text-indigo-600" />
                                      <span className="font-medium">Type:</span>
                                      <span>{report.scamType}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm p-3 bg-gray-50 rounded-lg">
                                      <FiClock className="w-4 h-4 text-indigo-600" />
                                      <span className="font-medium">Reported:</span>
                                      <span>{formattedDate.dateTime}</span>
                                    </div>
                                  </div>
                                  <div className="mt-4">
                                    <h4 className="font-medium text-gray-800 mb-2">Description</h4>
                                    <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-4 rounded-lg">
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

        {/* Success Message */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed bottom-6 right-6 bg-white/90 backdrop-blur-sm shadow-xl rounded-xl p-4 flex items-center gap-3 border border-gray-100 max-w-sm"
            >
              <div className="p-2 bg-green-100 rounded-full">
                <FiCheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Report Submitted Successfully</p>
                <p className="text-sm text-gray-600">Our security team will review it shortly</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ReportScamPage;