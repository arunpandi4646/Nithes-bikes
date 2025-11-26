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
import { addDoc, collection } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/contexts/AppContext';

const bikeFormSchema = z.object({
  name: z.string().min(3, 'Name is too short'),
  price: z.string().refine(val => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: 'Price must be a positive number',
  }),
  description: z.string().min(10, 'Description is too short'),
  features: z.string().min(3, 'Features are required'),
  image: z.any().refine((files) => files?.length > 0, 'Image is required.'),
});

export default function AdminPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setActiveSection } = useAppContext();

  const form = useForm<z.infer<typeof bikeFormSchema>>({
    resolver: zodResolver(bikeFormSchema),
    defaultValues: {
      name: '',
      price: '',
      description: '',
      features: '',
      image: undefined
    },
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
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('upload_preset', 'ml_default');

      const response = await fetch('https://api.cloudinary.com/v1_1/dry3pzan6/image/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Image upload failed');
      }

      const data = await response.json();
      const imageUrl = data.secure_url;

      await addDoc(collection(db, 'bikes'), {
        name: values.name,
        price: parseFloat(values.price),
        description: values.description,
        image: imageUrl,
        imageHint: "new motorcycle",
        features: values.features.split(',').map(f => f.trim()),
        createdAt: new Date(),
      });
      
      toast({ title: 'Success', description: 'Bike added successfully and will appear instantly!' });
      form.reset({
        name: '',
        price: '',
        description: '',
        features: '',
        image: undefined
      });
      setImagePreview(null);
      
      // Navigate to user-facing bikes page
      setActiveSection('bikes');
      router.push('/');

    } catch (error) {
      console.error('Error adding bike:', error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to add bike.' });
    } finally {
        setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 md:p-8">
      <div className="mx-auto max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Admin - Add New Bike</CardTitle>
            <CardDescription>
              Fill out the form below to add a new bike to the inventory.
            </CardDescription>
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
                <FormField name="image" control={form.control} render={({ field: { onChange, value, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>Upload Image</FormLabel>
                    <FormControl>
                      <div>
                        <label htmlFor="bikeImage" className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-6 text-center hover:bg-accent/50">
                          <CloudUpload className="mb-2 h-10 w-10 text-primary" />
                          <span className="text-muted-foreground">Click to upload bike image</span>
                        </label>
                        <Input id="bikeImage" type="file" accept="image/*" className="hidden" {...fieldProps} onChange={handleImageChange} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}/>
                {imagePreview && <Image src={imagePreview} alt="Preview" width={150} height={100} className="mt-2 rounded-md object-cover" />}
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="ghost" asChild>
                    <Link href="/">Back to Home</Link>
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Add Bike
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
