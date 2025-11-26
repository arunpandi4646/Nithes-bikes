'use client';

import { useAppContext } from '@/contexts/AppContext';
import { Facebook, Heart, Instagram, Mail, MapPin, Phone, Youtube } from 'lucide-react';
import type { Section } from '@/lib/types';
import Link from 'next/link';

const socialLinks = [
    { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/_nitheesh_garage_?igsh=NHBwd291MzhxeG5l&utm_source=qr' },
    { name: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61583377993858&mibextid=wwXIfr&mibextid=wwXIfr' },
    { name: 'WhatsApp', icon: 'whatsapp', href: 'https://chat.whatsapp.com/LODXsicD1TO4bqKN1USDrv?mode=wwt' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/@nitheeshgarage?si=a8n_mG1yrRdgNoGq' },
];

const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle">
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 2.35.83 4.5 2.22 6.23L2.23 22l4.1-2.12c1.6.86 3.42 1.37 5.71 1.37 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zM9.06 8.1c.21-.24.45-.37.7-.37s.48.14.65.41c.17.27.67 1.63.73 1.76.06.13.1.27.01.44-.09.17-.18.27-.35.44-.17.17-.35.37-.5.5-.15.13-.3.29-.14.56.16.27.71 1.18 1.5 1.95.96.94 1.8 1.22 2.05 1.29.25.07.4-.01.54-.12.13-.13.56-.65.73-.88.17-.23.34-.18.57-.1.23.08 1.45.68 1.7 1.8.25 1.12.13 2.11-.09 2.36-.22.25-1.29 1.2-1.8 1.2s-1.48-.22-2.82-1.55c-1.34-1.33-2.22-2.95-2.29-3.08-.07-.13-.62-1.29-.62-2.42 0-1.13.5-1.72.68-1.95z"/>
    </svg>
);

export default function Footer() {
  const { setActiveSection } = useAppContext();

  const handleNavClick = (section: Section) => {
    setActiveSection(section);
  };
  
  const quickLinks: {label: string, section: Section}[] = [
    { label: 'Home', section: 'home' },
    { label: 'Bikes', section: 'bikes' },
    { label: 'Services', section: 'services' },
    { label: 'About Us', section: 'about' },
    { label: 'Contact', section: 'contact' },
  ];

  const serviceLinks = [
    'Bike Sales',
    'Servicing & Repair',
    'Spare Parts',
    'Customization',
    'Insurance Help',
  ];

  return (
    <footer className="bg-nav-background text-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="footer-column">
            <h3 className="mb-4 text-xl font-bold">Nitheesh Garage</h3>
            <p className="text-gray-300">
              Your trusted partner for premium bike sales and service. We provide quality two-wheeler solutions
              with exceptional customer service.
            </p>
            <div className="mt-6 flex space-x-4">
                {socialLinks.map((link) => (
                    <Link key={link.name} href={link.href} target="_blank" rel="noopener noreferrer"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-primary">
                        {link.icon === 'whatsapp' ? <WhatsAppIcon /> : <link.icon className="h-5 w-5" />}
                        <span className="sr-only">{link.name}</span>
                    </Link>
                ))}
            </div>
          </div>

          <div className="footer-column">
            <h3 className="mb-4 text-xl font-bold">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.section}>
                  <a
                    onClick={() => handleNavClick(link.section)}
                    className="cursor-pointer text-gray-300 transition-colors hover:text-primary hover:pl-2"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="footer-column">
            <h3 className="mb-4 text-xl font-bold">Our Services</h3>
            <ul className="space-y-2">
              {serviceLinks.map(link => (
                <li key={link}>
                  <a
                    onClick={() => handleNavClick('services')}
                    className="cursor-pointer text-gray-300 transition-colors hover:text-primary hover:pl-2"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="mb-4 text-xl font-bold">Contact Info</h3>
            <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                    <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                    <span>Nitheesh Garage, Pallapalayam, Tiruppur</span>
                </li>
                <li className="flex items-start gap-3">
                    <Phone className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                    <span>+91 93609 97425</span>
                </li>
                 <li className="flex items-start gap-3">
                    <Mail className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                    <a href="mailto:nitheeshgarage@gmail.com" className="hover:text-primary">nitheeshgarage@gmail.com</a>
                </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-6">
        <div className="container text-center text-gray-400">
          <p className="flex items-center justify-center gap-1.5">
            &copy; {new Date().getFullYear()} Nitheesh Garage. All Rights Reserved. Designed with <Heart className="h-4 w-4 text-primary" fill="currentColor" />
          </p>
        </div>
      </div>
    </footer>
  );
}
