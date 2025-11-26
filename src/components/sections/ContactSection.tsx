'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

const contactInfo = [
    { icon: MapPin, title: "Our Location", content: "Nitheesh Garage, Pallapalayam, Tiruppur" },
    { icon: Phone, title: "Phone Number", content: "+91 93609 97425", href: "tel:+919360997425" },
    { icon: Mail, title: "Email Address", content: "nitheeshgarage@gmail.com", href: "mailto:nitheeshgarage@gmail.com" },
    { icon: Clock, title: "Working Hours", content: "Mon - Sat: 9:00 AM - 8:00 PM" },
]

export default function ContactSection() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '', phone: '', message: '' },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: 'Message Sent!',
      description: 'Thank you for contacting us. We will get back to you soon.',
    });
    form.reset();
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">Contact Us</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Get in touch with us for any queries or services
          </p>
        </div>
        <div className="grid gap-12 lg:grid-cols-2">
            <Card className="bg-nav-background text-white shadow-lg">
                <CardContent className="p-8">
                    <h3 className="mb-6 text-2xl font-bold">Get In Touch</h3>
                    <div className="space-y-6">
                        {contactInfo.map((item, index) => (
                            <div key={index} className="flex items-start gap-4">
                                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white/10">
                                    <item.icon className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-semibold">{item.title}</h4>
                                    {item.href ? (
                                        <Link href={item.href} className="text-gray-300 transition-colors hover:text-primary">
                                            {item.content}
                                        </Link>
                                    ) : (
                                        <p className="text-gray-300">{item.content}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

          <Card className="shadow-lg">
            <CardContent className="p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="Your Phone Number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="How can we help you?" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                    Send Message
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
