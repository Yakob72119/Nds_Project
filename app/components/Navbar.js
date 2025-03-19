'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import CartIcon from './CartIcon';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Add scroll listener with useEffect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/nds_log.png" 
              alt="NDS Trading Logo" 
              width={80}
              height={80}
              className="rounded-full"
            />
            <span className={`text-lg font-bold ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}>
              NDS Trading Opportunity Hub Partnership
            </span>
          </Link>

          {/* Mobile menu button */}
          <div className="flex items-center gap-4 lg:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`text-2xl z-50 transition-colors ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}
            >
              {isMenuOpen ? '×' : '☰'}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Navigation Links */}
            <div className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`hover:text-blue-600 transition ${
                    isScrolled ? 'text-gray-700' : 'text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Auth and Cart */}
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className={`px-4 py-2 rounded transition ${
                  isScrolled 
                    ? 'border border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600' 
                    : 'border border-white text-white hover:bg-white hover:text-gray-900'
                }`}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Sign Up
              </Link>
              <CartIcon />
            </div>
          </div>
        </div>

        {/* Mobile Navigation Overlay Background */}
        {isMenuOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black/20 z-40"
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        {/* Mobile Navigation Dropdown */}
        <div className={`lg:hidden fixed top-0 left-0 right-0 min-h-[33vh] max-h-[50vh] bg-white z-40 shadow-xl 
          transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-bold text-gray-900">Menu</span>
              {/* Cart icon for mobile menu */}
              <div className="flex items-center gap-4">
                <CartIcon />
              </div>
            </div>
            
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className="py-2 text-gray-600 hover:text-blue-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex gap-4 mt-6">
              <Link
                href="/login"
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600 transition-colors rounded-md">
                Login
              </Link>
              <Link
                href="/signup"
                className="flex-1 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors rounded-md">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}