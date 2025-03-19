'use client';
import { useState } from 'react';

export default function PaymentData() {
  const [payments] = useState([
    {
      id: 1,
      user: 'John Doe',
      service: 'Social Media - Silver Package',
      amount: '2,500',
      date: '2024-03-20',
      status: 'completed'
    },
    {
      id: 2,
      user: 'Jane Smith',
      service: 'Health Services',
      amount: '5,000',
      date: '2024-03-19',
      status: 'pending'
    },
    // Add more mock data as needed
  ]);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold mb-6">Payment Data</h2>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-700">Total Revenue</h3>
          <p className="text-2xl font-bold">7,500 birr</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-green-700">Completed Payments</h3>
          <p className="text-2xl font-bold">1</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-yellow-700">Pending Payments</h3>
          <p className="text-2xl font-bold">1</p>
        </div>
      </div>

      {/* Payments Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3">User</th>
              <th className="px-6 py-3">Service</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {payments.map(payment => (
              <tr key={payment.id}>
                <td className="px-6 py-4">{payment.user}</td>
                <td className="px-6 py-4">{payment.service}</td>
                <td className="px-6 py-4">{payment.amount} birr</td>
                <td className="px-6 py-4">{payment.date}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    payment.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {payment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 