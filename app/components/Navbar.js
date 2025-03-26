'use client';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import CartIcon from './CartIcon';

export default function Navigation() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.replace('/');
  };

  return (
    <nav className="bg-white shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/nds_log.png" alt="NDS Logo" width={40} height={40} />
          <span className="text-lg font-bold text-gray-900">NDS Trading Hub</span>
        </Link>

        {/* Mobile Menu Button */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-gray-800">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6">
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/services" className="nav-link">Services</Link>
          <Link href="/about" className="nav-link">About Us</Link>

          {/* Conditionally render Contact link */}
          {status !== 'authenticated' && (
            <Link href="/contact" className="nav-link">Contact</Link>
          )}

          {status === 'authenticated' ? (
            <>
              <Link href={session.user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard'} className="nav-link">Dashboard</Link>
              <span className="text-gray-700">{session.user.firstName}</span>
              <CartIcon />
              <button onClick={handleLogout} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="px-4 py-2 border border-blue-600 text-blue-600 font-medium rounded-md hover:bg-blue-600 hover:text-white transition duration-300">Login</Link>
              <Link href="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">Sign Up</Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <div className="lg:hidden fixed top-0 left-0 w-full min-h-screen bg-white shadow-md z-50 p-4">
          <button onClick={() => setMenuOpen(false)} className="text-gray-800 text-2xl">×</button>
          <div className="flex flex-col space-y-4 mt-6">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/services" className="nav-link">Services</Link>
            <Link href="/about" className="nav-link">About Us</Link>

            {/* Conditionally render Contact link */}
            {status !== 'authenticated' && (
              <Link href="/contact" className="nav-link">Contact</Link>
            )}

            {status === 'authenticated' ? (
              <>
                <Link href={session.user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard'} className="nav-link">Dashboard</Link>
                <span className="text-gray-700">{session.user.firstName}</span>
                <CartIcon />
                <button onClick={handleLogout} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">Logout</button>
              </>
            ) : (
              <>
                <Link href="/login" className="px-4 py-2 border border-blue-600 text-blue-600 font-medium rounded-md hover:bg-blue-600 hover:text-white transition duration-300">Login</Link>
                <Link href="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
