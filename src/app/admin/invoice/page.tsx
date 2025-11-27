'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export default function InvoicePage() {
  return (
    <div>
        <header className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                Invoices
            </h1>
            <p className="text-muted-foreground">
                Create and manage customer invoices. This feature is coming soon.
            </p>
            </div>
        </header>

        <main className="mt-8">
            <div className="flex min-h-[400px] items-center justify-center rounded-lg border-2 border-dashed border-border">
                <div className="flex flex-col items-center text-center text-muted-foreground">
                    <FileText className="h-16 w-16" />
                    <h2 className="mt-6 text-xl font-semibold">Invoice Management Coming Soon</h2>
                    <p className="mt-2 max-w-xs">
                        This section is under construction. Soon you'll be able to create, send, and track invoices here.
                    </p>
                </div>
            </div>
        </main>
    </div>
  );
}
