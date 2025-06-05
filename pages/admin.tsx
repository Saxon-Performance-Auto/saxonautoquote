import { useState, useEffect } from 'react';
import type { Quote, Customer } from '../lib/types';

type QuoteWithCustomer = Quote & { customer: Customer };

export default function AdminDashboard() {
  const [quotes, setQuotes] = useState<QuoteWithCustomer[]>([]);

  useEffect(() => {
    fetch('/api/quotes')
      .then(res => res.json())
      .then(data => setQuotes(data));
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Quote Dashboard</h1>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Customer</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Vehicle</th>
            <th className="border px-4 py-2">Total Estimate</th>
            <th className="border px-4 py-2">Created</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {quotes.map((q) => (
            <tr key={q.id}>
              <td className="border px-4 py-2">{q.customer.name}</td>
              <td className="border px-4 py-2">{q.customer.phone}</td>
              <td className="border px-4 py-2">{q.customer.vehicle}</td>
              <td className="border px-4 py-2">${q.total_cost.toFixed(2)}</td>
              <td className="border px-4 py-2">
                {new Date(q.createdAt).toLocaleDateString()}
              </td>
              <td className="border px-4 py-2">
                <a
                  href={`/api/generate-invoice?id=${q.id}`}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Invoice PDF
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
