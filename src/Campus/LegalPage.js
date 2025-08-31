import { FiShield, FiFileText, FiAlertCircle } from 'react-icons/fi';

const LegalPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <FiShield className="text-4xl text-indigo-600" />
            <FiFileText className="text-4xl text-indigo-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-600 mb-4">
            Privacy & Terms
          </h1>
          <p className="text-xl text-gray-600">
            Building trust and protecting our community against scams
          </p>
        </div>

        {/* Table of Contents */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
          <h2 className="text-2xl font-semibold mb-4">Quick Navigation</h2>
          <ul className="space-y-2 text-indigo-600">
            <li><a href="#privacy" className="hover:text-indigo-700">Privacy Policy</a></li>
            <li><a href="#terms" className="hover:text-indigo-700">Terms of Service</a></li>
            <li><a href="#security" className="hover:text-indigo-700">Security & Verification</a></li>
            <li><a href="#disclaimer" className="hover:text-indigo-700">Disclaimer & Safety</a></li>
          </ul>
        </div>

        {/* Privacy Policy */}
        <section id="privacy" className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <FiShield className="text-indigo-600" />
            Privacy Policy
          </h2>
          <div className="space-y-4 text-gray-600">
            <p>Last Updated: August 31, 2025</p>
            <p>
              We collect only the information necessary to facilitate safe transactions 
              and protect the community from fraud. Your privacy is important to us, 
              and we never sell your data.
            </p>
            <h3 className="text-xl font-semibold mt-4">What We Collect</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Basic account information (Email, Phone number, Hostel Address.)</li>
              <li>Transaction history for safety monitoring</li>
              <li>Device and login information for fraud prevention</li>
            </ul>
          </div>
        </section>

        {/* Terms of Service */}
        <section id="terms" className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <FiFileText className="text-indigo-600" />
            Terms of Service
          </h2>
          <div className="space-y-4 text-gray-600">
            <h3 className="text-xl font-semibold">User Responsibilities</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate and truthful information when registering and listing items</li>
              <li>Avoid posting false, misleading, or fraudulent content</li>
              <li>Communicate respectfully and follow campus rules</li>
            </ul>
            <p className="mt-4">
              ⚠️ If false information is detected, your account may be flagged or suspended. 
              Verified and trustworthy users will receive a <strong>Verified Badge</strong>, 
              which increases buyer confidence and improves your chances of selling faster.
            </p>
          </div>
        </section>

        {/* Security & Verification */}
        <section id="security" className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <FiAlertCircle className="text-indigo-600" />
            Security & Verification
          </h2>
          <div className="space-y-4 text-gray-600">
            <p>
              The platform conducts regular security checks to safeguard user data.
User accounts may be verified periodically based on the accuracy of submitted information.
Upon successful verification, a Verified Badge will be issued, indicating the seller’s authenticity.
This measure is designed to increase buyer confidence and reduce the risk of fraudulent transactions.
            </p>
            <p>
              These measures ensure that buyers and sellers interact in a 
              safe, transparent, and scam-free environment.
            </p>
          </div>
        </section>

        {/* Disclaimer & Safety Tips */}
        <section id="disclaimer" className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <FiAlertCircle className="text-indigo-600" />
            Disclaimer & Safety
          </h2>
          <div className="space-y-4 text-gray-600">
            <p>
              While we take active steps to protect users from scams and fraudulent activity, 
              we cannot fully guarantee prevention. If a case of fraud occurs, 
              our team will do its best to help resolve the issue, but ultimate responsibility 
              lies with the users to take precautions.
            </p>
            <h3 className="font-semibold text-gray-900 mb-2">Safety Tips</h3>
            <ul className="text-gray-700 text-sm space-y-1">
              <li>• Always meet in public campus locations</li>
              <li>• Never send payments in advance without verification</li>
              <li>• Check item condition before purchasing</li>
              <li>• Report suspicious activity to <a href='/report'  className="text-indigo-600 hover:underline">Campus Crave Security</a></li>
            </ul>
            <p className="mt-4 text-sm text-gray-500">
              By using this platform, you agree to follow these rules and acknowledge that 
              the platform provides tools to reduce, but not completely eliminate, 
              the risk of scams.
            </p>
          </div>
        </section>

        <div className="text-center text-gray-600">
          Questions? Contact our <a href="/contact" className="text-indigo-600 hover:underline">legal team</a>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;
