'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, Loader2 } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Input } from '@/components/ui/input';

export default function InvoicePage() {
  const [loading, setLoading] = useState(false);
  const [customerName, setCustomerName] = useState('John Doe');
  const [address, setAddress] = useState('123 Main St, Anytown, USA');
  const [vehicleNo, setVehicleNo] = useState('TN 01 AB 1234');
  const [chassisNo, setChassisNo] = useState('XXXXXXXXXXXXXXXXX');
  const [engineNo, setEngineNo] = useState('XXXXXXXXXXXX');
  const [timing, setTiming] = useState('10:00 AM');
  const [total, setTotal] = useState(50000);
  const [advance, setAdvance] = useState(10000);

  const invoiceRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    setLoading(true);
    if (invoiceRef.current) {
      try {
        const canvas = await html2canvas(invoiceRef.current, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'px', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 30;

        pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
        pdf.save(`invoice-${customerName.replace(/\s/g, '_')}-${new Date().toISOString().slice(0, 10)}.pdf`);
      } catch (error) {
        console.error("Error generating PDF:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const balance = total - advance;

  return (
    <div>
      <header className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Invoice Generator</h1>
          <p className="text-muted-foreground">Fill in the details below to generate and download an invoice.</p>
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
        <Card className="shadow-lg">
          <CardContent ref={invoiceRef} className="p-4 sm:p-6 md:p-8">
            <div className="text-center">
              <h2 className="text-xl font-bold uppercase tracking-widest text-primary">NITHEESH GARAGE</h2>
              <p className="text-sm text-muted-foreground">3, Anna Street, Pallapalayam (PO), Mangalam Road - 641663</p>
              <p className="text-sm text-muted-foreground">Phone: 93609 97425</p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-4 border-y border-dashed py-6">
              <div>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Customer Details</h3>
                <div className="grid grid-cols-[max-content_1fr] items-center gap-x-4 gap-y-1 text-sm">
                  <label htmlFor="customerName" className="font-medium">Customer Name:</label>
                  <Input id="customerName" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="h-8 border-b border-dashed bg-transparent" />

                  <label htmlFor="address" className="font-medium">Address:</label>
                  <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} className="h-8 border-b border-dashed bg-transparent" />
                  
                  <label htmlFor="vehicleNo" className="font-medium">Vehicle Number:</label>
                  <Input id="vehicleNo" value={vehicleNo} onChange={(e) => setVehicleNo(e.target.value)} className="h-8 border-b border-dashed bg-transparent" />
                </div>
              </div>
              <div className="border-l border-dashed pl-8">
                <h3 className="invisible mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Vehicle Details</h3>
                <div className="grid grid-cols-[max-content_1fr] items-center gap-x-4 gap-y-1 text-sm">
                  <label htmlFor="chassisNo" className="font-medium">Chassis Number:</label>
                  <Input id="chassisNo" value={chassisNo} onChange={(e) => setChassisNo(e.target.value)} className="h-8 border-b border-dashed bg-transparent" />

                  <label htmlFor="engineNo" className="font-medium">Engine Number:</label>
                  <Input id="engineNo" value={engineNo} onChange={(e) => setEngineNo(e.target.value)} className="h-8 border-b border-dashed bg-transparent" />
                  
                  <label htmlFor="timing" className="font-medium">Timing:</label>
                  <Input id="timing" value={timing} onChange={(e) => setTiming(e.target.value)} className="h-8 border-b border-dashed bg-transparent" />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <div className="w-full max-w-sm space-y-2 text-sm">
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Payment Details</h3>
                <div className="flex items-center justify-between">
                  <label htmlFor="total" className="font-medium">■ Total Amount:</label>
                  <Input id="total" type="number" value={total} onChange={(e) => setTotal(parseFloat(e.target.value))} className="h-8 w-32 border-b border-dashed bg-transparent text-right font-semibold" />
                </div>
                <div className="flex items-center justify-between">
                  <label htmlFor="advance" className="font-medium">■ Advance Paid:</label>
                  <Input id="advance" type="number" value={advance} onChange={(e) => setAdvance(parseFloat(e.target.value))} className="h-8 w-32 border-b border-dashed bg-transparent text-right" />
                </div>
                <div className="flex items-center justify-between border-t border-dashed pt-2 font-bold">
                  <span>■ Balance:</span>
                  <span>₹{balance.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <div className="mt-12 text-xs text-muted-foreground">
              <h4 className="mb-2 font-semibold uppercase tracking-wider text-foreground">Terms & Conditions</h4>
              <ol className="list-inside list-decimal space-y-1">
                <li>After the vehicle has been delivered in proper running condition and after the customer has checked and accepted the vehicle, Nitheesh Garage will not be responsible for any further complaints regarding the same issue.</li>
                <li>Customers must change their vehicle name transfer within 10 days from the delivery date. If not, the garage will not be responsible for any loss, or issues arising thereafter.</li>
              </ol>
            </div>

            <div className="mt-24 grid grid-cols-2 gap-8 pt-8">
              <div className="border-t pt-2 text-center text-sm">
                Customer signature:
              </div>
              <div className="border-t pt-2 text-center text-sm">
                Staff signature (NITHEESH GARAGE):
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
