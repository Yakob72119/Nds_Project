'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.replace('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/nds_log.png" alt="NDS Trading Logo" width={80} height={80} className="rounded-full" />
            <span className={`text-lg font-bold ${isScrolled ? 'text-gray-900' : 'text-white'}`}>NDS Trading Opportunity Hub Partnership</span>
          </Link>

          <div className="flex items-center gap-4 lg:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`text-2xl z-50 transition-colors ${isScrolled ? 'text-gray-900' : 'text-white'}`}> 
              {isMenuOpen ? '×' : '☰'}
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.path} className={`hover:text-blue-600 transition ${isScrolled ? 'text-gray-700' : 'text-white'}`}>{link.name}</Link>
              ))}
            </div>

            <div className="flex items-center gap-4">
              {status === 'authenticated' ? (
                <>
                  <Link href={session.user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard'} className="nav-link">Dashboard</Link>
                  <span className="text-gray-700">{session.user.firstName}</span>
                  <button onClick={handleLogout} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">Logout</button>
                </>
              ) : (
                <>
                  <Link href="/login" className={`px-4 py-2 rounded transition ${isScrolled ? 'border border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600' : 'border border-white text-white hover:bg-white hover:text-gray-900'}`}>Login</Link>
                  <Link href="/signup" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Sign Up</Link>
                </>
              )}
              <Link href="/cart" className="text-gray-700 hover:text-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
