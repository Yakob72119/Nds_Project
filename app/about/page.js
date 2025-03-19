"use client";

import Image from 'next/image';
import { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function About() {
  const [isLicenseOpen, setIsLicenseOpen] = useState(false);

  return (
    <div>
    <Navigation />
    <section className="max-w-6xl mx-auto px-6 py-16 text-center">
      {/* Section Header */}
      <h2 className="text-5xl font-bold mb-12 text-gray-900">About Us</h2>
      
      {/* Vision and Mission */}
      <div className="mb-16 bg-gray-100 p-8 rounded-lg shadow-lg">
        <h3 className="text-3xl font-semibold mb-4 text-blue-600">Our Vision & Mission</h3>
        <p className="text-lg text-gray-700 leading-relaxed">
          We strive to create innovative solutions that empower individuals and businesses,
          ensuring growth and success in an ever-evolving digital world.
        </p>
      </div>

      {/* Where We Are */}
      <div className="mb-16 bg-gray-100 p-8 rounded-lg shadow-lg">
        <h3 className="text-3xl font-semibold mb-4 text-blue-600">Where We Are</h3>
        <p className="text-lg text-gray-700 leading-relaxed">
          Our headquarters is located in [Your Location], and we operate globally to serve our clients
          with excellence and professionalism.
        </p>
      </div>

      {/* Team Members */}
      <div className="mb-16">
        <h3 className="text-3xl font-semibold mb-8 text-gray-900">Our Team</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div key={member.id} className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-2xl transition duration-300">
              <Image
                src='/image1.jpeg'
                alt={member.name}
                width={150}
                height={150}
                className="rounded-full mx-auto mb-4 border-4 border-blue-500"
              />
              <h4 className="text-xl font-semibold text-gray-800">{member.name}</h4>
              <p className="text-gray-600">{member.position}</p>
              <p className="text-gray-500">{member.phone}</p>
            </div>
          ))}
        </div>
      </div>

      {/* License Papers */}
      <div className="relative mb-16 text-center">
        <h3 className="text-3xl font-semibold mb-6 text-gray-900">Our License</h3>
        <Image
          src="/image1.jpeg" // Update with actual license image path
          alt="Company License"
          width={600}
          height={400}
          className="mx-auto rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform"
          onClick={() => setIsLicenseOpen(true)}
        />
        {isLicenseOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-50">
            <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-4xl">
              <button
                className="absolute top-4 right-4 text-gray-700 text-2xl font-bold cursor-pointer"
                onClick={() => setIsLicenseOpen(false)}
              >
                &times;
              </button>
              <Image
                src="/image2.jpeg"
                alt="Company License Full View"
                width={800}
                height={600}
                className="rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </section>
    <Footer />
    </div>
  );
}

const teamMembers = [
  {
    id: 1,
    name: "John Doe",
    position: "CEO",
    phone: "+1234567890",
    photo: "/image1.jpeg",
  },
  {
    id: 2,
    name: "Jane Smith",
    position: "CTO",
    phone: "+9876543210",
    photo: "/image1.jpeg",
  },
  {
    id: 3,
    name: "Michael Brown",
    position: "COO",
    phone: "+1122334455",
    photo: "/image1.jpeg",
  },
];
