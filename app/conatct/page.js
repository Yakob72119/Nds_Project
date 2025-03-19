"use client";
import { useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("Your message has been sent successfully!");
  };

  return (
    <div>
    <Navigation />
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-300 p-6">
      <div className="bg-black bg-opacity-80 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-white mb-6">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-white block mb-1">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="text-white block mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-white block mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                placeholder="Your Phone"
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="text-white block mb-1">Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <div>
            <label className="text-white block mb-1">Message</label>
            <textarea
              name="message"
              placeholder="Your Message"
              onChange={handleChange}
              required
              className="w-full h-24 px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
          >
            SEND
          </button>
        </form>
      </div>
    </div>
    <Footer />
    </div>
  );
}
