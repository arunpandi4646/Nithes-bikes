'use client';

import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy, deleteDoc, doc, Firestore } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PlusCircle, Loader2, Edit, Trash2 } from 'lucide-react';
import Image from 'next/image';
import BikeForm from './BikeForm';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import type { Bike } from '@/lib/types';


async function deleteBike(db: Firestore, bikeId: string) {
  const bikeDocRef = doc(db, 'bikes', bikeId);
  deleteDoc(bikeDocRef).catch(async (serverError) => {
    const permissionError = new FirestorePermissionError({
      path: bikeDocRef.path,
      operation: 'delete',
    });
    errorEmitter.emit('permission-error', permissionError);
  });
}

export default function AdminPage() {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setFormOpen] = useState(false);
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const bikesQuery = query(collection(db, 'bikes'), orderBy('createdAt', 'desc'));
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
        console.error("Error fetching bikes: ", error);
        setLoading(false);
        toast({
            variant: "destructive",
            title: "Error",
            description: "Could not fetch bikes. Check console for details."
        })
      }
    );
    return () => unsubscribe();
  }, [toast]);

  const handleEdit = (bike: Bike) => {
    setSelectedBike(bike);
    setFormOpen(true);
  };

  const handleAddNew = () => {
    setSelectedBike(null);
    setFormOpen(true);
  };

  const handleDelete = async (bikeId: string) => {
    try {
      await deleteBike(db, bikeId);
      toast({ title: 'Success', description: 'Bike deleted successfully.' });
    } catch (error) {
      console.error('Error deleting bike:', error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to delete bike.' });
    }
  };

  const onFormSuccess = () => {
    setFormOpen(false);
    setSelectedBike(null);
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 md:p-8">
      <div className="mx-auto max-w-6xl">
        <Dialog open={isFormOpen} onOpenChange={setFormOpen}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Manage Inventory</CardTitle>
                <CardDescription>
                  View, add, edit, or delete bike listings.
                </CardDescription>
              </div>
              <Button onClick={handleAddNew}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Bike
              </Button>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex h-64 items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : bikes.length === 0 ? (
                <div className="py-10 text-center text-muted-foreground">
                  No bikes in inventory. Add one to get started.
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {bikes.map((bike) => (
                    <Card key={bike.id} className="overflow-hidden">
                       <div className="relative h-40 w-full">
                          <Image src={bike.image} alt={bike.name} layout="fill" objectFit="cover" />
                       </div>
                       <CardContent className="p-4">
                          <h3 className="font-semibold truncate">{bike.name}</h3>
                          <p className="text-sm text-primary font-medium">₹{Number(bike.price).toLocaleString()}</p>
                          <div className="mt-4 flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleEdit(bike)}>
                                <Edit className="h-4 w-4" />
                            </Button>

                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive" size="sm">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete the bike from your inventory.
                                    </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDelete(bike.id)}>Delete</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                          </div>
                       </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
          <DialogContent className="max-w-3xl">
              <DialogHeader>
                  <DialogTitle>{selectedBike ? 'Edit Bike' : 'Add New Bike'}</DialogTitle>
              </DialogHeader>
              <BikeForm bike={selectedBike} onSuccess={onFormSuccess} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
