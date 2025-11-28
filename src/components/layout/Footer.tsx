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
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="currentColor"
    >
      <title>WhatsApp</title>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.79.46 3.45 1.28 4.94L2 22l5.13-1.35c1.43.79 3.03 1.25 4.91 1.25 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm-3 14.88c-.22 0-.43-.07-.62-.21-.49-.36-1.03-1.1-1.48-1.88-.45-.78-.9-1.63-1.02-1.92s-.15-.47.02-.73c.17-.26.39-.42.59-.55s.38-.19.52-.06c.14.13.43.51.52.61s.15.25.21.41.06.3-.01.48-.15.34-.21.41-.12.16-.06.29c.06.13.29.56.57.84s.6.53.86.72c.26.19.46.3.61.37s.29.07.41-.04.48-.56.59-.75.22-.19.38-.1c.16.09.99.47 1.16.56.17.09.29.13.33.21s.04.45-.09.84c-.13.39-.81 1.04-1.16 1.28s-.63.26-1.1.26z"/>
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
