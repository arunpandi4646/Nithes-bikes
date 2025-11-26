'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { UserMenu } from '@/components/auth/UserMenu';
import { cn } from '@/lib/utils';
import type { Section } from '@/lib/types';

export default function Header() {
  const {
    activeSection,
    setActiveSection,
    setLoginModalOpen,
    setSignupModalOpen,
    user,
    authLoading,
  } = useAppContext();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; section: Section }[] = [
    { label: 'Home', section: 'home' },
    { label: 'Bikes', section: 'bikes' },
    { label: 'Services', section: 'services' },
    { label: 'About', section: 'about' },
    { label: 'Contact', section: 'contact' },
    { label: 'Admin', section: 'admin' },
  ];

  const handleNavClick = (section: Section) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-nav-background/95 text-nav-foreground shadow-md backdrop-blur-sm">
      <nav className="container flex h-[70px] items-center justify-between">
        <div
          className="flex cursor-pointer items-center gap-3"
          onClick={() => handleNavClick('home')}
        >
          <Image
            src="https://res.cloudinary.com/dry3pzan6/image/upload/v1763628420/jiupro1owybvcqu9mrgo.png"
            alt="Nitheesh Garage Logo"
            width={45}
            height={45}
            className="rounded-lg"
          />
          <span className="text-xl font-bold tracking-wide text-white">
            Nitheesh Garage
          </span>
        </div>

        <div
          className={cn(
            'fixed left-0 top-[70px] w-full bg-nav-background transition-transform duration-300 ease-in-out md:static md:w-auto md:translate-x-0 md:bg-transparent',
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <ul className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:gap-8 md:p-0">
            {navItems.map((item) => (
              <li key={item.section}>
                <a
                  onClick={() => handleNavClick(item.section)}
                  className={cn(
                    'relative cursor-pointer text-base font-medium text-white transition-colors hover:text-primary',
                    'after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-0 after:bg-primary after:transition-all after:duration-300 after:content-[""]',
                    'hover:after:w-full',
                    {
                      'text-primary after:w-full':
                        activeSection === item.section,
                    }
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <div className="mt-4 flex flex-col gap-2 border-t border-gray-700 pt-4 md:hidden">
              {authLoading ? null : user ? (
                <UserMenu />
              ) : (
                <>
                  <Button variant="outline" className="w-full justify-center border-primary text-primary hover:bg-primary hover:text-primary-foreground" onClick={() => { setLoginModalOpen(true); setMobileMenuOpen(false); }}>Login</Button>
                  <Button className="w-full justify-center" onClick={() => { setSignupModalOpen(true); setMobileMenuOpen(false); }}>Sign Up</Button>
                </>
              )}
            </div>
          </ul>
        </div>
        
        <div className="hidden items-center gap-2 md:flex">
          {authLoading ? null : user ? (
            <UserMenu />
          ) : (
            <>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground" onClick={() => setLoginModalOpen(true)}>Login</Button>
              <Button onClick={() => setSignupModalOpen(true)}>Sign Up</Button>
            </>
          )}
        </div>

        <button
          className="p-2 md:hidden"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only">Toggle menu</span>
        </button>
      </nav>
    </header>
  );
}
