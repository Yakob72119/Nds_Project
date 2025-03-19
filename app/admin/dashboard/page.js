'use client';
import { useAuth } from '@/app/hooks/useAuth';
import AdminDashboard from '@/app/components/admin/AdminDashboard';

export default function AdminDashboardPage() {
  const { session, status } = useAuth('admin');

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return <AdminDashboard />;
} 