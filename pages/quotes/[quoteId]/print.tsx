import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { GetServerSideProps } from 'next';

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
  const partsTotal = quote.parts.reduce((sum: number, p: any) => sum + p.price, 0);
  const grandTotal = (partsTotal + parseFloat(quote.laborCost)).toFixed(2);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white text-black font-sans text-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <Image src="/saxon3.png" alt="Saxon Logo" width={120} height={120} />
        <div className="text-right text-xs">
          <p>Saxon Performance Auto</p>
          <p>Mobile Mechanic & Diagnostics</p>
          <p>support@saxonperformanceautomotive.com</p>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold text-center mb-6">Auto Repair Estimate</h1>

      {/* Customer + Vehicle Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <p><strong>Name:</strong> {quote.customer.name}</p>
        <p><strong>Phone:</strong> {quote.customer.phone}</p>
        <p><strong>Email:</strong> {quote.customer.email || '—'}</p>
        <p><strong>Vehicle:</strong> {quote.customer.vehicle}</p>
        <p><strong>Date:</strong> {new Date(quote.createdAt).toLocaleDateString()}</p>
        <p><strong>VIN:</strong> {quote.customer.vin || '—'}</p>
        <p><strong>Mileage In:</strong> {quote.customer.mileageIn || '—'}</p>
        <p><strong>Mileage Out:</strong> {quote.customer.mileageOut || '—'}</p>
      </div>

      {/* Job Description & Diagnostics */}
      <div className="mb-4">
        <p><strong>Job Description:</strong></p>
        <p className="whitespace-pre-wrap">{quote.jobDescription || '—'}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <p><strong>Inspection Results:</strong></p>
          <p className="whitespace-pre-wrap">{quote.inspection || '—'}</p>
        </div>
        <div>
          <p><strong>Diagnostics Summary:</strong></p>
          <p className="whitespace-pre-wrap">{quote.diagnostics || '—'}</p>
        </div>
      </div>

      {/* Parts Table */}
      <h2 className="text-lg font-semibold mt-6 mb-2">Parts / Materials</h2>
      <table className="w-full border mb-6 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 text-left">Part</th>
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

      {/* Totals */}
      <div className="text-right mb-4 space-y-1">
        <p><strong>Labor Cost:</strong> ${parseFloat(quote.laborCost).toFixed(2)}</p>
        <p><strong>Parts Total:</strong> ${partsTotal.toFixed(2)}</p>
        <p className="text-lg font-bold"><strong>Total Estimate:</strong> ${grandTotal}</p>
      </div>

      {/* Notes */}
      {quote.notes && (
        <div className="mb-6">
          <p className="font-semibold">Additional Notes:</p>
          <p className="whitespace-pre-wrap">{quote.notes}</p>
        </div>
      )}

      {/* Warranty Info */}
      <div className="bg-gray-50 border rounded p-4 mb-6 text-sm">
        <h3 className="font-semibold mb-2">Warranty & Parts Notice</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Labor is warrantied for 12 months or 12,000 miles – whichever comes first.</li>
          <li>OEM parts are used when available. Aftermarket alternatives may vary in cost and quality.</li>
          <li>We disclose part choices and provide options based on availability and customer preference.</li>
        </ul>
      </div>

      {/* Signature Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div>
          <p className="font-semibold mb-1">Customer Signature</p>
          {quote.signature ? (
            <img src={quote.signature} alt="Customer Signature" className="max-h-24" />
          ) : (
            <p className="border-b border-gray-400 h-8 w-full"></p>
          )}
          <p className="text-sm mt-1">Date: ____________________</p>
        </div>
        <div>
          <p className="font-semibold mb-1">Technician Signature</p>
          <p className="border-b border-gray-400 h-8 w-full"></p>
          <p className="text-sm mt-1">ASE Certified | Saxon Performance Auto</p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center text-sm text-gray-700 border-t pt-4">
        <p>Thank you for choosing <strong>Saxon Performance Auto</strong> – Mobile Mechanic & Diagnostics</p>
        <p>Fast, trusted service brought right to your driveway.</p>
      </div>
    </div>
  );
}
