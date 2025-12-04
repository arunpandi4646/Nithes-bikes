'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, Loader2 } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Image from 'next/image';

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
    const invoiceElement = invoiceRef.current;
    if (invoiceElement) {
      try {
        const inputs = Array.from(invoiceElement.querySelectorAll('input'));
        const originalValues: { input: HTMLInputElement, value: string }[] = [];

        // Replace inputs with spans for better PDF rendering
        inputs.forEach(input => {
          originalValues.push({ input, value: input.value });
          const span = document.createElement('span');
          span.textContent = input.value;
          span.className = input.className; // copy classes for styling
          span.style.width = '100%';
          span.style.display = 'inline-block';
          input.parentNode?.replaceChild(span, input);
        });

        const canvas = await html2canvas(invoiceElement, {
          scale: 3, // Increase scale for better quality
          backgroundColor: '#ffffff',
          logging: false,
          useCORS: true,
        });

        // Restore original input fields
        originalValues.forEach(({ input, value }) => {
          // A bit of a hacky way to find the span to replace, but should work for this case
          const span = Array.from(invoiceElement.querySelectorAll('span')).find(s => s.className === input.className && s.textContent === value);
          if (span) {
            span.parentNode?.replaceChild(input, span);
          }
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'pt', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 0;

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

  const renderEditableField = (value: string | number, setter: (value: any) => void, placeholder: string, type: string = "text", isNumeric: boolean = false, className: string = "") => {
    return (
        <input
            type={type}
            value={value}
            onChange={(e) => setter(isNumeric ? parseFloat(e.target.value) || 0 : e.target.value)}
            placeholder={placeholder}
            className={cn("w-full bg-transparent p-1 text-sm outline-none focus:bg-gray-100/50", className)}
        />
    )
  }

  return (
    <div>
      <header className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Invoice Generator</h1>
          <p className="text-muted-foreground">Fill in the details below to generate and download an invoice.</p>
        </div>
        <Button onClick={handleDownload} disabled={loading} className="w-full sm:w-auto">
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
          <CardContent className="p-2 sm:p-6 md:p-8">
            <div ref={invoiceRef} className="bg-white p-8 text-black font-serif">
              {/* Header */}
              <div className="mb-8 text-center">
                  <h2 className="text-3xl font-bold tracking-wider">NITHEESH GARAGE</h2>
                  <div className='flex justify-center'>
                    <p className="text-sm border-b-2 border-dotted border-black inline-block">3, Anna Street, Pallapalayam (PO),</p>
                  </div>
                  <p className="text-sm">Mangalam Road - 641663</p>
                  <p className="text-sm">Phone: 93609 97425</p>
              </div>

              {/* Customer Details */}
              <div className="mb-8">
                <h3 className="text-lg font-bold mb-2">Customer Details</h3>
                <table className="w-full border-collapse border border-black text-sm">
                  <tbody>
                    <tr className="border-b border-black">
                      <td className="w-1/3 border-r border-black p-2 font-medium">Customer Name:</td>
                      <td className="w-2/3 p-0">{renderEditableField(customerName, setCustomerName, 'Enter Name', 'text', false, 'customer-name-field')}</td>
                    </tr>
                    <tr className="border-b border-black">
                      <td className="w-1/3 border-r border-black p-2 font-medium">Address:</td>
                      <td className="w-2/3 p-0">{renderEditableField(address, setAddress, 'Enter Address', 'text', false, 'address-field')}</td>
                    </tr>
                    <tr className="border-b border-black">
                      <td className="w-1/3 border-r border-black p-2 font-medium">Vehicle Number:</td>
                      <td className="w-2/3 p-0">{renderEditableField(vehicleNo, setVehicleNo, 'Enter Vehicle No.', 'text', false, 'vehicle-no-field')}</td>
                    </tr>
                    <tr className="border-b border-black">
                      <td className="w-1/3 border-r border-black p-2 font-medium">Chassis Number:</td>
                      <td className="w-2/3 p-0">{renderEditableField(chassisNo, setChassisNo, 'Enter Chassis No.', 'text', false, 'chassis-no-field')}</td>
                    </tr>
                    <tr className="border-b border-black">
                      <td className="w-1/3 border-r border-black p-2 font-medium">Engine Number:</td>
                      <td className="w-2/3 p-0">{renderEditableField(engineNo, setEngineNo, 'Enter Engine No.', 'text', false, 'engine-no-field')}</td>
                    </tr>
                    <tr>
                      <td className="w-1/3 border-r border-black p-2 font-medium">Timing:</td>
                      <td className="w-2/3 p-0">{renderEditableField(timing, setTiming, 'Enter Timing', 'text', false, 'timing-field')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Payment Details */}
              <div className="mb-8">
                <h3 className="text-lg font-bold mb-2">Payment Details</h3>
                <table className="w-full border-collapse border border-black text-sm">
                  <tbody>
                    <tr className="border-b border-black">
                      <td className="w-1/3 border-r border-black p-2 font-medium">Total Amount:</td>
                      <td className="w-2/3 p-0">{renderEditableField(total, setTotal, '0', 'number', true, 'total-field')}</td>
                    </tr>
                    <tr className="border-b border-black">
                      <td className="w-1/3 border-r border-black p-2 font-medium">Advance Paid:</td>
                      <td className="w-2/3 p-0">{renderEditableField(advance, setAdvance, '0', 'number', true, 'advance-field')}</td>
                    </tr>
                    <tr>
                      <td className="w-1/3 border-r border-black p-2 font-medium">Balance:</td>
                      <td className="w-2/3 p-2 font-bold">₹{balance.toLocaleString('en-IN')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              {/* Terms & Conditions */}
              <div className="mb-16">
                  <h3 className="text-lg font-bold mb-2">Terms & Conditions</h3>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>After the vehicle has been delivered in proper running condition and after the customer has checked and accepted the vehicle, Nitheesh Garage will not be responsible for any further complaints regarding the same issue.</li>
                      <li>Customers must change their vehicle name transfer within 10 days from the delivery date. If not, the garage will not be responsible for any loss, or issues arising thereafter.</li>
                      <li>If you decide to cancel the purchase after paying the advance amount, only 50% of the advance will be refunded.</li>
                  </ul>
              </div>

              {/* Signatures */}
              <div className="flex justify-end">
                <div className="flex flex-col items-center">
                    <div className="relative h-16 w-48">
                      <Image
                        src="https://placehold.co/200x60/black/white?text=Signature"
                        alt="Signature"
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                    <div className='w-full border-t border-black pt-2 text-center'>
                      <p className="font-bold text-sm">NITHEESH GARAGE</p>
                    </div>
                </div>
              </div>

            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}
