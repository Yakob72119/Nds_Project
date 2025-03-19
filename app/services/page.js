

'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import AmountModal from '../components/AmountModal';
import PatientRegistrationForm from '../components/PatientRegistrationForm';

export default function ServicesPage() {
  const [expandedCard, setExpandedCard] = useState(null);
  const { addToCart } = useCart();
  const [showAmountModal, setShowAmountModal] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [pendingService, setPendingService] = useState(null);
  const [pendingPatientData, setPendingPatientData] = useState(null);
  const [pendingAmount, setPendingAmount] = useState(null);

  const services = [
    {
      image: "/image1.jpeg",
      title: "Social Media Services",
      description: "Boost your online presence with our social media solutions.",
      packages: [
        { name: "Silver Package", price: "2,500 birr" },
        { name: "Platinum Package", price: "5,000 birr" },
        { name: "Diamond Package", price: "10,000 birr" }
      ]
    },
    {
      image: "/image3.jpeg",
      title: "Health Services",
      description: "Comprehensive health solutions to improve wellbeing.",
      packages: [
        { name: "Homecare Service", price: "Varies" },
        { name: "Telehealth Service", price: "Varies" }
      ]
    },
    {
      image: "/image2.jpeg",
      title: "Education Services",
      description: "Quality educational programs and resources.",
      packages: [{ name: "Standard Package", price: "1,500 birr" }]
    }
  ];

  const handleServiceContinue = (service, pkg) => {
    if (service.title === "Health Services") {
      setPendingService({ service, pkg });
      setShowRegistrationForm(true);
    } else {
      addToCart({
        id: `${service.title}-${pkg.name}`,
        serviceName: service.title,
        packageName: pkg.name,
        price: pkg.price,
      });
    }
  };

  const handleRegistrationSubmit = (patientData) => {
    setPendingPatientData(patientData);
    setShowRegistrationForm(false);
    setShowAmountModal(true);
  };

  const handleAmountConfirm = (amount) => {
    setPendingAmount(amount);
    addToCart({
      id: `${pendingService.service.title}-${pendingService.pkg.name}-${Date.now()}`,
      serviceName: "Health Services",
      packageName: pendingService.pkg.name,
      price: `${amount} birr`,
      patientDetails: { ...pendingPatientData, paymentAmount: amount },
    });
    setShowAmountModal(false);
    alert("Patient registered and service added to cart!");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow py-24">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-2">Our Services</h1>
            <p className="text-gray-600">Discover the range of services we offer.</p>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div key={index} className={`bg-white rounded-lg shadow-lg transition-all duration-300 ${expandedCard === index ? 'md:col-span-3' : ''}`}>
                  <div className="flex flex-col md:flex-row">
                    <div className={`${expandedCard === index ? 'md:w-1/3' : 'w-full'}`}>
                      <div className="relative h-48">
                        <Image src={service.image} alt={service.title} fill className="object-cover" priority={index === 0} />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                        <p className="text-gray-600 mb-4">{service.description}</p>
                        <button onClick={() => setExpandedCard(expandedCard === index ? null : index)} className="text-blue-600 hover:text-blue-800">
                          {expandedCard === index ? '← Close Details' : 'View Details →'}
                        </button>
                      </div>
                    </div>
                    {expandedCard === index && (
                      <div className="md:w-2/3 p-6 bg-gray-50">
                        <h4 className="text-2xl font-semibold mb-6">Available Packages</h4>
                        <div className="grid gap-6">
                          {service.packages.map((pkg, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-lg shadow">
                              <h5 className="text-xl font-semibold mb-2">{pkg.name}</h5>
                              <p className="text-2xl text-blue-600 font-bold mb-4">{pkg.price}</p>
                              <button onClick={() => handleServiceContinue(service, pkg)} className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                                Continue
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <PatientRegistrationForm isOpen={showRegistrationForm} onClose={() => setShowRegistrationForm(false)} onSubmit={handleRegistrationSubmit} />
      <AmountModal isOpen={showAmountModal} onClose={() => setShowAmountModal(false)} onConfirm={handleAmountConfirm} />
    </>
  );
}