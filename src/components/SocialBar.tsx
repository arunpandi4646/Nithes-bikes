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
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="currentColor"
    >
      <title>WhatsApp</title>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.79.46 3.45 1.28 4.94L2 22l5.13-1.35c1.43.79 3.03 1.25 4.91 1.25 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm-3 14.88c-.22 0-.43-.07-.62-.21-.49-.36-1.03-1.1-1.48-1.88-.45-.78-.9-1.63-1.02-1.92s-.15-.47.02-.73c.17-.26.39-.42.59-.55s.38-.19.52-.06c.14.13.43.51.52.61s.15.25.21.41.06.3-.01.48-.15.34-.21.41-.12.16-.06.29c.06.13.29.56.57.84s.6.53.86.72c.26.19.46.3.61.37s.29.07.41-.04.48-.56.59-.75.22-.19.38-.1c.16.09.99.47 1.16.56.17.09.29.13.33.21s.04.45-.09.84c-.13.39-.81 1.04-1.16 1.28s-.63.26-1.1.26z"/>
    </svg>
);


const SocialIcon = ({ type, href }: { type: string | React.ElementType, href: string }) => {
    let Icon;
    if (typeof type === 'string' && type === 'whatsapp') {
        Icon = WhatsAppIcon;
    } else if (typeof type !== 'string') {
        Icon = type;
    } else {
        return null;
    }

    return (
        <Link href={href} target="_blank" rel="noopener noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors duration-300 hover:bg-primary hover:text-white">
            <Icon className="h-6 w-6" />
        </Link>
    );
}

export default function SocialBar() {
  return (
    <section className="bg-background py-12">
      <div className="container flex flex-col items-center justify-center">
        <h3 className="mb-6 text-center text-2xl font-bold">Follow Us On Social Media</h3>
        <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((link) => (
                <SocialIcon key={link.name} type={link.icon} href={link.href} />
            ))}
        </div>
      </div>
    </section>
  );
}
