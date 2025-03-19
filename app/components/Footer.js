'use client';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#1a1f2b] text-white">
      <div className="max-w-7xl mx-auto px-6 py-4">
        {/* Main footer content */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-between gap-8 sm:gap-4">
          {/* Logo and text - centered on mobile, left on desktop */}
          <div className="flex items-center space-x-2">
            <span className="text-red-500">♥</span>
            <span className="text-yellow-400">NDS has extra opportunities</span>
          </div>

          {/* Navigation links - centered on mobile, right on desktop */}
          <nav className="flex flex-wrap justify-center sm:justify-end items-center gap-4 sm:gap-6">
            <Link href="/" className="hover:text-gray-300">
              Home
            </Link>
            <Link href="/services" className="hover:text-gray-300">
              Services
            </Link>
            <Link href="/about-us" className="hover:text-gray-300">
              About Us
            </Link>
            <Link href="/contact" className="hover:text-gray-300">
              Contact
            </Link>
            <Link href="/privacy-policy" className="hover:text-gray-300">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-gray-300">
              Terms of Service
            </Link>
          </nav>
        </div>

        {/* Bottom section with copyright and social links */}
        <div className="mt-8 pt-4 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Copyright text */}
          <p className="text-sm text-gray-400 text-center sm:text-left">
            © 2025 NDS Trading Opportunity Hub Partnership. All rights reserved.
          </p>

          {/* Social media links */}
          <div className="flex space-x-6">
            <Link href="https://facebook.com" className="hover:text-blue-400">
              <FaFacebook size={20} />
            </Link>
            <Link href="https://twitter.com" className="hover:text-blue-400">
              <FaTwitter size={20} />
            </Link>
            <Link href="https://instagram.com" className="hover:text-blue-400">
              <FaInstagram size={20} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
