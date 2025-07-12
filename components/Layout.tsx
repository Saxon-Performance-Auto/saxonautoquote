// components/Layout.tsx
import Header from './Header';
import Head from 'next/head';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Saxon Auto Quotes</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <Header />
        <main className="px-4 py-6 max-w-5xl mx-auto">{children}</main>
      </div>
    </>
  );
}
