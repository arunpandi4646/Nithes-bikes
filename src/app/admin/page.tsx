'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { CloudUpload, Loader2 } from 'lucide-react';
import { db, storage } from '@/lib/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const bikeFormSchema = z.object({
  name: z.string().min(3, 'Name is too short'),
  price: z.string().min(1, 'Price is required'),
  description: z.string().min(10, 'Description is too short'),
  features: z.string().min(3, 'Features are required'),
  image: z.any().refine((files) => files?.length > 0, 'Image is required.'),
});

export default function AdminDashboard() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof bikeFormSchema>>({
    resolver: zodResolver(bikeFormSchema),
    defaultValues: { name: '', price: '', description: '', features: '' },
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

  async function onSubmit(values: z.infer<typeof bikeFormSchema>) {
    setLoading(true);
    try {
      const imageFile = values.image[0] as File;
      const storageRef = ref(storage, `bikes/${Date.now()}_${imageFile.name}`);
      const uploadResult = await uploadBytes(storageRef, imageFile);
      const imageUrl = await getDownloadURL(uploadResult.ref);

      await addDoc(collection(db, 'bikes'), {
        name: values.name,
        price: Number(values.price).toLocaleString('en-IN'),
        description: values.description,
        image: imageUrl,
        imageHint: "new motorcycle",
        features: values.features.split(',').map(f => f.trim()),
      });
      
      toast({ title: 'Success', description: 'Bike added successfully.' });
      form.reset();
      setImagePreview(null);
    } catch (error) {
      console.error('Error adding bike:', error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to add bike.' });
    } finally {
        setLoading(false);
    }
  }

  return (
    <div className="container py-16 md:py-24">
        <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">Admin Panel</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Add a new bike to your inventory
            </p>
        </div>
        <div className="mx-auto max-w-2xl">
            <Card>
                <CardHeader>
                <CardTitle>Add New Bike</CardTitle>
                </CardHeader>
                <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField name="name" control={form.control} render={({ field }) => (
                        <FormItem><FormLabel>Bike Name</FormLabel><FormControl><Input placeholder="e.g., Yamaha R15" {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                    <FormField name="price" control={form.control} render={({ field }) => (
                        <FormItem><FormLabel>Price (₹)</FormLabel><FormControl><Input type="number" placeholder="e.g., 180000" {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                    <FormField name="description" control={form.control} render={({ field }) => (
                        <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea placeholder="A short description of the bike." {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                    <FormField name="features" control={form.control} render={({ field }) => (
                        <FormItem><FormLabel>Features (comma-separated)</FormLabel><FormControl><Input placeholder="e.g., 155cc Engine, ABS, 35 kmpl" {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                    <FormField name="image" control={form.control} render={({ field }) => (
                        <FormItem>
                        <FormLabel>Upload Image</FormLabel>
                        <FormControl>
                            <div>
                            <label htmlFor="bikeImage" className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-6 text-center hover:bg-accent/50">
                                <CloudUpload className="mb-2 h-10 w-10 text-primary" />
                                <span className="text-muted-foreground">Click to upload bike image</span>
                            </label>
                            <Input id="bikeImage" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                            </div>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}/>
                    {imagePreview && <Image src={imagePreview} alt="Preview" width={150} height={100} className="mt-2 rounded-md object-cover" />}
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Add Bike
                    </Button>
                    </form>
                </Form>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}