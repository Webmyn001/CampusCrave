import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiChevronDown, FiUser } from 'react-icons/fi';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);
    
    return () => window.removeEventListener('storage', checkLoginStatus);
  }, []);

  // Function to close mobile menu
  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="text-2xl font-bold text-indigo-600 hover:text-indigo-700"
              onClick={closeMobileMenu} // Added close on click
            >
              CampusCrave
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {/* More Dropdown */}
            <div className="relative">
              <button 
                onMouseEnter={() => setIsMoreOpen(true)}
                onMouseLeave={() => setIsMoreOpen(false)}
                className="flex items-center px-3 py-2 text-gray-700 hover:text-indigo-600 transition-colors"
              >
                More <FiChevronDown className="ml-1" />
              </button>

              {isMoreOpen && (
                <div 
                  className="absolute top-full left-0 w-48 bg-white shadow-lg py-2 rounded-lg"
                  onMouseEnter={() => setIsMoreOpen(true)}
                  onMouseLeave={() => setIsMoreOpen(false)}
                >
                  <Link 
                    to="/about" 
                    className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    About
                  </Link>
                  <Link 
                    to="/contact" 
                    className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    Contact
                  </Link>
                  <Link 
                    to="/legal" 
                    className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    Legal
                  </Link>
                  <Link 
                    to="/report" 
                    className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    Report
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Auth Section */}
          <div className="hidden lg:flex items-center space-x-4">
            {isLoggedIn ? (
              <Link 
                to="/profile" 
                className="flex items-center px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              >
                <FiUser className="mr-2" />
                My Profile
              </Link>
            ) : (
              <div className="flex space-x-3">
                <Link 
                  to="/login" 
                  className="px-4 py-2 text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4">
            <div className="px-2 pt-2 space-y-1">
              {/* Static Links */}
              <Link 
                to="/about" 
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                onClick={closeMobileMenu} // Added close on click
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                onClick={closeMobileMenu} // Added close on click
              >
                Contact
              </Link>
              <Link 
                to="/legal" 
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                onClick={closeMobileMenu} // Added close on click
              >
                Legal
              </Link>
              <Link 
                to="/report" 
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                onClick={closeMobileMenu} // Added close on click
              >
                Report
              </Link>

              {/* Auth Mobile */}
              {isLoggedIn ? (
                <Link 
                  to="/profile" 
                  className="flex items-center px-3 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"
                  onClick={closeMobileMenu} // Added close on click
                >
                  <FiUser className="mr-2" />
                  My Profile
                </Link>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                    onClick={closeMobileMenu} // Added close on click
                  >
                    Login
                  </Link>
                  <Link 
                    to="/signup" 
                    className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                    onClick={closeMobileMenu} // Added close on click
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;