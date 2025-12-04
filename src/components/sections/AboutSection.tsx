'use client';

import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';

const aboutImageUrl = "https://res.cloudinary.com/dry3pzan6/image/upload/v1764866072/ead9ydgmr7wotgexzdp7.jpg";

const features = [
  'Wide selection of bikes from leading brands',
  'Experienced and certified mechanics',
  'Competitive pricing and flexible payment options',
  'Genuine spare parts and accessories',
];

export default function AboutSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">About Us</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Learn more about our journey and commitment to excellence
          </p>
        </div>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="overflow-hidden rounded-lg shadow-hover">
            <Image
              src={aboutImageUrl}
              alt="Nitheesh Garage Workshop"
              width={800}
              height={600}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              data-ai-hint="motorcycle workshop"
            />
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold text-foreground">Welcome to Nitheesh Garage</h3>
              <p className="mt-2 text-muted-foreground">
                Established with a passion for motorcycles and a commitment to excellence, Nitheesh Garage has
                been serving bike enthusiasts for over a decade. We are your trusted partner for all two-wheeler
                needs.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-foreground">Our Mission</h3>
              <p className="mt-2 text-muted-foreground">
                To provide top-quality bikes, exceptional service, and expert advice to every customer. We
                believe in building long-term relationships based on trust, transparency, and complete
                satisfaction.
              </p>
            </div>
            <div className="space-y-3 pt-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
