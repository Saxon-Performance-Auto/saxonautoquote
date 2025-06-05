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

