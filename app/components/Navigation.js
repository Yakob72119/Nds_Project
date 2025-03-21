'use client';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.replace('/');
  };

  return (
    <nav className="bg-white shadow-lg w-full fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <img src="/nds_log.png" alt="NDS Logo" className="h-10 w-10" />
            <span className="text-lg font-semibold text-gray-800">
              NDS Trading Hub
            </span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-800"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/services" className="nav-link">Services</Link>
            <Link href="/about" className="nav-link">About Us</Link>
            {status === 'authenticated' ? (
              <>
                <Link 
                  href={session.user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard'} 
                  className="nav-link"
                >
                  Dashboard
                </Link>
                <span className="text-gray-700">{session.user.firstName}</span>
                <button
                  onClick={handleLogout}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/contact" className="nav-link">Contact</Link>
                <Link 
                  href="/login" 
                  className="px-4 py-2 border border-blue-600 text-blue-600 font-medium rounded-md hover:bg-blue-600 hover:text-white transition duration-300"
                >
                  Login
                </Link>
                <Link 
                  href="/signup" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu - Dropdown */}
        {menuOpen && (
          <div className="md:hidden flex flex-col space-y-2 pb-4">
            <Link href="/" className="block py-2 text-gray-800">Home</Link>
            <Link href="/services" className="block py-2 text-gray-800">Services</Link>
            <Link href="/about" className="block py-2 text-gray-800">About Us</Link>
            {status === 'authenticated' ? (
              <>
                <Link 
                  href={session.user.role === 'admin' ? '/admin/dashboard' : '/dashboard'} 
                  className="block py-2 text-gray-800"
                >
                  Dashboard
                </Link>
                <span className="block py-2 text-gray-700">{session.user.firstName}</span>
                <button
                  onClick={handleLogout}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/contact" className="block py-2 text-gray-800">Contact</Link>
                <Link 
                  href="/login" 
                  className="px-4 py-2 border border-blue-600 text-blue-600 font-medium rounded-md hover:bg-blue-600 hover:text-white transition duration-300"
                >
                  Login
                </Link>
                <Link 
                  href="/signup" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
