'use client';

import Link from 'next/link';
import { Facebook, Instagram, Youtube } from 'lucide-react';

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


export default function SocialBar() {
  return (
    <div className="bg-nav-background py-12 text-white">
      <div className="container text-center">
        <h2 className="text-3xl font-bold">Follow Us on Social Media</h2>
        <div className="mt-8 flex justify-center gap-4">
          {socialLinks.map((link) => (
            <Link key={link.name} href={link.href} target="_blank" rel="noopener noreferrer"
              className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-primary"
            >
              {link.icon === 'whatsapp' ? <WhatsAppIcon /> : <link.icon className="h-6 w-6" />}
              <span className="sr-only">{link.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
