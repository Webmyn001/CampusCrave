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
// import ForgotPasswordPage from './Campus/ForgetPwd';
import UserProfile from './Campus/Userprofile';
import CreateProfilePage from './Campus/CreateProfilepage';
// import ProfileUpdateForm from './Campus/UpdateUser';
import ListingDetails from './Campus/ListingDetails';
import UrgentListings from './Campus/UrgentListing';
import PremiumListings from './Campus/PremiumListings';
import VipServicesListings from './Campus/VipListings';
import PublishNewMarketPage from './Campus/PublishPage';
import CreateListing from './Campus/CreateListing';
import CreatePro from './Campus/CreatePro';
import CreateVip from './Campus/CreateVip';
import ContactSeller from './Campus/ContactSeller';
import AddReview from './Campus/AddReview';
import ReportScamPage from './Campus/Alertpage';
import NotFoundPage from './Campus/404';
import Marketplace from './Campus/Marketplace';
import BusinessDetails from './Campus/BusinessDetails';
import VerifyNotice from './Campus/VerifyNotice';
import VerifyEmail from './Campus/VerifyEmail';
import ResetPassword from './Campus/ResetPassword';
import ForgotPassword from './Campus/ForgotPassword';

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
          <Route path="/marketplace" element={<Marketplace />} />


          
          {/* Authentication */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-notice" element={<VerifyNotice />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />


          
          {/* User Profile */}
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/profilepage" element={<CreateProfilePage />} />
           {/* <Route path="/update" element={<ProfileUpdateForm />} />                    */}
          
          {/* Listings */}
          <Route path="/listing/:id" element={<ListingDetails />} />
          <Route path="/urgentlistings" element={<UrgentListings />} />
          <Route path="/premiumlistings" element={<PremiumListings />} />
          <Route path="/viplistings" element={<VipServicesListings />} />
          
          <Route path="/business/:id" element={<BusinessDetails />} />
          {/* Publishing */}
          <Route path="/publish" element={<PublishNewMarketPage />} />
          <Route path="/publish/starter" element={<CreateListing />} />
          <Route path="/publish/pro" element={<CreatePro />} />
          <Route path="/publish/vip" element={<CreateVip />} />
          
          {/* Transactions */}
          <Route path="/contactseller" element={<ContactSeller />} />
          
          {/* Reviews */}
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