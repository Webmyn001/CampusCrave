import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout Component
import Layout from './Campus/Layout';

// Pages
import HomePage from './Campus/Homepage';
import AboutPage from './Campus/Aboutus';
import ContactPage from './Campus/ContactPage';
import LegalPage from './Campus/LegalPage';
import Login from './Campus/Login';
import Signup from './Campus/SignUp';
import ForgotPasswordPage from './Campus/ForgetPwd';
import UserProfile from './Campus/Userprofile';
import CreateProfilePage from './Campus/CreateProfilepage';
import ProfileUpdateForm from './Campus/UpdateUser';
import BrowseListings from './Campus/Browselistings';
import ListingDetails from './Campus/ListingDetails';
import UrgentListings from './Campus/UrgentListing';
import PremiumListings from './Campus/PremiumListings';
import VipServicesListings from './Campus/VipListings';
import PublishNewMarketPage from './Campus/PublishPage';
import CreateListing from './Campus/CreateListing';
import CreatePro from './Campus/CreatePro';
import CreateVip from './Campus/CreateVip';
import ContactSeller from './Campus/ContactSeller';
import TransactionPage from './Campus/Transaction';
import RatingsReviews from './Campus/Review';
import AddReview from './Campus/AddReview';
import ReportScamPage from './Campus/Alertpage';
import NotFoundPage from './Campus/404';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          {/* Core Pages */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/legal" element={<LegalPage />} />
          
          {/* Authentication */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpwd" element={<ForgotPasswordPage />} />
          
          {/* User Profile */}
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/profilepage" element={<CreateProfilePage />} />
          <Route path="/update" element={<ProfileUpdateForm />} />
          
          {/* Listings */}
          <Route path="/listings" element={<BrowseListings />} />
          <Route path="/listing/:id" element={<ListingDetails />} />
          <Route path="/urgentlistings" element={<UrgentListings />} />
          <Route path="/premiumlistings" element={<PremiumListings />} />
          <Route path="/viplistings" element={<VipServicesListings />} />
          
          {/* Publishing */}
          <Route path="/publish" element={<PublishNewMarketPage />} />
          <Route path="/publish/starter" element={<CreateListing />} />
          <Route path="/publish/pro" element={<CreatePro />} />
          <Route path="/publish/vip" element={<CreateVip />} />
          
          {/* Transactions */}
          <Route path="/contactseller" element={<ContactSeller />} />
          <Route path="/transactions/:itemId" element={<TransactionPage />} />
          
          {/* Reviews */}
          <Route path="/review" element={<RatingsReviews />} />
          <Route path="/reviewpage" element={<AddReview />} />
          
          {/* Support */}
          <Route path="/report" element={<ReportScamPage />} />
          
          {/* 404 Catch-all */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;