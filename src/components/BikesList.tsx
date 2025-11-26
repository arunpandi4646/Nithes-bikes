'use client';

import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import BikeCard from './BikeCard';
import { Skeleton } from '@/components/ui/skeleton';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

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
        console.error('Error fetching bikes with ordering:', error);
        
        // Emit a contextual error for permission issues
        if (error.code === 'permission-denied') {
            const permissionError = new FirestorePermissionError({
                path: collection(db, 'bikes').path,
                operation: 'list',
            });
            errorEmitter.emit('permission-error', permissionError);
        }

        setLoading(false);
        // Fallback to fetching without ordering if index is not ready
        const fallbackQuery = collection(db, 'bikes');
        const fallbackUnsubscribe = onSnapshot(fallbackQuery, (snapshot) => {
          const bikesData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Bike[];
          setBikes(bikesData);
          setLoading(false);
        }, (fallbackError) => {
            console.error('Error fetching bikes with fallback:', fallbackError);
            if (fallbackError.code === 'permission-denied') {
                const permissionError = new FirestorePermissionError({
                    path: collection(db, 'bikes').path,
                    operation: 'list',
                });
                errorEmitter.emit('permission-error', permissionError);
            }
            setLoading(false);
        });
        return () => fallbackUnsubscribe();
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) {
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

  if (bikes.length === 0) {
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
