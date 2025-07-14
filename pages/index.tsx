import { useState } from 'react';

export default function QuoteForm() {
  const [customer, setCustomer] = useState({
    name: '', phone: '', email: '', vehicle: '', vin: '', mileageIn: '', mileageOut: ''
  });

  const [quote, setQuote] = useState({
    jobDescription: '', inspection: '', diagnostics: '', notes: '', laborCost: '', totalCost: '', signature: ''
  });

  const [parts, setParts] = useState([{ name: '', price: '' }]);

  const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomer(prev => ({ ...prev, [name]: value }));
  };

  const handleQuoteChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setQuote(prev => ({ ...prev, [name]: value }));
  };

   const handlePartChange = (index: number, key: 'name' | 'price', value: string | number) => {
	 const newParts = [...parts];
	 newParts[index][key] = String(value); // Convert to string for consistency
	 setParts(newParts);
  };

  const addPart = () => {
    setParts(prev => [...prev, { name: '', price: '' }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customer, quote, parts }),
    });
    const data = await response.json();
    alert(data.message);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Create Repair Quote</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-semibold">Customer Info</h2>
        {['name', 'phone', 'email', 'vehicle', 'vin', 'mileageIn', 'mileageOut'].map(field => (
          <input
            key={field}
            className="border p-2 w-full"
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={customer[field as keyof typeof customer]}
            onChange={handleCustomerChange}
          />
        ))}

        <h2 className="text-xl font-semibold">Quote Details</h2>
        <textarea className="border p-2 w-full" name="jobDescription" placeholder="Job Description" onChange={handleQuoteChange} />
        {['inspection', 'diagnostics', 'notes', 'laborCost', 'totalCost'].map(field => (
          <input
            key={field}
            className="border p-2 w-full"
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            onChange={handleQuoteChange}
          />
        ))}

        <h2 className="text-xl font-semibold">Parts</h2>
        {parts.map((part, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input className="border p-2 flex-1" placeholder="Part Name" value={part.name} onChange={e => handlePartChange(index, 'name', e.target.value)} />
            <input className="border p-2 w-32" placeholder="Price" type="number" value={part.price} onChange={e => handlePartChange(index, 'price', parseFloat(e.target.value))} />
          </div>
        ))}
        <button type="button" onClick={addPart} className="text-blue-600 underline">+ Add Another Part</button>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit Quote</button>
      </form>
    </div>
  );
}

