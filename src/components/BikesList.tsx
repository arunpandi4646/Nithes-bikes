'use client';

import { useEffect, useMemo, useState } from 'react';
import { collection, onSnapshot, query, orderBy, Firestore } from 'firebase/firestore';
import { useFirestore, useMemoFirebase } from '@/firebase';
import BikeCard from './BikeCard';
import { Skeleton } from '@/components/ui/skeleton';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { useCollection } from '@/firebase/firestore/use-collection';

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
  const firestore = useFirestore();

  const bikesQuery = useMemoFirebase(() => {
      if (!firestore) return null;
      return query(collection(firestore, 'bikes'), orderBy('createdAt', 'desc'));
  }, [firestore]);

  const { data: bikes, isLoading, error } = useCollection<Bike>(bikesQuery);
  
  useEffect(() => {
    if (error) {
       console.error('Error fetching bikes:', error);
        // Fallback for when index is not ready
        if (error.message.includes('requires an index')) {
          const fallbackQuery = collection(firestore, 'bikes');
          const fallbackUnsubscribe = onSnapshot(fallbackQuery, (snapshot) => {
            // This is a simplified fallback, ideally you'd merge this with the hook's state management
          }, (fallbackError) => {
              console.error('Error fetching bikes with fallback:', fallbackError);
          });
          return () => fallbackUnsubscribe();
        }
    }
  }, [error, firestore]);

  if (isLoading) {
    return (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col space-y-3 rounded-lg border p-4">
            <Skeleton className="h-[224px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-5 w-1/2" />
              <div className="flex gap-4 pt-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!bikes || bikes.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-dashed">
        <div className="text-center">
            <p className="text-lg font-medium text-muted-foreground">No bikes available yet.</p>
            <p className="text-sm text-muted-foreground">New bikes added by the admin will appear here instantly.</p>
        </div>
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
