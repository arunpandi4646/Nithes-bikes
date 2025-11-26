'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import type { Section } from '@/lib/types';
import { verifyAdmin } from '@/ai/flows/verify-admin-flow';

interface AppContextType {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
  isLoginModalOpen: boolean;
  setLoginModalOpen: (isOpen: boolean) => void;
  isAdminModalOpen: boolean;
  setAdminModalOpen: (isOpen: boolean) => void;
  user: User | null;
  authLoading: boolean;
  isAdmin: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSectionState] = useState<Section>('home');
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isAdminModalOpen, setAdminModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const checkAdminStatus = useCallback(async (user: User | null) => {
    if (user && user.email) {
      try {
        const { isAdmin } = await verifyAdmin({ email: user.email });
        setIsAdmin(isAdmin);
      } catch (error) {
        console.error('Failed to verify admin status:', error);
        setIsAdmin(false);
      }
    } else {
      setIsAdmin(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      checkAdminStatus(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, [checkAdminStatus]);

  const setActiveSection = (section: Section) => {
    setActiveSectionState(section);
    window.scrollTo(0, 0);
  };

  const value = {
    activeSection,
    setActiveSection,
    isLoginModalOpen,
    setLoginModalOpen,
    isAdminModalOpen,
    setAdminModalOpen,
    user,
    authLoading,
    isAdmin,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
