'use client';

import BikeCard from '@/components/BikeCard';
import { initialBikes } from '@/lib/data';
import type { Bike } from '@/lib/types';
import { useState } from 'react';

export default function BikesSection() {
  const [bikes, setBikes] = useState<Bike[]>(initialBikes);

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">Available Bikes</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Explore our premium collection of new and pre-owned bikes
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {bikes.map((bike) => (
            <BikeCard key={bike.id} bike={bike} />
          ))}
        </div>
      </div>
    </section>
  );
}
