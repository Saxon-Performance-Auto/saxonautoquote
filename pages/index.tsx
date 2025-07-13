<<<<<<< HEAD
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
=======
import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    vehicle: '',
    jobDescription: '',
    laborCost: '',
    parts: [{ name: '', price: '' }],
  });

  const handlePartChange = (index, key, value) => {
    const newParts = [...formData.parts];
    newParts[index][key] = value;
    setFormData({ ...formData, parts: newParts });
  };

  const addPart = () => {
    setFormData({ ...formData, parts: [...formData.parts, { name: '', price: '' }] });
  };

  const removePart = (index) => {
    const newParts = formData.parts.filter((_, i) => i !== index);
    setFormData({ ...formData, parts: newParts });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const result = await res.json();
    alert(result.message);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Auto Repair Quote Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input placeholder="Customer Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full border p-2" required />
        <input placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full border p-2" required />
        <input placeholder="Email (optional)" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full border p-2" />
        <input placeholder="Vehicle Info (Year, Make, Model, VIN)" value={formData.vehicle} onChange={e => setFormData({ ...formData, vehicle: e.target.value })} className="w-full border p-2" required />
        <textarea placeholder="Job Description" value={formData.jobDescription} onChange={e => setFormData({ ...formData, jobDescription: e.target.value })} className="w-full border p-2" required />
        <input placeholder="Estimated Labor Cost" type="number" value={formData.laborCost} onChange={e => setFormData({ ...formData, laborCost: e.target.value })} className="w-full border p-2" required />

        <h2 className="font-semibold">Parts</h2>
        {formData.parts.map((part, index) => (
          <div key={index} className="flex space-x-2">
            <input placeholder="Part Name" value={part.name} onChange={e => handlePartChange(index, 'name', e.target.value)} className="flex-1 border p-2" required />
            <input placeholder="Part Price" type="number" value={part.price} onChange={e => handlePartChange(index, 'price', e.target.value)} className="w-24 border p-2" required />
            <button type="button" onClick={() => removePart(index)} className="text-red-500">✕</button>
          </div>
        ))}
        <button type="button" onClick={addPart} className="text-blue-500">+ Add Part</button>

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Submit Quote</button>
      </form>
    </div>
  );
}

>>>>>>> 24386c5 (added files)
