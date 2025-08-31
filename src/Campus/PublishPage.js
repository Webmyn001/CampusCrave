import React from 'react';
import { FiCheck, FiZap, FiStar, FiClock, FiRepeat } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const tiers = [
  {
    title: 'Starter Tier',
    price: 'Free Forever',
    features: [
      'Basic seller profile setup',
      'Unlimited listings',
      'Listings expire after 24 hours',
      'Standard visibility',
    ],
    bestFor: 'Casual sellers',
    link: "/publish/starter"
  },
  {
    title: 'Standard Tier',
    price: '₦1,500/month',
    features: [
      'All Starter features',
      'Premium PRO badge',
      'Urgent sale tagging',
      'Listings expire after 48 hours',
      'Priority visibility',
    ],
    bestFor: 'Frequent sellers',
    popular: true,
    link : "/publish/pro"
  },
  {
    title: 'Premium Tier',
    price: '₦2,500/month',
    features: [
      'All basic features',
      'Exclusive VIP badge',
      'Recurring listings',
      'Listings expire after 72 hours',
      'Featured placement',
      'Advanced analytics',
    ],
    bestFor: 'Power sellers',
    link : "/publish/vip"
  },
];

export default function PublishNewMarketPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Selling Plan
          </h1>
          <p className="text-xl text-gray-600">
            Maximize your sales potential with our flexible listing options
          </p>
        </div>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
          {tiers.map((tier) => (
            
                <Link to={tier.link}>
            <div
              key={tier.title}
              className={`relative bg-white rounded-2xl shadow-lg transition-all hover:transform hover:-translate-y-2 ${
                tier.popular ? 'ring-2 ring-indigo-600' : ''
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 right-0 bg-indigo-600 text-white px-4 py-1 rounded-tr-2xl rounded-bl-lg text-sm font-semibold">
                  Most Popular
                </div>
              )}
              <div className="p-8 flex flex-col h-full">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {tier.title}
                  </h2>
                  <p className="text-3xl font-bold text-indigo-600 mb-6">
                    {tier.price}
                  </p>
                  <p className="text-sm text-gray-600 mb-6 italic">
                    Perfect for: {tier.bestFor}
                  </p>
                  <ul className="space-y-4">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <FiCheck className="w-5 h-5 text-indigo-600 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button className="mt-8 w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors flex items-center justify-center">
                  Get Started
                  <FiZap className="ml-2 w-5 h-5" />
                </button>
              </div>
            </div>
            </Link>
        
          ))}
        </div>

        <div className="mt-16 text-center text-gray-600">
          <p className="mb-4">
            <FiRepeat className="inline mr-2 text-indigo-600" />
            30-day money-back guarantee
          </p>
          <p>
            <FiStar className="inline mr-2 text-indigo-600" />
            Secure payment processing
          </p>
        </div>
      </div>
    </div>
  );
}