import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800">
      {/* Header */}
      <header className="flex items-center justify-between px-4 md:px-6 py-3 shadow bg-white">
        <Link href="/" className="flex items-center space-x-3">
          <Image src="/saxonlogo.png" alt="Logo" width={40} height={40} className="rounded" />
          <h1 className="text-lg md:text-xl font-bold text-red-700 leading-tight">
            Saxon Performance Auto
          </h1>
        </Link>
        {/* Future top nav or actions can go here */}
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4 md:p-6">{children}</main>

      {/* Footer */}
      <footer className="text-center py-4 text-sm text-gray-500 border-t bg-white">
        © {new Date().getFullYear()} Saxon Performance Automotive — All rights reserved
      </footer>
    </div>
  );
}
