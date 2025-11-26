'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/contexts/AppContext';
import { Loader2 } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, authLoading, isAdmin, checkingAdmin } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    const isChecking = authLoading || checkingAdmin;
    if (!isChecking) {
      if (!user || !isAdmin) {
        router.replace('/');
      }
    }
  }, [user, authLoading, isAdmin, checkingAdmin, router]);

  if (authLoading || checkingAdmin) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null; 
  }

  return <>{children}</>;
}
