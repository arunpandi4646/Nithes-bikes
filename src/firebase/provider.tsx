'use client';

import { createContext, useContext } from 'react';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';

export interface FirebaseContextValue {
  app: FirebaseApp | null;
  auth: Auth | null;
  db: Firestore | null;
}

export const FirebaseContext = createContext<FirebaseContextValue | undefined>(
  undefined,
);

export const FirebaseProvider = ({
  children,
  ...value
}: { children: React.ReactNode } & FirebaseContextValue) => {
  return (
    <FirebaseContext.Provider value={value}>
      {children}
      <FirebaseErrorListener />
    </FirebaseContext.Provider>
  );
};

export const useFirebase = (): FirebaseContextValue => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};

export const useFirebaseApp = (): FirebaseApp => {
  const { app } = useFirebase();
  if (!app) {
    throw new Error('Firebase app not available');
  }
  return app;
};

export const useAuth = (): Auth => {
  const { auth } = useFirebase();
  if (!auth) {
    throw new Error('Firebase Auth not available');
  }
  return auth;
};

export const useFirestore = (): Firestore => {
  const { db } = useFirebase();
  if (!db) {
    throw new Error('Firestore not available');
  }
  return db;
};
