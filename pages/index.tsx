import { useState } from 'react';

export default function QuoteForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    vehicle: '',
    jobDescription: '',
    laborCost: '',
    parts: [{ part_name: '', part_price: '' }],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

const handlePartChange = (index: number, key: string, value: string | number) => {
  const newParts = [...formData.parts];
  if (key === 'part_price') {
    newParts[index][key] = Number(value);
  } else {
    newParts[index][key] = String(value);
  }
  setFormData({ ...formData, parts: newParts });
};

  const addPart = () => {
    setFormData(prev => ({
      ...prev,
      parts: [...prev.parts, { part_name: '', part_price: '' }],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    alert(data.message);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Create Repair Quote</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="border p-2 w-full" name="name" placeholder="Customer Name" onChange={handleChange} required />
        <input className="border p-2 w-full" name="phone" placeholder="Phone" onChange={handleChange} required />
        <input className="border p-2 w-full" name="email" placeholder="Email" onChange={handleChange} />
        <input className="border p-2 w-full" name="vehicle" placeholder="Vehicle Info" onChange={handleChange} required />
        <textarea className="border p-2 w-full" name="jobDescription" placeholder="Job Description" onChange={handleChange} required />
        <input className="border p-2 w-full" name="laborCost" placeholder="Estimated Labor Cost" type="number" onChange={handleChange} required />

        <h2 className="text-xl font-semibold mt-4">Parts</h2>
        {formData.parts.map((part, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              className="border p-2 flex-1"
              placeholder="Part Name"
              value={part.part_name}
              onChange={e => handlePartChange(index, 'part_name', e.target.value)}
              required
            />
            <input
              className="border p-2 w-32"
              type="number"
              placeholder="Price"
              value={part.part_price}
              onChange={e => handlePartChange(index, 'part_price', parseFloat(e.target.value))}
              required
            />
          </div>
        ))}
        <button type="button" onClick={addPart} className="text-blue-600 underline">
          + Add Another Part
        </button>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit Quote
        </button>
      </form>
    </div>
  );
}
