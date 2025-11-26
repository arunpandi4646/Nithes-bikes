'use client';

import { useState, useEffect } from 'react';
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
import { db, storage } from '@/lib/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const bikeFormSchema = z.object({
  name: z.string().min(3, 'Name is too short'),
  price: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().positive('Price must be a positive number')
  ),
  description: z.string().min(10, 'Description is too short'),
  features: z.string().min(3, 'Features are required'),
  image: z.any().refine((files) => files?.length > 0, 'Image is required.'),
});

interface AdminModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AdminModal({ isOpen, onClose }: AdminModalProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof bikeFormSchema>>({
    resolver: zodResolver(bikeFormSchema),
    defaultValues: { name: '', price: 0, description: '', features: '' },
  });

  useEffect(() => {
    if (!isOpen) {
      form.reset();
      setImagePreview(null);
    }
  }, [isOpen, form]);

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
        price: values.price,
        description: values.description,
        image: imageUrl,
        imageHint: "new motorcycle",
        features: values.features.split(',').map(f => f.trim()),
      });
      
      toast({ title: 'Success', description: 'Bike added successfully.' });
      onClose();
    } catch (error) {
      console.error('Error adding bike:', error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to add bike.' });
    } finally {
        setLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
            <DialogHeader>
            <DialogTitle className="text-2xl">Add New Bike</DialogTitle>
            <DialogDescription>
                Fill out the form below to add a new bike to your inventory.
            </DialogDescription>
            </DialogHeader>
            <div className="mt-4">
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
                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="ghost" onClick={onClose} disabled={loading}>Cancel</Button>
                        <Button type="submit" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Add Bike
                        </Button>
                    </div>
                    </form>
                </Form>
            </div>
        </DialogContent>
    </Dialog>
  );
}
