import { Link } from 'react-router-dom';
import { FiUsers, FiTarget, FiAward, FiBook, FiUser, FiShoppingBag, FiTrendingUp, FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

const AboutPage = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const staggerChildren = {
    visible: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
      
      {/* Floating icons */}
      <motion.div 
        className="absolute top-1/4 left-1/4 text-4xl text-indigo-200"
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <FiShoppingBag />
      </motion.div>
      
      <motion.div 
        className="absolute bottom-1/3 right-1/4 text-4xl text-blue-200"
        animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <FiTrendingUp />
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 py-16 relative z-10">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent mb-4"
            variants={fadeIn}
          >
            About CampusCrave
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            variants={fadeIn}
          >
            Empowering student entrepreneurs with seamless campus trading
          </motion.p>
        </motion.div>

        {/* Founder Spotlight */}
        <motion.div 
          className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl shadow-xl border border-amber-100 p-8 mb-16"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 order-2 lg:order-1">
              <motion.div 
                className="flex items-center gap-4 mb-4"
                variants={fadeIn}
              >
                <div className="p-3 bg-amber-100 rounded-full">
                  <FiUser className="text-2xl text-amber-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Meet the Founder</h3>
              </motion.div>
              <motion.div 
                className="mb-4"
                variants={fadeIn}
              >
                <h4 className="text-xl font-semibold text-amber-700">Bello Muhyideen</h4>
                <p className="text-gray-600">
                  Part 5 Student, Faculty of Agriculture<br />
                  Department of Soil Science and Land Resources Management<br />
                  Obafemi Awolowo University, Ile-Ife, Osun State, Nigeria.
                </p>
              </motion.div>
              <motion.p 
                className="text-gray-700 italic border-l-4 border-amber-400 pl-4 py-2"
                variants={fadeIn}
              >
                "CampusCrave is a dedicated marketplace built for students to buy, sell, and connect with ease — offering a safe, fast, and hassle-free way to trade within campus."
              </motion.p>
            </div>
            <motion.div 
              className="flex-1 order-1 lg:order-2 w-full"
              variants={fadeIn}
            >
              <div className="bg-gradient-to-br from-amber-100 to-orange-100 h-64 lg:h-80 rounded-2xl flex items-center justify-center border border-amber-200">
                <div className="bg-gray-200 border-2 border-dashed border-amber-300 rounded-xl w-20 h-20" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Values Grid */}
        <motion.div 
          className="grid md:grid-cols-3 gap-6 mb-16"
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
        >
          {[
            { 
              icon: FiShoppingBag, 
              title: "Entrepreneur Focused", 
              text: "Designed specifically for student entrepreneurs to grow their businesses" 
            },
            { 
              icon: FiTarget, 
              title: "Our Mission", 
              text: "Create a thriving marketplace where students can trade effortlessly" 
            },
            { 
              icon: FiAward, 
              title: "Trusted Transactions", 
              text: "Secure platform with robust verification and reporting systems" 
            }
          ].map((item, index) => (
            <motion.div 
              key={index}
              className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
              variants={fadeIn}
              whileHover={{ scale: 1.02 }}
            >
              <div className="p-3 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-full inline-block mb-6">
                <item.icon className="text-2xl text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Story Section */}
        <motion.div 
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-8 mb-16 hover:shadow-xl transition-all duration-500"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 order-2 lg:order-1">
              <motion.h2 
                className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent mb-4"
                variants={fadeIn}
              >
                Our Entrepreneurial Journey
              </motion.h2>
              <motion.p 
                className="text-gray-600 mb-4 leading-relaxed"
                variants={fadeIn}
              >
                CampusCrave was founded by Bello Muhyideen, a student entrepreneur at Obafemi Awolowo 
                University. Recognizing the untapped potential of student businesses on campus, Bello 
                created a platform to empower fellow student entrepreneurs.
              </motion.p>
              <motion.p 
                className="text-gray-600 mb-4 leading-relaxed"
                variants={fadeIn}
              >
                Today's students are increasingly entrepreneurial - selling everything from textbooks 
                to tech services, handmade crafts to digital solutions. But without a dedicated campus 
                marketplace, these micro-businesses struggled to reach customers.
              </motion.p>
              <motion.p 
                className="text-gray-600 mb-4 leading-relaxed"
                variants={fadeIn}
              >
                CampusCrave solves this by providing a centralized platform where student entrepreneurs 
                can showcase their offerings, connect with buyers, and grow their businesses without 
                leaving campus. Our verification system ensures trustworthy transactions, while our 
                user-friendly interface makes buying and selling effortless.
              </motion.p>
              <motion.div variants={fadeIn}>
                <Link 
                  to="/signup" 
                  className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 group transition-all duration-300"
                >
                  Join our entrepreneurial community
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
            <motion.div 
              className="flex-1 order-1 lg:order-2 w-full"
              variants={fadeIn}
            >
              <div className="bg-gradient-to-br from-indigo-100 to-blue-100 h-64 lg:h-80 rounded-2xl flex items-center justify-center border border-indigo-200">
                <div className="text-center p-4">
                  <div className="bg-gray-200 border-2 border-dashed border-indigo-300 rounded-xl w-16 h-16 mx-auto mb-4" />
                  <p className="font-semibold text-indigo-700">Obafemi Awolowo University</p>
                  <p className="text-gray-600">Home of student entrepreneurship</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Campus Impact */}
        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
        >
          {[
            { icon: FiTrendingUp, number: "Boosts", label: "Student Businesses" },
            { icon: FiShoppingBag, number: "Simplifies", label: "Campus Transactions" },
            { icon: FiAward, number: "Ensures", label: "Trusted Exchanges" },
            { icon: FiUsers, number: "Connects", label: "Campus Community" }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500"
              variants={fadeIn}
              whileHover={{ scale: 1.05 }}
            >
              <div className="p-2 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-full inline-block mb-3">
                <stat.icon className="text-xl text-indigo-600 mx-auto" />
              </div>
              <div className="text-xl font-bold text-indigo-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Founder's Vision */}
        <motion.div 
          className="bg-gradient-to-r from-indigo-50 to-blue-100 rounded-2xl p-8 text-center border border-indigo-100"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="p-3 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-full inline-block mb-4">
            <FiBook className="text-2xl text-indigo-600" />
          </div>
          <blockquote className="text-xl italic text-gray-700 max-w-3xl mx-auto mb-4">
            "Empowering students to trade smarter — fast, safe, and right on campus."
          </blockquote>
          <p className="font-semibold text-indigo-700">- Bello Muhyideen, Founder</p>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;