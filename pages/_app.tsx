import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Header from '../components/Header';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header />
      <main className="p-4">
        <Component {...pageProps} />
      </main>
    </div>
  );
}