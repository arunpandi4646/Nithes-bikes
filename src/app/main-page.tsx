'use client';

import { AppProvider, useAppContext } from '@/contexts/AppContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HomeSection from '@/components/sections/HomeSection';
import BikesSection from '@/components/sections/BikesSection';
import ServicesSection from '@/components/sections/ServicesSection';
import AboutSection from '@/components/sections/AboutSection';
import ContactSection from '@/components/sections/ContactSection';
import LoginModal from '@/components/auth/LoginModal';

function PageContent() {
  const { 
    activeSection, 
    isLoginModalOpen, 
    setLoginModalOpen,
  } = useAppContext();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        {activeSection === 'home' && <HomeSection />}
        {activeSection === 'bikes' && <BikesSection />}
        {activeSection === 'services' && <ServicesSection />}
        {activeSection === 'about' && <AboutSection />}
        {activeSection === 'contact' && <ContactSection />}
      </main>
      <Footer />
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setLoginModalOpen(false)}
      />
    </div>
  );
}

export default function MainPage() {
  return (
    <AppProvider>
      <PageContent />
    </AppProvider>
  );
}
