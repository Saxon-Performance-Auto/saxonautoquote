// pages/index.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <div className="max-w-5xl w-full px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-red-700 mb-1">Saxon Performance Auto</h1>
        <h2 className="text-lg text-gray-600 mb-10">Auto Quotes Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* New Section */}
          <section>
            <h3 className="text-xl font-semibold mb-4">New</h3>
            <div className="flex flex-col space-y-3">
              <DashboardLink href="/quote" text="New Quote" />
              <DashboardLink href="/new/invoice" text="New Invoice" />
              <DashboardLink href="/new/request" text="Service Request" />
              <DashboardLink href="/new/contact" text="Add Contact" />
              <DashboardLink href="/new/part" text="New Part Entry" />
            </div>
          </section>

          {/* Search Section */}
          <section>
            <h3 className="text-xl font-semibold mb-4">Search</h3>
            <div className="flex flex-col space-y-3">
              <DashboardLink href="/search/quotes" text="Quotes" />
              <DashboardLink href="/search/invoices" text="Invoices" />
              <DashboardLink href="/search/requests" text="Requests" />
              <DashboardLink href="/search/contacts" text="Contacts" />
              <DashboardLink href="/search/parts" text="Parts" />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function DashboardLink({ href, text }: { href: string; text: string }) {
  return (
    <Link
      href={href}
      className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded shadow text-sm font-medium text-center"
    >
      {text}
    </Link>
  );
}
