'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../store/authStore';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, accessToken } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && (!user || !accessToken)) {
      router.push('/auth/login');
    }
  }, [mounted, user, accessToken, router]);

  if (!mounted || !user || !accessToken) return null;

  return <>{children}</>;
}
