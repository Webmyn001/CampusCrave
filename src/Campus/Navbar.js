import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiChevronDown, FiUser, FiLogOut } from 'react-icons/fi';
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Helper: Check if token is expired
  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.exp * 1000 < Date.now();
    } catch (e) {
      return true;
    }
  };

  // ✅ Verify login status
  const checkLoginStatus = () => {
    const token = localStorage.getItem('token');
    if (token && !isTokenExpired(token)) {
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem('token');
      setIsLoggedIn(false);
    }
  };

  // ✅ Watch login status
  useEffect(() => {
    checkLoginStatus();
    const interval = setInterval(checkLoginStatus, 5000);
    window.addEventListener('storage', checkLoginStatus);
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  // ✅ Logout handler (improved)
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('Login');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    setIsMenuOpen(false);

    // Prevents redirect loop if already on login
    if (window.location.pathname !== '/login') {
      navigate('/login', { replace: true });
    }

    // Optional: Clear other cached data
    sessionStorage.clear();
  };

  const closeMobileMenu = () => setIsMenuOpen(false);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center text-2xl font-bold hover:opacity-90 transition"
          >
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Campus
            </span>
            <span className="text-gray-800 font-light">Crave</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
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
                  <Link to="/about" className="block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-600">About</Link>
                  <Link to="/contact" className="block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-600">Contact</Link>
                  <Link to="/legal" className="block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-600">Legal</Link>
                  <Link to="/report" className="block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-600">Report</Link>
                  <Link to="/website-guide" className="block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-600">FAQs</Link>
                </div>
              )}
            </div>
          </div>

          {/* Auth Section */}
          <div className="hidden lg:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                >
                  <FiUser className="mr-2" />
                  My Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 text-gray-700 hover:text-red-600 rounded-lg transition-colors"
                >
                  <FiLogOut className="mr-2" />
                  Logout
                </button>
              </>
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
              <Link to="/about" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg" onClick={closeMobileMenu}>About</Link>
              <Link to="/contact" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg" onClick={closeMobileMenu}>Contact</Link>
              <Link to="/legal" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg" onClick={closeMobileMenu}>Legal</Link>
              <Link to="/report" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg" onClick={closeMobileMenu}>Report</Link>
              <Link to="/website-guide" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg" onClick={closeMobileMenu}>FAQs</Link>

              {isLoggedIn ? (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center px-3 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"
                    onClick={closeMobileMenu}
                  >
                    <FiUser className="mr-2" />
                    My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    <FiLogOut className="mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg" onClick={closeMobileMenu}>Login</Link>
                  <Link to="/signup" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg" onClick={closeMobileMenu}>Sign Up</Link>
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
