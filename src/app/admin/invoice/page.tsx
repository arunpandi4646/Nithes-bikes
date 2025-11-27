'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Download, Loader2 } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface Details {
  customerName: string;
  address: string;
  vehicleNumber: string;
  chassisNumber: string;
  engineNumber: string;
  timing: string;
  totalAmount: string;
  advancePaid: string;
  balance: string;
}

const WavyUnderline = () => (
  <svg
    className="w-full"
    height="10"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 10"
    preserveAspectRatio="none"
  >
    <path
      d="M0,5 Q5,0 10,5 T20,5 Q25,0 30,5 T40,5 Q45,0 50,5 T60,5 Q65,0 70,5 T80,5 Q85,0 90,5 T100,5"
      stroke="black"
      strokeWidth="1"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);


export default function InvoicePage() {
  const [details, setDetails] = useState<Details>({
    customerName: '',
    address: '',
    vehicleNumber: '',
    chassisNumber: '',
    engineNumber: '',
    timing: '',
    totalAmount: '',
    advancePaid: '',
    balance: '',
  });
  const [loading, setLoading] = useState(false);
  const invoiceRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetails((prev) => {
        const newDetails = { ...prev, [name]: value };
        
        if (name === 'totalAmount' || name === 'advancePaid') {
            const total = parseFloat(newDetails.totalAmount) || 0;
            const advance = parseFloat(newDetails.advancePaid) || 0;
            const balance = total - advance;
            newDetails.balance = balance >= 0 ? balance.toFixed(2) : '0.00';
        }

        return newDetails;
    });
  };

  const handleDownload = async () => {
    if (!invoiceRef.current) return;
    setLoading(true);

    try {
        const canvas = await html2canvas(invoiceRef.current, {
            scale: 2,
            useCORS: true, 
            backgroundColor: '#ffffff',
        });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: [canvas.width, canvas.height],
        });

        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save(`invoice-${details.customerName || 'download'}.pdf`);

    } catch(err) {
        console.error("Failed to generate PDF", err);
    } finally {
        setLoading(false);
    }
  };

  const renderInputField = (name: keyof Details, label: string) => (
    <div className="flex items-center border-b border-gray-400 py-1">
      <label className="w-1/3 flex-shrink-0 font-medium text-sm pr-2">{label}:</label>
      <Input
        name={name}
        value={details[name]}
        onChange={handleInputChange}
        className="h-auto flex-grow border-0 bg-transparent p-0 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  );
  
  const renderPaymentField = (name: keyof Details, label: string) => (
    <div className="flex items-center border-b border-gray-400 py-1">
      <span className="w-1/3 flex-shrink-0 font-medium text-sm pr-2 flex items-center gap-2">
         <span className='font-bold text-lg'>■</span> {label}:
      </span>
      <Input
        name={name}
        value={details[name]}
        onChange={handleInputChange}
        className="h-auto flex-grow border-0 bg-transparent p-0 text-sm font-semibold focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  );

  return (
    <div>
      <header className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Invoice Generator</h1>
          <p className="text-muted-foreground">Fill in the details below and download the invoice as a PDF.</p>
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
        <Card>
          <CardContent className="p-4 sm:p-6 md:p-8">
            <div ref={invoiceRef} className="bg-white p-8 font-serif text-black">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold tracking-wider">NITHEESH GARAGE</h1>
                <div className="mx-auto max-w-xs">
                    <WavyUnderline />
                </div>
                <p className="text-sm mt-2">3, Anna Street, Pallapalayam (PO), Mangalam Road - 641663</p>
                <p className="text-sm">Phone: 93609 997425</p>
              </div>

              <div className="mb-8">
                <h2 className="text-lg font-bold mb-2">Customer Details</h2>
                <div className="grid gap-y-2 border border-gray-400 p-2">
                    {renderInputField('customerName', 'Customer Name')}
                    {renderInputField('address', 'Address')}
                    {renderInputField('vehicleNumber', 'Vehicle Number')}
                    {renderInputField('chassisNumber', 'Chassis Number')}
                    {renderInputField('engineNumber', 'Engine Number')}
                    {renderInputField('timing', 'Timing')}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-lg font-bold mb-2">Payment Details</h2>
                <div className="grid gap-y-2 border border-gray-400 p-2">
                    {renderPaymentField('totalAmount', 'Total Amount')}
                    {renderPaymentField('advancePaid', 'Advance Paid')}
                    {renderPaymentField('balance', 'Balance')}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-lg font-bold mb-2">Terms & Conditions</h2>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>After the vehicle has been delivered in proper running condition and after the customer has checked and accepted the vehicle, Nitheesh Garage will not be responsible for any further complaints regarding the same issue.</li>
                  <li>Customers must change their vehicle name transfer within 10 days from the delivery date. If not, the garage will not be responsible for any loss, or issues arising thereafter.</li>
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4 border border-gray-400">
                <div className="p-2 border-r border-gray-400">
                    <p className="text-sm font-medium">Customer signature:</p>
                    <div className="h-16"></div>
                </div>
                <div className="p-2">
                    <p className="text-sm font-medium">Staff signature</p>
                    <div className="h-16 flex items-end justify-start">
                        <p className="text-sm font-medium">(NITHEESH GARAGE):</p>
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
