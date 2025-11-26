'use client';

import BikeCard from '@/components/BikeCard';
import type { Bike } from '@/lib/types';
import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Skeleton } from '@/components/ui/skeleton';

export default function BikesSection() {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bikesCollection = collection(db, 'bikes');
    const unsubscribe = onSnapshot(bikesCollection, (snapshot) => {
      const bikesList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Bike));
      setBikes(bikesList);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching bikes: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">Available Bikes</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Explore our premium collection of new and pre-owned bikes
          </p>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex flex-col space-y-3">
                <Skeleton className="h-[224px] w-full rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        ) : bikes.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {bikes.map((bike) => (
              <BikeCard key={bike.id} bike={bike} />
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            <p>No bikes available at the moment. Please check back later.</p>
          </div>
        )}
      </div>
    </section>
  );
}
