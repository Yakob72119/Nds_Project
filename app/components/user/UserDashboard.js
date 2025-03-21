'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import PaymentHistory from './PaymentHistory';
import UserChat from './UserChat';
import Navigation from '../Navigation';


export default function AdminDashboard() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('overview');

  return (

    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Admin Dashboard
          </h1>
          
          <div className="bg-white shadow rounded-lg">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('adminchat')}
                  className={`tab-button ${activeTab === 'adminchat' ? 'active' : ''}`}
                >
                  Admin Chat
                </button>

                <button
                  onClick={() => setActiveTab('payment')}
                  className={`tab-button ${activeTab === 'payment' ? 'active' : ''}`}
                >
                  Payment History
                </button>
                
              </nav>
            </div>
            
            <div className="p-6">
              {activeTab === 'overview' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Welcome, {session?.user?.role}</h2>
                  {/* Add overview content */}
                </div>
              )}
              
              {activeTab === 'adminchat' && (
                  <UserChat />
                
              )}
              
              {activeTab === 'payment' && (
                <PaymentHistory />
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 