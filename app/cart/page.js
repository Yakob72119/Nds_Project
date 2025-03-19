'use client';
import { useCart } from '../context/CartContext';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function CartPage() {
  const { cartItems, removeFromCart, getCartTotal } = useCart();
  const [selectedItem, setSelectedItem] = useState(null); // Only one item can be selected
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = sessionStorage.getItem('_id') || 'default-user-id-123';  // Set default if null
    console.log("User ID from sessionStorage:", storedUserId);
    setUserId(storedUserId);
  }, []);
  

  // Function to handle item selection (Only 1 at a time)
  const toggleItemSelection = (itemId) => {
    setSelectedItem(prev => (prev === itemId ? null : itemId)); // Toggle selection
  };

  const getSelectedTotal = () => {
    const selected = cartItems.find(item => item.id === selectedItem);
    return selected ? parseFloat(selected.price.replace(/[^0-9.-]+/g, '')) : 0;
  };

  const handleCheckout = async () => {
    console.log("✅ Checkout button clicked!");
  
    if (!selectedItem || !userId) {
      console.warn("⚠️ No item selected or user ID missing!", { selectedItem, userId });
      return;
    }
  
    const selected = cartItems.find(item => item.id === selectedItem);
    const amount = getSelectedTotal();
    const serviceType = selected?.serviceName || "Unknown Service";
    const packageType = selected?.packageName || 'N/A';
  
    console.log('📦 Checkout Data:', { userId, amount, serviceType, packageType });
  
    try {
      const response = await axios.post('http://localhost:3000/api/payment', {
        userId,
        amount,
        serviceType,
        packageType,
      });
  
      console.log("✅ Response received:", response.data);
  
      if (response.data.checkout_url) {
        console.log("🔗 Opening Payment Page:", response.data.checkout_url);
        window.open(response.data.checkout_url, '_blank');
      } else {
        console.warn("⚠️ No checkout_url in response", response.data);
      }
    } catch (error) {
      console.error('❌ Payment Error:', error);
    }
  };
  
  return (
    <div>
      <Navigation />
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">Your cart is empty</p>
                <Link href="/services" className="text-blue-600 hover:text-blue-800">
                  ← Continue Shopping
                </Link>
              </div>
            ) : (
              <>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
                  <div className="p-6 border-b">
                    <h2 className="text-2xl font-semibold mb-2">Order Summary</h2>
                    <p className="text-gray-600">Review your selected service</p>
                  </div>

                  {cartItems.map((item, index) => (
                    <div 
                      key={item.id}
                      className={`p-6 flex items-center justify-between ${
                        index !== cartItems.length - 1 ? 'border-b' : ''
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <input
                          type="checkbox"
                          checked={selectedItem === item.id}
                          onChange={() => toggleItemSelection(item.id)}
                          className="w-5 h-5 text-blue-600"
                        />
                        <div>
                          <h3 className="text-lg font-semibold">{item.serviceName}</h3>
                          {item.packageName && <p className="text-gray-600">{item.packageName}</p>}

                          {item.serviceName === "Health Services" && item.patientDetails ? (
                            <div className="mt-2 text-sm text-gray-700">
                              <p><strong>Full Name:</strong> {item.patientDetails.fullName}</p>
                              <p><strong>Sex:</strong> {item.patientDetails.sex}</p>
                              <p><strong>Age:</strong> {item.patientDetails.age}</p>
                              <p><strong>Kebele:</strong> {item.patientDetails.kebele}</p>
                              <p><strong>Phone Number:</strong> {item.patientDetails.phoneNumber}</p>
                              <p><strong>Diagnosis:</strong> {item.patientDetails.diagnosis}</p>
                              {item.patientDetails.gcs && <p><strong>GCS:</strong> {item.patientDetails.gcs}</p>}
                              {item.patientDetails.previousHealthSector && <p><strong>Previous Health Sector:</strong> {item.patientDetails.previousHealthSector}</p>}
                              {item.patientDetails.receivedBy && <p><strong>Received By:</strong> {item.patientDetails.receivedBy}</p>}
                              {item.patientDetails.providedBy && <p><strong>Provided By:</strong> {item.patientDetails.providedBy}</p>}
                              <p><strong>Payment:</strong> {item.price}</p>
                            </div>
                          ) : (
                            <p className="text-blue-600 font-bold mt-1">{item.price}</p>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ))}

                  <div className="bg-gray-50 p-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-semibold">Selected Item:</span>
                      <span className="text-gray-600">{selectedItem ? "1 item" : "None"}</span>
                    </div>
                    <div className="flex justify-between items-center text-xl font-bold">
                      <span>Total Amount:</span>
                      <span className="text-blue-600">{getSelectedTotal().toLocaleString()} birr</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between gap-4">
                  <Link
                    href="/services"
                    className="px-6 py-3 text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition-colors"
                  >
                    Continue Shopping
                  </Link>
                  <button
                    className={`px-6 py-3 rounded transition-colors ${
                      selectedItem
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    onClick={handleCheckout}
                    disabled={!selectedItem}
                  >
                    Checkout Selected Item
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
