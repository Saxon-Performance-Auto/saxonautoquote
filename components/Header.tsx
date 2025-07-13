import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-white border-b shadow-sm p-4 text-center flex flex-col items-center space-y-2 md:flex-row md:justify-between md:space-y-0 md:px-8">
      <div className="flex items-center space-x-4">
        <Image src="/saxonlogo.png" alt="Saxon Logo" width={60} height={60} />
        <span className="text-2xl font-bold text-red-700">Saxon Performance Auto</span>
      </div>
    </header>
  );
}
