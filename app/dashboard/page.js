'use client';
import { useAuth } from '@/app/hooks/useAuth';
import UserChat from '../components/user/UserChat';

export default function DashboardPage() {
  const { session, status } = useAuth('user');

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return <UserChat />;
} 