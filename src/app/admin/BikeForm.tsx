'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { CloudUpload, Loader2 } from 'lucide-react';
import { db } from '@/lib/firebase';
import { addDoc, collection, updateDoc, doc, Firestore } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import type { Bike } from '@/lib/types';


const bikeFormSchema = z.object({
  name: z.string().min(3, 'Name is too short'),
  price: z.string().min(1, 'Price is required'),
  description: z.string().min(10, 'Description is too short'),
  features: z.string().min(3, 'Features are required'),
  image: z.any().optional(),
});

type BikeFormData = z.infer<typeof bikeFormSchema>;

interface BikeFormProps {
  bike?: Bike | null;
  onSuccess: () => void;
}

async function addOrUpdateBike(db: Firestore, bikeData: any, bikeId?: string) {
  const collectionRef = collection(db, 'bikes');
  if (bikeId) {
    const docRef = doc(db, 'bikes', bikeId);
    updateDoc(docRef, bikeData).catch(async (serverError) => {
      const permissionError = new FirestorePermissionError({
        path: docRef.path,
        operation: 'update',
        requestResourceData: bikeData,
      });
      errorEmitter.emit('permission-error', permissionError);
    });
  } else {
    addDoc(collectionRef, bikeData).catch(async (serverError) => {
      const permissionError = new FirestorePermissionError({
        path: collectionRef.path,
        operation: 'create',
        requestResourceData: bikeData,
      });
      errorEmitter.emit('permission-error', permissionError);
    });
  }
}

export default function BikeForm({ bike, onSuccess }: BikeFormProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(bike?.image || null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const defaultValues = {
      name: bike?.name || '',
      price: bike?.price ? String(bike.price) : '',
      description: bike?.description || '',
      features: bike?.features?.join(', ') || '',
      image: undefined,
  };

  const form = useForm<BikeFormData>({
    resolver: zodResolver(bikeFormSchema),
    defaultValues,
  });

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue('image', e.target.files);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  }

  async function onSubmit(values: BikeFormData) {
    setLoading(true);
    try {
      let imageUrl = bike?.image; // Keep old image if not changed
      const imageFile = values.image?.[0];

      if(imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('upload_preset', 'ml_default');

        const response = await fetch('https://api.cloudinary.com/v1_1/dry3pzan6/image/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) throw new Error('Image upload failed');
        const data = await response.json();
        imageUrl = data.secure_url;
      }
      
      if (!imageUrl) {
        toast({ variant: 'destructive', title: 'Error', description: 'An image is required.' });
        setLoading(false);
        return;
      }

      const bikePayload: Partial<Bike> & { createdAt?: Date } = {
        name: values.name,
        price: parseFloat(values.price),
        description: values.description,
        image: imageUrl,
        imageHint: "new motorcycle",
        features: values.features.split(',').map(f => f.trim()),
      };

      if (!bike) {
          bikePayload.createdAt = new Date();
      }

      await addOrUpdateBike(db, bikePayload, bike?.id);

      toast({
        title: 'Success',
        description: `Bike ${bike ? 'updated' : 'added'} successfully!`,
      });
      onSuccess();
    } catch (error: any) {
      console.error('Error submitting form:', error);
      toast({ variant: 'destructive', title: 'Error', description: error.message || 'An unexpected error occurred.' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField name="name" control={form.control} render={({ field }) => (
          <FormItem><FormLabel>Bike Name</FormLabel><FormControl><Input placeholder="e.g., Yamaha R15" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField name="price" control={form.control} render={({ field }) => (
          <FormItem><FormLabel>Price (₹)</FormLabel><FormControl><Input type="number" placeholder="e.g., 180000" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField name="description" control={form.control} render={({ field }) => (
          <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea placeholder="A short description of the bike." {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField name="features" control={form.control} render={({ field }) => (
          <FormItem><FormLabel>Features (comma-separated)</FormLabel><FormControl><Input placeholder="e.g., 155cc Engine, ABS, 35 kmpl" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField name="image" control={form.control} render={({ field: { onChange, value, ...fieldProps } }) => (
          <FormItem>
            <FormLabel>Upload Image</FormLabel>
            <FormControl>
              <div>
                <label htmlFor="bikeImage" className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-6 text-center hover:bg-accent/50">
                  <CloudUpload className="mb-2 h-10 w-10 text-primary" />
                  <span className="text-muted-foreground">{imagePreview ? 'Change image' : 'Click to upload bike image'}</span>
                </label>
                <Input id="bikeImage" type="file" accept="image/*" className="hidden" {...fieldProps} onChange={handleImageChange} />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        {imagePreview && <Image src={imagePreview} alt="Preview" width={150} height={100} className="mt-2 rounded-md object-cover" />}
        <div className="flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={onSuccess}>Cancel</Button>
          <Button type="submit" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {bike ? 'Save Changes' : 'Add Bike'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
