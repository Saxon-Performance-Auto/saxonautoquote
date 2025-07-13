import Image from 'next/image';
import { PrismaClient } from '@prisma/client';
import { GetServerSideProps } from 'next';
import SignaturePad from '../components/SignaturePad';
import { useRef } from 'react';

const prisma = new PrismaClient();

export const getServerSideProps: GetServerSideProps = async (context) => {
  const quoteId = Number(context.params?.quoteId);
  const quote = await prisma.quote.findUnique({
    where: { id: quoteId },
    include: {
      customer: true,
      parts: true,
    },
  });

  if (!quote) return { notFound: true };
  return { props: { quote } };
};

export default function PrintableQuote({ quote }: any) {
  const sigCanvas = useRef<any>(null);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white text-black font-sans text-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <Image src="/saxon3.png" alt="Saxon Logo" width={120} height={120} />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => window.print()}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Print
        </button>
        <button
          onClick={() => alert('Email function coming soon')}
          className="bg-gray-600 text-white px-4 py-2 rounded"
        >
          Email Quote
        </button>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold text-center mb-6">
        Auto Repair Estimate
      </h1>

      {/* Customer + Quote Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <p><strong>Customer:</strong> {quote.customer.name}</p>
        <p><strong>Phone:</strong> {quote.customer.phone}</p>
        <p><strong>Email:</strong> {quote.customer.email || '—'}</p>
        <p><strong>Vehicle:</strong> {quote.customer.vehicle}</p>
        <p><strong>Date:</strong> {new Date(quote.createdAt).toLocaleDateString()}</p>
      </div>

      {/* Parts Table */}
      <h2 className="text-lg font-semibold mt-6 mb-2">Parts</h2>
      <table className="w-full border mb-6">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="border p-2">Part</th>
            <th className="border p-2 text-right">Price</th>
          </tr>
        </thead>
        <tbody>
          {quote.parts.map((part: any, idx: number) => (
            <tr key={idx}>
              <td className="border p-2">{part.name}</td>
              <td className="border p-2 text-right">${part.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Vehicle & Diagnostic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <p><strong>VIN:</strong> {quote.customer.vin || '—'}</p>
        <p><strong>Mileage In:</strong> {quote.customer.mileageIn || '—'}</p>
        <p><strong>Mileage Out:</strong> {quote.customer.mileageOut || '—'}</p>
      </div>

      {/* Additional Notes Section */}
      <div className="mb-6 whitespace-pre-wrap">
        <p className="font-semibold">Additional Notes:</p>
        <p>{quote.notes || '—'}</p>
      </div>

      {/* Warranty & OEM Clarifications */}
      <div className="bg-gray-50 border rounded p-4 mb-6 text-sm">
        <h3 className="font-semibold mb-2">Warranty & Parts Notice</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Labor is warrantied for 12 months or 12,000 miles – whichever comes first.</li>
          <li>Parts used may be Original Equipment Manufacturer (OEM) or aftermarket. OEM parts typically offer higher reliability but may increase cost.</li>
          <li>Aftermarket parts may vary in quality and warranty terms; we select reputable brands when used.</li>
          <li>Customer will be advised prior to use of non-OEM parts if necessary.</li>
        </ul>
      </div>

      {/* Totals + Additional Charges */}
      <div className="text-right mb-4 space-y-1">
        <p><strong>Labor Cost:</strong> ${quote.laborCost.toFixed(2)}</p>
        <p><strong>Parts Total:</strong> ${quote.parts.reduce((sum: number, p: any) => sum + p.price, 0).toFixed(2)}</p>
        <p><strong>Additional Charges:</strong> $0.00</p>
        <p className="text-lg font-bold"><strong>Total Estimate:</strong> ${quote.totalCost.toFixed(2)}</p>
      </div>

      {/* Signatures */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div>
          <p className="font-semibold mb-1">Customer Signature</p>
          <p className="border-b border-gray-400 h-8 w-full"></p>
          <p className="text-sm mt-1">Date: ____________________</p>
        </div>
        <div>
          <p className="font-semibold mb-1">Technician Signature</p>
          <p className="border-b border-gray-400 h-8 w-full"></p>
          <p className="text-sm mt-1">ASE Certified | Saxon Performance Auto</p>
        </div>
      </div>

      {/* Display customer’s saved signature */}
      {quote.signature && (
        <img src={quote.signature} alt="Customer Signature" className="mt-4 max-h-24" />
      )}

      {/* Optional SignaturePad */}
      <div className="mb-6">
        <label className="font-semibold block mb-2">Customer Signature</label>
        <SignaturePad
          ref={sigCanvas}
          canvasProps={{
            className: 'border border-gray-400 rounded w-full h-32'
          }}
        />
        <button
          type="button"
          onClick={() => sigCanvas.current?.clear()}
          className="mt-2 text-sm text-blue-600 underline"
        >
          Clear Signature
        </button>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center text-sm text-gray-700 border-t pt-4">
        <p>Thank you for choosing <strong>Saxon Performance Auto – Mobile Mechanic & Diagnostics</strong>.</p>
        <p>Fast, trusted service brought right to your driveway.</p>
      </div>
    </div>
  );
}
