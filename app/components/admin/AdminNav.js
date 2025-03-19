'use client';
import Link from 'next/link';
import { FaUsers, FaBullhorn, FaMoneyBill, FaComments } from 'react-icons/fa';

export default function AdminNav({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'accounts', label: 'Account Activation', icon: <FaUsers /> },
    { id: 'announcements', label: 'Announcements', icon: <FaBullhorn /> },
    { id: 'payments', label: 'Payment Data', icon: <FaMoneyBill /> },
    { id: 'chat', label: 'Client Chat', icon: <FaComments /> }
  ];

  return (
    <>
      {/* Top Navigation */}
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <span className="text-xl font-bold sm:text-2xl">Admin Dashboard</span>
            </div>
            <div className="flex items-center">
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                Exit Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar Navigation */}
      <aside className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200">
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
          <ul className="space-y-2 font-medium">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center w-full p-2 text-gray-900 rounded-lg hover:bg-gray-100 ${
                    activeTab === item.id ? 'bg-gray-100' : ''
                  }`}
                >
                  <span className="w-6 h-6 text-gray-500">{item.icon}</span>
                  <span className="ml-3">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
} 