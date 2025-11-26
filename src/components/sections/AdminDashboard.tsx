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
import { initialBikes } from '@/lib/data';
import type { Bike } from '@/lib/types';
import Image from 'next/image';
import { CloudUpload, Trash2 } from 'lucide-react';

const bikeFormSchema = z.object({
  name: z.string().min(3, 'Name is too short'),
  price: z.string().min(1, 'Price is required'),
  description: z.string().min(10, 'Description is too short'),
  image: z.any().refine((files) => files?.length > 0, 'Image is required.'),
});

export default function AdminDashboard() {
  const [bikes, setBikes] = useState<Bike[]>(initialBikes);
  const [nextId, setNextId] = useState(bikes.length + 1);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof bikeFormSchema>>({
    resolver: zodResolver(bikeFormSchema),
    defaultValues: { name: '', price: '', description: '' },
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

  function onSubmit(values: z.infer<typeof bikeFormSchema>) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const newBike: Bike = {
        id: nextId,
        name: values.name,
        price: Number(values.price).toLocaleString('en-IN'),
        description: values.description,
        image: e.target?.result as string,
        imageHint: "new motorcycle",
        features: ['New', 'Custom', 'Top Speed'],
      };
      setBikes((prev) => [...prev, newBike]);
      setNextId((prev) => prev + 1);
      toast({ title: 'Success', description: 'Bike added successfully.' });
      form.reset();
      setImagePreview(null);
    };
    reader.readAsDataURL(values.image[0]);
  }

  function deleteBike(id: number) {
    if (window.confirm('Are you sure you want to delete this bike?')) {
      setBikes((prev) => prev.filter((bike) => bike.id !== id));
      toast({ title: 'Success', description: 'Bike deleted successfully.' });
    }
  }

  return (
    <div>
        <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">Admin Panel</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Manage your bike inventory and website content
            </p>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
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
                    <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                        Add Bike
                    </Button>
                    </form>
                </Form>
                </CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Manage Bikes</CardTitle></CardHeader>
                <CardContent className="max-h-[600px] overflow-y-auto">
                <div className="space-y-4">
                    {bikes.length > 0 ? bikes.map(bike => (
                    <div key={bike.id} className="flex items-center gap-4 rounded-md border p-4">
                        <Image src={bike.image} alt={bike.name} width={100} height={75} className="rounded-md object-cover" data-ai-hint={bike.imageHint} />
                        <div className="flex-grow">
                        <h4 className="font-semibold">{bike.name}</h4>
                        <p className="text-sm text-primary">₹{bike.price}</p>
                        <p className="text-xs text-muted-foreground line-clamp-2">{bike.description}</p>
                        </div>
                        <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => deleteBike(bike.id)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                    )) : <p className="py-8 text-center text-muted-foreground">No bikes added yet.</p>}
                </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}