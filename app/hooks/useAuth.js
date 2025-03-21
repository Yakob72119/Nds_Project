import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function useAuth(requiredRole) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // ✅ Wait for session to load

    if (!session) {
      router.replace('/login'); // ✅ Use replace() to prevent back button issue
    } else if (requiredRole && session.user.role !== requiredRole) {
      router.replace(session.user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard');
    }
  }, [session, status, router, requiredRole]);

  return { session, status };
}
