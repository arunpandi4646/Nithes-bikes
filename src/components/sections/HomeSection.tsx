'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { services } from '@/lib/data';
import { useAppContext } from '@/contexts/AppContext';
import SocialBar from '@/components/SocialBar';
import ServiceCard from '@/components/ServiceCard';

const heroImage = "https://res.cloudinary.com/dry3pzan6/image/upload/v1763628423/yzpxw0jyfpwg3mwe5dbt.jpg";

export default function HomeSection() {
  const { setActiveSection } = useAppContext();
  
  const servicesPreview = services.slice(0, 3);

  return (
    <div>
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-nav-background py-20 text-center text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage}
            alt="Motorcycle on a scenic road"
            fill
            className="object-cover opacity-30"
            priority
            data-ai-hint="motorcycle sunset"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-nav-background via-nav-background/70 to-transparent" />
        </div>
        <div className="container relative z-10 flex flex-col items-center">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
            Premium Bike Sales & Service
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-gray-300 md:text-xl">
            Experience the best in two-wheeler solutions with our premium collection and expert services
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button size="lg" onClick={() => setActiveSection('bikes')}>
              Explore Bikes
            </Button>
            <Button size="lg" variant="secondary" onClick={() => setActiveSection('services')}>
              Our Services
            </Button>
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">Our Services</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Comprehensive two-wheeler solutions tailored to your needs
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {servicesPreview.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>
      </section>

      <SocialBar />
    </div>
  );
}
