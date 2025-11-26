import type { Service } from './types';
import {
  Bike as BikeIcon,
  Wrench,
  Settings,
  Paintbrush,
  BadgeCheck,
  ArrowRightLeft,
} from 'lucide-react';

export const services: Service[] = [
  {
    title: 'Bike Sales',
    description: 'Wide range of new and pre-owned bikes with competitive pricing and flexible financing options.',
    icon: BikeIcon,
  },
  {
    title: 'Servicing & Repair',
    description: 'Expert maintenance and repair services using genuine parts and advanced diagnostic tools.',
    icon: Wrench,
  },
  {
    title: 'Spare Parts',
    description: 'Authentic spare parts and accessories for all major bike brands with warranty coverage.',
    icon: Settings,
  },
  {
    title: 'Customization',
    description: 'Custom paint jobs, modifications and personalization to make your bike truly unique.',
    icon: Paintbrush,
  },
  {
    title: 'Insurance Help',
    description: 'Assistance with bike insurance, claims processing and documentation for hassle-free coverage.',
    icon: BadgeCheck,
  },
  {
    title: 'Exchange Available',
    description: 'Get the best exchange value for your old bike with our transparent valuation process.',
    icon: ArrowRightLeft,
  },
];
