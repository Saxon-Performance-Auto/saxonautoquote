// pages/search.tsx
import { useState } from 'react';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/search?query=${query}`);
    const data = await res.json();
    setResults(data.customers || []);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Search Customer</h1>
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          type="text"
          className="border p-2 flex-1"
          placeholder="Enter phone number or name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Search</button>
      </form>

      {results.length > 0 && (
        <div className="space-y-4">
          {results.map((c) => (
            <div key={c.id} className="border p-4">
              <p><strong>{c.name}</strong> – {c.phone}</p>
              <p>Email: {c.email}</p>
              <p>Vehicle: {c.vehicle}</p>
              <ul className="list-disc ml-4 mt-2">
                {c.quotes.map((q: any) => (
                  <li key={q.id}>
                    <a className="text-blue-700 underline" href={`/replays/${q.id}/pdf`} target="_blank" rel="noreferrer">
                      View Quote #{q.id} – {new Date(q.createdAt).toLocaleDateString()}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
