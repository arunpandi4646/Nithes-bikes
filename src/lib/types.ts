import type { LucideIcon } from 'lucide-react';

export interface Bike {
  id: string; // Changed to string for Firestore document ID
  name: string;
  price: number;
  description: string;
  image: string;
  imageHint: string;
  features: string[];
  createdAt?: {
    seconds: number;
    nanoseconds: number;
  } | Date;
}

export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
}

export type Section = 'home' | 'bikes' | 'services' | 'about' | 'contact';
