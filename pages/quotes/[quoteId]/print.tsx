// pages/quotes/[quoteId]/print.tsx
import Image from 'next/image';
import { PrismaClient } from '@prisma/client';
import { GetServerSideProps } from 'next';

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
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white text-black font-sans text-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <Image src="/saxon3.png" alt="Saxon Logo" width={120} height={120} />
        <div className="space-x-4">
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

      {/* Description */}
      <div className="mb-4 whitespace-pre-wrap">
        <p className="font-semibold">Job Description:</p>
        <p>{quote.jobDescription}</p>
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

      {/* Totals */}
      <div className="text-right space-y-1">
        <p><strong>Labor Cost:</strong> ${quote.laborCost.toFixed(2)}</p>
        <p className="text-lg font-bold"><strong>Total Estimate:</strong> ${quote.totalCost.toFixed(2)}</p>
      </div>

      {/* Signature */}
      {quote.signature && (
        <div className="mt-6">
          <p><strong>Customer Signature:</strong> {quote.signature}</p>
        </div>
      )}
    </div>
  );
}
