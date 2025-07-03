import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import HomePage from './Campus/Homepage';
import BrowseListings from './Campus/Browselistings';
import ListingDetails from './Campus/ListingDetails';
import CreateListing from './Campus/CreateListing';
import UserProfile from './Campus/Userprofile';
import RatingsReviews from './Campus/Review';
import TransactionPage from './Campus/Transaction';
import Navbar from './Campus/Navbar';
import Login from './Campus/Login';
import Signup from './Campus/SignUp';
import ForgotPasswordPage from './Campus/ForgetPwd';
import CreateProfilePage from './Campus/CreateProfilepage';
import NotFoundPage from './Campus/404';
import AddReview from './Campus/AddReview.js';
import LegalPage from './Campus/LegalPage';
import AboutPage from './Campus/Aboutus.js';
import ContactPage from './Campus/ContactPage.js';
import PublishNewMarketPage from './Campus/PublishPage.js';
import CreatePro from './Campus/CreatePro.js';
import CreateVip from './Campus/CreateVip.js';
import ContactSeller from './Campus/ContactSeller.js';
import UrgentListings from './Campus/UrgentListing.js';
import PremiumListings from './Campus/PremiumListings.js';
import VipServicesListings from './Campus/VipListings.js';
import ReportScamPage from './Campus/Alertpage.js';
import Footer from './Campus/Footer.js';
import ProfileUpdateForm from './Campus/UpdateUser.js';


function App() {
  return (
    <Router>
            <Navbar/>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* <Route path="/listings" element={<BrowseListings />} /> */}
            <Route path="/listing/:id" element={<ListingDetails />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/review" element={<RatingsReviews />} />



            <Route path="/publish/starter" element={<CreateListing />}  />
            <Route path="/publish/pro" element={<CreatePro />}  />
            <Route path="/publish/vip" element={<CreateVip />}  />


            <Route path="/contactseller" element={<ContactSeller />}  />


            <Route path="/urgentlistings" element={<UrgentListings />}  />
            <Route path="/premiumlistings" element={<PremiumListings />}  />
            <Route path="/viplistings" element={<VipServicesListings />}  />



            <Route path="/report" element={<ReportScamPage />} />

            <Route path="/reviewpage" element={<AddReview />} />


            <Route path="/update" element={<ProfileUpdateForm />} />




            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgotpwd" element={<ForgotPasswordPage />} />
            <Route path="/profilepage" element={<CreateProfilePage />} />
            <Route path="/publish" element={<PublishNewMarketPage />} />


            <Route path="/legal" element={<LegalPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />


            <Route path="*" element={<NotFoundPage />} />
            <Route path="/transactions/:itemId" element={<TransactionPage />} />






           
         

          </Routes>
          <Footer/>

    </Router>
  );
}

export default App;