import type { LucideIcon } from 'lucide-react';

export interface Bike {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
  imageHint: string;
  features: string[];
}

export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
}

export type Section = 'home' | 'bikes' | 'services' | 'about' | 'contact' | 'admin';
