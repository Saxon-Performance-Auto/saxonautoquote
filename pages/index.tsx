// pages/index.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function DashboardHome() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-gray-50">
      {/* Centered Logo */}
      <Image src="/saxonlogo.png" alt="Saxon Logo" width={160} height={160} className="mb-6" />

      <h1 className="text-3xl font-bold mb-10 text-center">Saxon Auto Quotes</h1>

      {/* Action Buttons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-4xl">
        {/* NEW Column */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-center">➕ New</h2>
          <div className="space-y-3">
            <Link href="/quote">
              <button className="w-full bg-blue-600 text-white py-2 rounded">New Quote</button>
            </Link>
            <Link href="/new/invoice">
              <button className="w-full bg-blue-600 text-white py-2 rounded">New Invoice</button>
            </Link>
            <Link href="/new/contact">
              <button className="w-full bg-blue-600 text-white py-2 rounded">New Contact</button>
            </Link>
            <Link href="/new/request">
              <button className="w-full bg-blue-600 text-white py-2 rounded">Service Request</button>
            </Link>
            <Link href="/new/part">
              <button className="w-full bg-blue-600 text-white py-2 rounded">Add Part / Price</button>
            </Link>
          </div>
        </div>

        {/* EXISTING Column */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-center">📁 Existing</h2>
          <div className="space-y-3">
            <Link href="/search/quotes">
              <button className="w-full bg-gray-700 text-white py-2 rounded">View Quotes</button>
            </Link>
            <Link href="/search/invoices">
              <button className="w-full bg-gray-700 text-white py-2 rounded">View Invoices</button>
            </Link>
            <Link href="/search/contacts">
              <button className="w-full bg-gray-700 text-white py-2 rounded">Search Contacts</button>
            </Link>
            <Link href="/search/requests">
              <button className="w-full bg-gray-700 text-white py-2 rounded">View Requests</button>
            </Link>
            <Link href="/search/parts">
              <button className="w-full bg-gray-700 text-white py-2 rounded">Lookup Part / Price</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
