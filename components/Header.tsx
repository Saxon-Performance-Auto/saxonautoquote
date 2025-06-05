import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-md p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Image src="/saxonlogo.png" alt="Saxon Logo" width={50} height={50} />
        <span className="text-xl font-bold text-red-700">Saxon Auto Quotes</span>
      </div>
      <nav className="space-x-4">
        <Link href="/" className="text-blue-600 hover:underline">New Quote</Link>
        <Link href="/admin" className="text-blue-600 hover:underline">Admin Dashboard</Link>
      </nav>
    </header>
  );
}