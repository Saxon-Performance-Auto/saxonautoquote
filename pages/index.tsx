// pages/index.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 text-center">
      <img src="/saxonlogo.png" alt="Saxon Logo" className="w-32 h-32" />
      <h1 className="text-3xl font-bold text-red-700">Saxon Auto Quotes</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-md mt-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">New</h2>
          <div className="flex flex-col space-y-2">
            <Link href="/quote" className="bg-blue-600 text-white py-2 rounded text-center">New Quote</Link>
            <Link href="/new/invoice" className="bg-blue-600 text-white py-2 rounded text-center">New Invoice</Link>
            <Link href="/new/request" className="bg-blue-600 text-white py-2 rounded text-center">Service Request</Link>
            <Link href="/new/contact" className="bg-blue-600 text-white py-2 rounded text-center">Add Contact</Link>
            <Link href="/new/part" className="bg-blue-600 text-white py-2 rounded text-center">New Part Entry</Link>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Search</h2>
          <div className="flex flex-col space-y-2">
            <Link href="/search/quotes" className="bg-gray-700 text-white py-2 rounded text-center">Search Quotes</Link>
            <Link href="/search/invoices" className="bg-gray-700 text-white py-2 rounded text-center">Search Invoices</Link>
            <Link href="/search/requests" className="bg-gray-700 text-white py-2 rounded text-center">Search Requests</Link>
            <Link href="/search/contacts" className="bg-gray-700 text-white py-2 rounded text-center">Search Contacts</Link>
            <Link href="/search/parts" className="bg-gray-700 text-white py-2 rounded text-center">Search Parts</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
