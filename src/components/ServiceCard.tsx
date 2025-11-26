'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Service } from '@/lib/types';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const Icon = service.icon;
  return (
    <Card className="group flex h-full flex-col items-center text-center shadow-md transition-transform duration-300 hover:-translate-y-2 hover:shadow-hover">
      <CardHeader className="items-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
          <Icon className="h-10 w-10 text-primary" />
        </div>
      </CardHeader>
      <CardContent className="flex flex-grow flex-col items-center">
        <CardTitle className="mb-2 text-xl">{service.title}</CardTitle>
        <p className="text-muted-foreground">{service.description}</p>
      </CardContent>
    </Card>
  );
}
