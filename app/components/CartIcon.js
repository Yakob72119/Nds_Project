'use client';
import { useCart } from '../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';
import Link from 'next/link';

export default function CartIcon() {
  const { cartItems } = useCart();

  return (
    <Link href="/cart" className="relative">
      <FaShoppingCart className="w-6 h-6" />
      {cartItems.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {cartItems.length}
        </span>
      )}
    </Link>
  );
} 