'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import type { Section } from '@/lib/types';

interface AppContextType {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
  isLoginModalOpen: boolean;
  setLoginModalOpen: (isOpen: boolean) => void;
  isSignupModalOpen: boolean;
  setSignupModalOpen: (isOpen: boolean) => void;
  user: User | null;
  authLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSectionState] = useState<Section>('home');
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setSignupModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const setActiveSection = (section: Section) => {
    setActiveSectionState(section);
    window.scrollTo(0, 0);
  };

  const value = {
    activeSection,
    setActiveSection,
    isLoginModalOpen,
    setLoginModalOpen,
    isSignupModalOpen,
    setSignupModalOpen,
    user,
    authLoading,
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
