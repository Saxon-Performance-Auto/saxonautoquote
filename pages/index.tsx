import { useState } from 'react';

type Part = {
  part_name: string;
  part_price?: number;
};

type FormData = {
  name: string;
  phone: string;
  email: string;
  vehicle: string;
  jobDescription: string;
  laborCost: string;
  parts: Part[];
};

export default function QuoteForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    vehicle: '',
    jobDescription: '',
    laborCost: '',
    parts: [{ part_name: '', part_price: undefined }],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePartChange = (index: number, key: keyof Part, value: string | number) => {
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
      parts: [...prev.parts, { part_name: '', part_price: undefined }],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting quote:', formData);

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
      <h1 className="text-3xl font-bold mb-6">Create Repair Quote</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input className="border p-2 w-full" name="name" placeholder="Customer Name" onChange={handleChange} required />
          <input className="border p-2 w-full" name="phone" placeholder="Phone" onChange={handleChange} required />
          <input className="border p-2 w-full" name="email" placeholder="Email" onChange={handleChange} />
        </div>
        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="border p-2 w-full" name="vehicle" placeholder="Vehicle Info" onChange={handleChange} required />
          <input className="border p-2 w-full" name="laborCost" placeholder="Estimated Labor Cost" type="number" onChange={handleChange} />
        </div>
        {/* Row 3 */}
        <textarea className="border p-2 w-full min-h-[100px]" name="jobDescription" placeholder="Job Description" onChange={handleChange} required />

        {/* Parts Section */}
        <h2 className="text-xl font-semibold">Parts</h2>
        <div className="grid gap-2">
          {formData.parts.map((part, index) => (
            <div key={index} className="flex gap-2">
              <input
                className="border p-2 flex-1"
                placeholder="Part Name"
                value={part.part_name}
                onChange={e => handlePartChange(index, 'part_name', e.target.value)}
              />
              <input
                className="border p-2 w-32"
                type="number"
                placeholder="Price (optional)"
                value={part.part_price !== undefined ? part.part_price.toString() : ''}
                onChange={e => handlePartChange(index, 'part_price', parseFloat(e.target.value))}
              />
            </div>
          ))}
        </div>
        <button type="button" onClick={addPart} className="text-blue-600 underline mt-2">
          + Add Another Part
        </button>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mt-4">
          Submit Quote
        </button>
      </form>
    </div>
  );
}