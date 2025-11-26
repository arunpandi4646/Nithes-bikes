'use client';

import BikesList from '@/components/BikesList';

export default function BikesSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">Available Bikes</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Explore our premium collection of new and pre-owned bikes
          </p>
        </div>
        
        <BikesList />
      </div>
    </section>
  );
}
