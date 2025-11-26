import type { Bike, Service } from './types';
import {
  Bike as BikeIcon,
  Wrench,
  Settings,
  Paintbrush,
  BadgeCheck,
  ArrowRightLeft,
} from 'lucide-react';

export const initialBikes: Bike[] = [
  {
    id: 1,
    name: 'Yamaha MT-15',
    price: '1,67,000',
    description: 'Powerful 155cc street bike with aggressive styling and advanced features.',
    image: 'https://picsum.photos/seed/bike1/600/400',
    imageHint: 'motorcycle street',
    features: ['155cc Engine', 'ABS', '35 kmpl'],
  },
  {
    id: 2,
    name: 'Royal Enfield Classic 350',
    price: '1,93,000',
    description: 'Iconic cruiser with timeless design and thumping engine character.',
    image: 'https://picsum.photos/seed/bike2/600/400',
    imageHint: 'motorcycle classic',
    features: ['350cc Engine', 'Classic Design', '40 kmpl'],
  },
  {
    id: 3,
    name: 'KTM 390 Adventure',
    price: '3,20,000',
    description: 'Adventure tourer built for both on-road and off-road escapades.',
    image: 'https://picsum.photos/seed/bike3/600/400',
    imageHint: 'motorcycle adventure',
    features: ['373cc Engine', 'Adventure Ready', '30 kmpl'],
  },
  {
    id: 4,
    name: 'Honda CB Shine',
    price: '78,000',
    description: 'Reliable commuter bike known for its fuel efficiency and low maintenance.',
    image: 'https://picsum.photos/seed/bike4/600/400',
    imageHint: 'motorcycle commuter',
    features: ['125cc Engine', 'Fuel Efficient', '65 kmpl'],
  },
  {
    id: 5,
    name: 'Revolt RV 400',
    price: '1,28,000',
    description: 'Smart electric bike with swappable batteries and AI connectivity.',
    image: 'https://picsum.photos/seed/bike5/600/400',
    imageHint: 'electric motorcycle',
    features: ['Electric', 'AI Features', '150 km Range'],
  },
  {
    id: 6,
    name: 'Vespa Sprint',
    price: '1,05,000',
    description: 'Stylish and premium scooter with Italian design and smooth performance.',
    image: 'https://picsum.photos/seed/bike6/600/400',
    imageHint: 'scooter vespa',
    features: ['150cc Engine', 'Premium Design', '45 kmpl'],
  },
];

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
