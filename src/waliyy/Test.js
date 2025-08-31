import React, { useState, useEffect, useRef, useCallback } from "react";
import { toast } from "react-toastify";
import SidebarComponent from "../components/sidebar/Sidebar";
import { usePersistedState } from "../utils.js";
import MobileNav from "../components/sidebar/MobileBottomNav.js";
import ProfileCard from "../components/ProfileCard.js";
import { useAuthContext } from "../context/AuthContext.js";
import { getAllUsers } from "../services";
import Loader from "../components/Loader.js";
import Navigation from "../components/sidebar/Navigation.js";

// Import React Icons
import { FaSearch, FaTimes, FaFrown, FaArrowUp } from "react-icons/fa";

const Test = () => {
  const ITEMS_PER_PAGE = 40;
  const MAX_VISIBLE_PAGES = 4;

  const [isOpen, setIsOpen] = usePersistedState("isOpen", false);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [allProfiles, setAllProfiles] = useState([]); // Store all profiles for search
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(
    () => parseInt(sessionStorage.getItem("explorePage")) || 1
  );
  const [totalPages, setTotalPages] = useState(1);

  const hasRestoredScroll = useRef(false);
  const { token } = useAuthContext();

  // Fetch all users for searching
  const fetchAllUsers = useCallback(async () => {
    setSearchLoading(true);
    try {
      const res = await getAllUsers(token, 1, totalCount || 1000); // Use a large limit to get all users
      const data = res?.data?.children || [];
      setAllProfiles(data);
      console.log(data)
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load users for search");
    } finally {
      setSearchLoading(false);
    }
  }, [token, totalCount]);

  // Fetch users for pagination
  const fetchUsers = useCallback(
    async (page) => {
      setLoading(true);
      try {
        const res = await getAllUsers(token, page, ITEMS_PER_PAGE);
        setTotalCount(res?.data?.totalCount);
        const data = res?.data?.children || [];
        
        // Calculate total pages
        const calculatedTotalPages = Math.ceil(res?.data?.totalCount / ITEMS_PER_PAGE);
        setTotalPages(calculatedTotalPages);
        console.log(data)
        setProfiles(data);
        setFilteredProfiles(data);
        
        // Save current page to session storage
        sessionStorage.setItem("explorePage", page);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to load users");
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  useEffect(() => {
    fetchUsers(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch all users when totalCount is available
  useEffect(() => {
    if (totalCount > 0) {
      fetchAllUsers();
    }
  }, [totalCount, fetchAllUsers]);

  // Filter profiles based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      // If no search term, show paginated results
      setFilteredProfiles(profiles);
    } else {
      // If search term exists, filter through all profiles
      const filtered = allProfiles.filter(profile => 
        profile.displayId && profile.displayId.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProfiles(filtered);
    }
  }, [searchTerm, profiles, allProfiles]);

  // Scroll restore after profiles are rendered
  useEffect(() => {
    const savedScroll = parseInt(sessionStorage.getItem("scrollPos"), 10);
    if (
      !isNaN(savedScroll) &&
      profiles.length > 0 &&
      !hasRestoredScroll.current
    ) {
      hasRestoredScroll.current = true;
      setTimeout(() => {
        window.scrollTo({ top: savedScroll, behavior: "auto" });
      }, 0);
    }
  }, [profiles]);

  const handlePageChange = async (newPage) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
    
    // Save scroll position before changing page
    sessionStorage.setItem("scrollPos", String(window.scrollY));
    
    setCurrentPage(newPage);
    await fetchUsers(newPage);
    
    // Scroll to top after page change for better UX
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleProfileClick = () => {
    sessionStorage.setItem("scrollPos", String(window.scrollY));
    sessionStorage.setItem("page", currentPage);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const half = Math.floor(MAX_VISIBLE_PAGES / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + MAX_VISIBLE_PAGES - 1);
    
    // Adjust if we're near the end
    if (end - start + 1 < MAX_VISIBLE_PAGES) {
      start = Math.max(1, end - MAX_VISIBLE_PAGES + 1);
    }
    
    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">User List</h2>
      <div className="overflow-x-auto shadow-lg rounded-2xl">
        <table className="w-full border-collapse bg-white rounded-2xl overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 text-left">
            <tr>
              <th className="px-6 py-3 text-sm font-semibold">S/N</th>
              <th className="px-6 py-3 text-sm font-semibold">Email</th>
              <th className="px-6 py-3 text-sm font-semibold">First Name</th>
              <th className="px-6 py-3 text-sm font-semibold">Last Name</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {allProfiles.map((user, index) => (
              <tr
                key={index}
                className="border-t hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-3 text-sm">{index + 1}</td>
                <td className="px-6 py-3 text-sm">{user.email}</td>
                <td className="px-6 py-3 text-sm">{user.firstName}</td>
                <td className="px-6 py-3 text-sm">{user.lastName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Test;