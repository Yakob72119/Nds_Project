'use client';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function PatientRegistrationForm({ isOpen, onClose, selectedService }) {
  const { addToCart } = useCart();
  const [formData, setFormData] = useState({
    fullName: '',
    sex: '',
    age: '',
    kebele: '',
    phoneNumber: '',
    diagnosis: '',
    gcs: '',
    previousHealthSector: '',
    receivedBy: '',
    providedBy: '',
    paymentAmount: '' // Add payment amount field
  });

  const validateForm = () => {
    const { fullName, sex, age, kebele, phoneNumber, diagnosis, paymentAmount, gcs } = formData;
    const phoneRegex = /^(09|07)\d{8}$/;

    if (!fullName || !sex || !age || !kebele || !phoneNumber || !diagnosis || !paymentAmount) {
      alert('Please fill in all mandatory fields, including Payment Amount.');
      return false;
    }
    if (!phoneRegex.test(phoneNumber)) {
      alert('Phone number must start with 09 or 07 and contain 10 digits.');
      return false;
    }
    if (isNaN(paymentAmount) || paymentAmount < 0) {
      alert('Payment amount must be a valid positive number.');
      return false;
    }
    if (gcs && (gcs < 0 || gcs > 15)) {
      alert('GCS must be between 0 and 15.');
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    console.log("Adding to cart:", formData);

    const newCartItem = {
        id: Date.now(),
        serviceName: selectedService || "Health Services", // Default if undefined
        packageName: '',
        patientDetails: { ...formData }, // Make sure it's inside patientDetails
        price: `${formData.paymentAmount} birr`
      };
    
      console.log("✅ Form Submitted. Adding to cart:\n", JSON.stringify(newCartItem, null, 2)); // PROPER LOG
    
      addToCart(newCartItem);

    onClose();
    alert("Patient registered and service added to cart!");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Patient Registration</h2>
        <form>
          <input type="text" name="fullName" placeholder="Full Name *" className="w-full p-2 border mb-2" onChange={handleChange} required />
          <select name="sex" className="w-full p-2 border mb-2" onChange={handleChange} required>
            <option value="">Select Sex *</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input type="number" name="age" placeholder="Age *" className="w-full p-2 border mb-2" onChange={handleChange} required />
          <input type="text" name="kebele" placeholder="Kebele *" className="w-full p-2 border mb-2" onChange={handleChange} required />
          <input type="text" name="phoneNumber" placeholder="Phone Number *" className="w-full p-2 border mb-2" onChange={handleChange} required />
          <input type="text" name="diagnosis" placeholder="Diagnosis *" className="w-full p-2 border mb-2" onChange={handleChange} required />
          <input type="number" name="gcs" placeholder="GCS (0-15)" className="w-full p-2 border mb-2" onChange={handleChange} />
          <input type="text" name="previousHealthSector" placeholder="Previous Health Sector" className="w-full p-2 border mb-2" onChange={handleChange} />
          <input type="text" name="receivedBy" placeholder="Received By" className="w-full p-2 border mb-2" onChange={handleChange} />
          <input type="text" name="providedBy" placeholder="Provided By" className="w-full p-2 border mb-2" onChange={handleChange} />
          <input type="number" name="paymentAmount" placeholder="Payment Amount (birr) *" className="w-full p-2 border mb-2" onChange={handleChange} required />
        </form>
        <div className="flex justify-between mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">Submit</button>
        </div>
      </div>
    </div>
  );
}
