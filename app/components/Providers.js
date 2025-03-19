'use client';
import { SessionProvider } from 'next-auth/react';
import { CartProvider } from '../context/CartContext';

export default function Providers({ children }) {
  return (
    <SessionProvider session={null}>
      <CartProvider>
        {children}
      </CartProvider>
    </SessionProvider>
  );
} 