import React from 'react'
import WebsiteGuide from './WebsiteGuide';

function Faqs() {
     
    const faqs = [
    {
      question: "What is Campus Crave?",
      answer: "Campus Crave is an exclusive online marketplace for Obafemi Awolowo University students to buy and sell products and services easily within the campus."
    },
    {
      question: "Who can use Campus Crave?",
      answer: "Only students of Obafemi Awolowo University can use the platform. Registration does not necessarily require a school email, but users must undergo a verification process to confirm their identity and profile details."
    },
    {
      question: "How does Campus Crave keep transactions safe?",
      answer: "All users go through a verification process where their provided details are checked. If the information is confirmed as accurate, the user is awarded a verified badge. If false information is detected, the account may be flagged. In addition, the platform has a built-in reporting system for scams or fake products."
    },
    {
      question: "Can I sell services as well as products?",
      answer: "Yes. Campus Crave supports both product sales and service offerings, making it a one-stop shop for all campus transactions."
    },
    {
      question: "How do I report a scam or suspicious activity?",
      answer: "Simply use the 'Report' option available on product or user profiles, or contact the Campus Crave support team directly. Your report will be reviewed quickly."
    },
    {
      question: "Why was Campus Crave created?",
      answer: "Campus Crave was built to solve the challenge of students struggling to buy or sell items on campus quickly, safely, and without gender or hostel restrictions."
    },
    {
      question: "Can non-students use Campus Crave?",
      answer: "No. To keep the marketplace safe and trustworthy, only verified OAU students can access the platform. Every user must pass the verification process before gaining full access."
    },
    {
      question: "What should I do if I have a problem with a transaction?",
      answer: "Contact the Campus Crave support team through the help center or submit a report directly from the platform for assistance."
    },
    {
      question: "Does Campus Crave guarantee 100% scam prevention?",
      answer: "We work hard to keep the platform safe with verification and reporting tools, but no system can stop every scam. If something does happen, our team will step in to help resolve it. Still, we encourage users to take precautions and stay alert when making transactions."
    }
  ];

  return (
    <div>
      
      <WebsiteGuide/>
       {/* Enhanced FAQ Section with All Questions */}
    <section className="py-12 px-4">
  <div className="max-w-4xl mx-auto">
    <div className="text-center mb-5">
      <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-indigo-900 bg-clip-text text-transparent mb-1">
        Frequently Asked Questions
      </h2>
      <p className="text-md text-gray-600">Everything you need to know about Campus Crave</p>
    </div>

    <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border border-white/20">
      {faqs.map((faq, index) => (
        <div key={index} className="border-b last:border-b-0">
          <button
            type="button"
            className="w-full flex justify-between items-center py-3 text-left text-gray-900 font-medium hover:text-indigo-600 focus:outline-none"
            onClick={() => {
              const el = document.getElementById(`faq-answer-${index}`);
              if (el) el.classList.toggle("hidden");
            }}
          >
            <span>{faq.question}</span>
            <svg
              className="w-4 h-4 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div id={`faq-answer-${index}`} className="hidden text-gray-700 text-sm pl-2 pb-3">
            {faq.answer}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


    </div>
  )
}

export default Faqs
