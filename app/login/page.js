"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaUser, FaLock } from "react-icons/fa";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ phoneNumber: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      phoneNumber: formData.phoneNumber,
      password: formData.password,
    });

    if (res?.error) {
      setError("Invalid phone number or password!");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-4 flex items-center justify-center">
          <FaUser className="mr-2 text-blue-500" /> Welcome!
        </h2>
        <p className="text-center text-gray-600 mb-6">Sign in to your account</p>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
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

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="accent-blue-500" />
              <span>Remember me?</span>
            </label>
            <Link href="#" className="text-blue-500">Forgot password?</Link>
          </div>

          <button type="submit" className="btn-primary w-full">Login</button>

          <p className="text-sm text-center">
            Don’t have an account? <Link href="/signup" className="text-blue-500">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
