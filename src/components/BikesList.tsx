'use client';

import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import BikeCard from './BikeCard';
import { Skeleton } from '@/components/ui/skeleton';

interface Bike {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  imageHint: string;
  features: string[];
  createdAt?: any;
}

export default function BikesList() {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bikesQuery = query(
      collection(db, 'bikes'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      bikesQuery,
      (snapshot) => {
        const bikesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Bike[];
        
        setBikes(bikesData);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching bikes:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
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
    );
  }

  if (bikes.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-lg text-muted-foreground">No bikes available yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {bikes.map((bike) => (
        <BikeCard key={bike.id} bike={bike} />
      ))}
    </div>
  );
}
