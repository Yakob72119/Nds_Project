'use client';
import { useAuth } from '@/app/hooks/useAuth';
import UserDashboard from '../../components/user/UserDashboard';


export default function AdminDashboardPage() {
  const { session, status } = useAuth('admin');

  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  return <UserDashboard />;
} 