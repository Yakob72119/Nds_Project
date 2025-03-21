'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Announcements from './Announcements';
import AccountActivation from './AccountActivation';
import PaymentData from './PaymentData';
import AdminChat from './AdminChat';
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
                  onClick={() => setActiveTab('users')}
                  className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
                >
                  Users
                </button>
                <button
                  onClick={() => setActiveTab('announcements')}
                  className={`tab-button ${activeTab === 'announcements' ? 'active' : ''}`}
                >
                  Announcements
                </button>
                <button
                  onClick={() => setActiveTab('accountActivation')}
                  className={`tab-button ${activeTab === 'accountActivation' ? 'active' : ''}`}
                >
                  Account Activation
                </button>

                <button
                  onClick={() => setActiveTab('paymentData')}
                  className={`tab-button ${activeTab === 'paymentData' ? 'active' : ''}`}
                >
                  Payment  History
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
              
              {activeTab === 'users' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">User Management</h2>
                  <AdminChat />
                </div>
              )}
              
              {activeTab === 'announcements' && (
                <Announcements />
              )}

              {activeTab === 'accountActivation' && (
                <AccountActivation />
              )}

            {activeTab === 'paymentData' && (
                <PaymentData />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 