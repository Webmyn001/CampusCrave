import { Link } from 'react-router-dom';
import { FiUsers, FiTarget, FiAward, FiBook, FiUser, FiShoppingBag, FiTrendingUp } from 'react-icons/fi';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-20 left-10 w-48 h-48 bg-indigo-100 rounded-full opacity-10" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-blue-100 rounded-full opacity-10" />

      <div className="max-w-6xl mx-auto px-4 py-16 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent mb-4">
            About CampusCrave
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Empowering student entrepreneurs with seamless campus trading
          </p>
        </div>

        {/* Founder Spotlight */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl shadow-lg ring-1 ring-amber-100 p-8 mb-16">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 order-2 lg:order-1">
              <div className="flex items-center gap-4 mb-4">
                <FiUser className="text-3xl text-amber-600" />
                <h3 className="text-2xl font-bold text-gray-800">Meet the Founder</h3>
              </div>
              <div className="mb-4">
                <h4 className="text-xl font-semibold text-amber-700">Bello Muhyideen</h4>
                <p className="text-gray-600">
                  Part 4 Student, Faculty of Agriculture<br />
                  Department of Soil Science and Land Resources Management<br />
                  Obafemi Awolowo University
                </p>
              </div>
              <p className="text-gray-700 italic border-l-4 border-amber-400 pl-4 py-2">
                "CampusCrave is a dedicated marketplace built for students to buy, sell, and connect with ease — offering a safe, fast, and hassle-free way to trade within campus."
              </p>
            </div>
            <div className="flex-1 order-1 lg:order-2 w-full">
              <div className="bg-gradient-to-br from-amber-100 to-orange-100 h-64 lg:h-80 rounded-xl flex items-center justify-center">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
              </div>
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
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
            <div 
              key={index}
              className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg ring-1 ring-black/5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <item.icon className="text-4xl bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent mb-6" />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg ring-1 ring-black/5 p-8 mb-16 hover:shadow-xl transition-shadow duration-300">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 order-2 lg:order-1">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent mb-4">
                Our Entrepreneurial Journey
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                CampusCrave was founded by Bello Muhyideen, a student entrepreneur at Obafemi Awolowo 
                University. Recognizing the untapped potential of student businesses on campus, Bello 
                created a platform to empower fellow student entrepreneurs.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Today's students are increasingly entrepreneurial - selling everything from textbooks 
                to tech services, handmade crafts to digital solutions. But without a dedicated campus 
                marketplace, these micro-businesses struggled to reach customers.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                CampusCrave solves this by providing a centralized platform where student entrepreneurs 
                can showcase their offerings, connect with buyers, and grow their businesses without 
                leaving campus. Our verification system ensures trustworthy transactions, while our 
                user-friendly interface makes buying and selling effortless.
              </p>
              <Link 
                to="/signup" 
                className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 group transition-all"
              >
                Join our entrepreneurial community
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
            <div className="flex-1 order-1 lg:order-2 w-full">
              <div className="bg-gradient-to-br from-indigo-100 to-blue-100 h-64 lg:h-80 rounded-xl flex items-center justify-center">
                <div className="text-center p-4">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4" />
                  <p className="font-semibold text-indigo-700">Obafemi Awolowo University</p>
                  <p className="text-gray-600">Home of student entrepreneurship</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Campus Impact */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center mb-16">
          {[
            { icon: FiTrendingUp, number: "Boosts", label: "Student Businesses" },
            { icon: FiShoppingBag, number: "Simplifies", label: "Campus Transactions" },
            { icon: FiAward, number: "Ensures", label: "Trusted Exchanges" },
            { icon: FiUsers, number: "Connects", label: "Campus Community" }
          ].map((stat, index) => (
            <div 
              key={index}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg ring-1 ring-black/5 hover:shadow-xl transition-all duration-300"
            >
              <stat.icon className="text-3xl mx-auto mb-3 text-indigo-600" />
              <div className="text-2xl font-bold text-indigo-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Founder's Vision */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-100 rounded-2xl p-8 text-center">
          <FiBook className="text-4xl text-indigo-600 mx-auto mb-4" />
          <blockquote className="text-xl italic text-gray-700 max-w-3xl mx-auto mb-4">
            "Empowering students to trade smarter — fast, safe, and right on campus."
          </blockquote>
          <p className="font-semibold text-indigo-700">- Bello Muhyideen, Founder</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;