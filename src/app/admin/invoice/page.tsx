'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';

export default function InvoicePage() {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    // This function will no longer work as the invoice content is removed.
    setLoading(true);
    console.log("Invoice content has been removed.");
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div>
      <header className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Invoice Generator</h1>
          <p className="text-muted-foreground">The invoice generator has been removed.</p>
        </div>
        <Button onClick={handleDownload} disabled={loading}>
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Download className="mr-2 h-4 w-4" />
          )}
          Download Invoice
        </Button>
      </header>

      <main className="mt-8">
        {/* The Card and CardContent with the invoice generator has been removed. */}
      </main>
    </div>
  );
}
