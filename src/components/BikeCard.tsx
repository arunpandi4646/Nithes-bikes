'use client';

import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import type { Bike } from '@/lib/types';
import { useAppContext } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';

interface BikeCardProps {
  bike: Bike;
}

export default function BikeCard({ bike }: BikeCardProps) {
  const { user, setLoginModalOpen } = useAppContext();
  const { toast } = useToast();

  const handleInquiry = () => {
    if (!user) {
      setLoginModalOpen(true);
      toast({ title: 'Login Required', description: 'Please log in to inquire about this bike.' });
    } else {
      toast({
        title: 'Inquiry Sent!',
        description: `Our team will contact you shortly about the ${bike.name}.`,
      });
    }
  };
  
  const showDetails = () => {
    toast({ title: `Details for ${bike.name}`, description: 'This feature is coming soon!'});
  }

  return (
    <Card className="flex flex-col overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-hover">
      <CardHeader className="relative p-0">
        <Badge className="absolute right-4 top-4 z-10">Available</Badge>
        <div className="overflow-hidden">
          <Image
            src={bike.image}
            alt={bike.name}
            width={600}
            height={400}
            className="h-56 w-full object-cover transition-transform duration-300 hover:scale-105"
            data-ai-hint={bike.imageHint}
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-6">
        <CardTitle className="mb-2 text-xl">{bike.name}</CardTitle>
        <p className="mb-4 text-xl font-bold text-primary">₹{Number(bike.price).toLocaleString('en-IN')}</p>
        <div className="mb-4 flex flex-wrap gap-x-4 gap-y-2">
          {bike.features?.map((feature, index) => (
            <div key={index} className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Check className="h-4 w-4 text-green-500" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">{bike.description}</p>
      </CardContent>
      <CardFooter className="flex gap-2 p-6 pt-0">
        <Button className="flex-1" onClick={handleInquiry}>Inquire Now</Button>
        <Button variant="outline" className="flex-1" onClick={showDetails}>View Details</Button>
      </CardFooter>
    </Card>
  );
}
