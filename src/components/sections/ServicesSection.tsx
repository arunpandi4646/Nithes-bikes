'use client';

import { services } from '@/lib/data';
import ServiceCard from '@/components/ServiceCard';

export default function ServicesSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">Our Services</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Comprehensive two-wheeler solutions tailored to your needs
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
