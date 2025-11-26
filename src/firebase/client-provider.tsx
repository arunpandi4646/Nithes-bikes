'use client';

import { useMemo } from 'react';
import { FirebaseProvider } from './provider';
import { initializeFirebase } from '@/lib/firebase';

export function FirebaseClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const instances = useMemo(() => initializeFirebase(), []);

  return (
    <FirebaseProvider
      app={instances.app}
      auth={instances.auth}
      db={instances.db}
    >
      {children}
    </FirebaseProvider>
  );
}
