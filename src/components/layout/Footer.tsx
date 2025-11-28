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
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
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
