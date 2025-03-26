'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import PaymentHistory from './PaymentHistory';
import UserChat from './UserChat';
import Navigation from '../Navigation';
import { FaCopy, FaTelegramPlane, FaUsers } from 'react-icons/fa';

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('overview');
  const [referralLink, setReferralLink] = useState('');
  const [downlineCount, setDownlineCount] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setReferralLink(`http://localhost:3000/signup?ref=${session.user.phoneNumber}`);
      fetch(`/api/downlines?ref=${session.user.phoneNumber}`)
        .then(res => res.json())
        .then(data => setDownlineCount(data.count || 0));
    }
  }, [session]);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 px-4">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center sm:text-left">User Dashboard</h1>

          <div className="bg-white shadow rounded-lg">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex flex-wrap justify-center sm:justify-start">
                <button onClick={() => setActiveTab('overview')} className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}>
                  Overview
                </button>
                <button onClick={() => setActiveTab('adminchat')} className={`tab-button ${activeTab === 'adminchat' ? 'active' : ''}`}>
                  Admin Chat
                </button>
                <button onClick={() => setActiveTab('payment')} className={`tab-button ${activeTab === 'payment' ? 'active' : ''}`}>
                  Payment History
                </button>
              </nav>
            </div>
            
            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-4 text-center sm:text-left">Welcome, {session?.user?.firstName}!</h2>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                      <p className="font-semibold">Your Invitation Link:</p>
                      <div className="flex flex-col sm:flex-row items-center justify-between mt-2 border p-2 rounded-md">
                        <span className="text-sm text-gray-700 truncate w-full px-2 text-center sm:text-left">{referralLink}</span>
                        <button
                          onClick={handleCopy}
                          className={`mt-2 sm:mt-0 sm:ml-2 p-2 rounded-md transition-all duration-300 flex items-center ${copied ? 'bg-green-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                        >
                          <FaCopy size={18} className="mr-1" /> {copied ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row items-center justify-between">
                      <div className="flex items-center">
                        <FaUsers size={28} className="text-blue-600 mr-3" />
                        <div>
                          <p className="font-semibold">Active Downlines:</p>
                          <p className="text-lg font-bold text-blue-600 text-center sm:text-left">{downlineCount}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md text-center">
                      <p className="font-semibold">Telegram Support:</p>
                      <a href="https://t.me/Awokemu19" target="_blank" className="text-blue-500 hover:underline flex items-center justify-center">
                        <FaTelegramPlane className="mr-2" size={20} /> @Awokemu19
                      </a>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'adminchat' && <UserChat />}
              {activeTab === 'payment' && <PaymentHistory />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
