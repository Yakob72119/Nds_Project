'use client';
import { useSession } from 'next-auth/react';

export default function SessionDebug() {
  const { data: session, status } = useSession();

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-sm">
      <p>Status: {status}</p>
      {session && (
        <>
          <p>User: {session.user.name}</p>
          <p>Role: {session.user.role}</p>
          <p>Phone: {session.user.phoneNumber}</p>
        </>
      )}
    </div>
  );
} 