'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { useAuth } from '@/firebase';
import type { Section } from '@/lib/types';
import { verifyAdmin } from '@/ai/flows/verify-admin-flow';

interface AppContextType {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
  isLoginModalOpen: boolean;
  setLoginModalOpen: (isOpen: boolean) => void;
  user: User | null;
  authLoading: boolean;
  isAdmin: boolean;
  checkingAdmin: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSectionState] = useState<Section>('home');
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  const auth = useAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
      
      if (currentUser) {
        try {
          setCheckingAdmin(true);
          const { isAdmin } = await verifyAdmin({ uid: currentUser.uid });
          setIsAdmin(isAdmin);
        } catch (error) {
          console.error("Error verifying admin status:", error);
          setIsAdmin(false);
        } finally {
          setCheckingAdmin(false);
        }
      } else {
        setIsAdmin(false);
        setCheckingAdmin(false);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  const setActiveSection = (section: Section) => {
    setActiveSectionState(section);
    window.scrollTo(0, 0);
  };

  const value = {
    activeSection,
    setActiveSection,
    isLoginModalOpen,
    setLoginModalOpen,
    user,
    authLoading,
    isAdmin,
    checkingAdmin,
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
