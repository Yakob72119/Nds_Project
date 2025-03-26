"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaUser, FaLock, FaPhone, FaUserTie } from "react-icons/fa";
import Footer from "../components/Footer";

export default function Signup() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const referral = searchParams.get("ref"); // Get referral phone number from URL
  const [formData, setFormData] = useState({
    phoneNumber: "",
    firstName: "",
    lastName: "",
    sponsor: referral || "self-sponsored", // Pre-fill sponsor field
    position: "",
    password: "",
    confirmPassword: "",
  });
  
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Signup failed!");
      }

      router.push("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
          <h2 className="text-2xl font-bold text-center mb-4 flex items-center justify-center">
            <FaUser className="mr-2 text-blue-500" /> Create Account!
          </h2>
          <p className="text-center text-gray-600 mb-6">Join us today</p>

          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <FaPhone className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                onChange={handleChange}
                required
                className="input-style pl-10"
              />
            </div>

            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                onChange={handleChange}
                required
                className="input-style pl-10"
              />
            </div>

            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                onChange={handleChange}
                required
                className="input-style pl-10"
              />
            </div>

            <div className="relative">
              <FaUserTie className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="sponsor"
                value={formData.sponsor}
                readOnly
                className="input-style pl-10 bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div className="relative">
              <FaUserTie className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="position"
                placeholder="Position"
                onChange={handleChange}
                required
                className="input-style pl-10"
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
                className="input-style pl-10"
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter Password"
                onChange={handleChange}
                required
                className="input-style pl-10"
              />
            </div>

            <button type="submit" className="btn-primary w-full">Create Account</button>

            <p className="text-sm text-center">
              Already have an account? <Link href="/login" className="text-blue-500">Login</Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
