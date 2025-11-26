'use client';

import BikeCard from '@/components/BikeCard';
import type { Bike } from '@/lib/types';
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Skeleton } from '@/components/ui/skeleton';

export default function BikesSection() {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const bikesCollection = collection(db, 'bikes');
        const bikeSnapshot = await getDocs(bikesCollection);
        const bikesList = bikeSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Bike));
        setBikes(bikesList);
      } catch (error) {
        console.error("Error fetching bikes: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBikes();
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
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex flex-col space-y-3">
                <Skeleton className="h-[224px] w-full rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))
          ) : (
            bikes.map((bike) => (
              <BikeCard key={bike.id} bike={bike} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
