'use client';
import { useState } from 'react';

export default function PaymentHistory() {
  const [payments] = useState([
    {
      id: 1,
      service: 'Social Media - Silver Package',
      amount: '2,500',
      date: '2024-03-20',
      status: 'completed',
      invoice: 'INV-2024-001'
    },
    {
      id: 2,
      service: 'Health Services',
      amount: '5,000',
      date: '2024-03-19',
      status: 'pending',
      invoice: 'INV-2024-002'
    }
  ]);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold mb-6">Payment History</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-700">Total Spent</h3>
          <p className="text-2xl font-bold">7,500 birr</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-green-700">Active Services</h3>
          <p className="text-2xl font-bold">2</p>
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
              <th className="px-6 py-3">Service</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Invoice</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {payments.map(payment => (
              <tr key={payment.id}>
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
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-800">
                    {payment.invoice}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 